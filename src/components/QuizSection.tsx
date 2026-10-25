import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles, CheckCircle2, HelpCircle, Flame, ShieldAlert, Award } from 'lucide-react';
import { QuizQuestion, QuizResultData, Department } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { DEPARTMENTS } from '../data/departments';
import { MascotCharacter } from './MascotCharacter';

interface QuizSectionProps {
  onComplete: (result: QuizResultData) => void;
  onExploreMajors: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onComplete,
  onExploreMajors
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState<number | null>(null);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Pick an encouraging mascot to cheer on the side
  const cheerMascots = DEPARTMENTS.map(d => d.mascot);
  const currentCheerMascot = cheerMascots[currentQuestionIndex % cheerMascots.length];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateAndFinish();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateAndFinish = () => {
    // Tally scores for each department
    const scoreMap: Record<string, number> = {};
    DEPARTMENTS.forEach(dept => {
      scoreMap[dept.id] = 0;
    });

    QUIZ_QUESTIONS.forEach(q => {
      const selectedOptIdx = selectedAnswers[q.id];
      if (selectedOptIdx !== undefined && q.options[selectedOptIdx]) {
        const option = q.options[selectedOptIdx];
        Object.entries(option.weights).forEach(([deptId, weight]) => {
          if (scoreMap[deptId] !== undefined) {
            scoreMap[deptId] += weight;
          }
        });
      }
    });

    // Calculate max potential score for percentage
    const maxScore = Math.max(...Object.values(scoreMap), 1);
    
    // Sort departments by score
    const rankedDepartments = Object.entries(scoreMap)
      .map(([id, score]) => {
        const department = DEPARTMENTS.find(d => d.id === id)!;
        return {
          department,
          score,
          percentage: Math.min(Math.round((score / (totalQuestions * 5)) * 100) + 35, 98)
        };
      })
      .filter(item => Boolean(item.department))
      .sort((a, b) => b.score - a.score);

    const topMatch = rankedDepartments[0].department;
    const topScore = rankedDepartments[0].percentage;

    // Trait scores
    const traitScores = [
      { trait: 'ทักษะเชิงช่าง & การปฏิบัติการ (Realistic)', score: scoreMap['automotive'] + scoreMap['welding'] + scoreMap['mechanical_pvs'], maxScore: 40 },
      { trait: 'ความคิดเชิงนวัตกรรม & เทคโนโลยี (Investigative)', score: scoreMap['mechatronics'] + scoreMap['computer'] + scoreMap['ev'], maxScore: 40 },
      { trait: 'การวิเคราะห์ระบบ & ความแม่นยำ (Conventional)', score: scoreMap['electrical'] + scoreMap['accounting'] + scoreMap['electrical_pvs'], maxScore: 40 },
      { trait: 'การสื่อสาร & จิตบริการ (Social / Enterprising)', score: scoreMap['hospitality'] + scoreMap['accounting'], maxScore: 30 }
    ];

    const resultData: QuizResultData = {
      topDepartment: topMatch,
      scorePercentage: topScore,
      rankings: rankedDepartments,
      traitScores,
      aiAdvice: `จากคำตอบของคุณ คุณมีความโดดเด่นอย่างยิ่งในด้าน "${topMatch.name}" ซึ่งสอดคล้องกับบุคลิกที่ ${topMatch.suitableTraits.join(', ')} พร้อมเติบโตในสายอาชีพที่มีความต้องการสูงในพื้นที่ EEC!`
    };

    onComplete(resultData);
  };

  // Welcome Intro Screen with Bold Typography 3-column / hero layout
  if (!hasStarted) {
    const pvcDepts = DEPARTMENTS.filter(d => d.level.includes('pvc'));
    const pvsDepts = DEPARTMENTS.filter(d => d.level.includes('pvs'));

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* 3-Column Bold Typography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          {/* Column 1: Level 01 ปวช. */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-tighter text-blue-600 bg-blue-50 px-3 py-1 rounded w-fit inline-block">
                LEVEL 01
              </span>
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">ปวช.</h3>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-0.5">
                  ประกาศนียบัตรวิชาชีพ (จบ ม.3)
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                หลักสูตร 3 ปี ปูพื้นฐานทักษะช่างและวิชาชีพสู่อนาคต มั่นคง มีงานทำทันที
              </p>

              {/* Major list with bold indicator bar */}
              <div className="border-l-4 border-blue-600 pl-3.5 space-y-2 pt-1 text-xs">
                {pvcDepts.map((d, i) => (
                  <div key={d.id} className="flex items-center justify-between group">
                    <span className={`font-bold text-slate-800 hover:text-blue-600 transition-colors ${
                      d.id === 'ev' || d.id === 'mechatronics' ? 'bg-yellow-100 px-1 py-0.5 rounded text-slate-900 font-black' : ''
                    }`}>
                      {d.name}
                    </span>
                    {d.eecCertified && (
                      <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">EEC</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onExploreMajors}
                className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-wider"
              >
                <span>ดูรายละเอียด ปวช. ทั้งหมด</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2 & 3: Hero Center Card with Bold Typography & Radial Pattern */}
          <div className="lg:col-span-2 bg-blue-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col items-center text-center justify-center bg-dot-pattern min-h-[460px]">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" />

            {/* Circular Mascot Spotlight Badge */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl ring-4 ring-white/20 relative z-10 shrink-0">
              <MascotCharacter mascot={DEPARTMENTS[0].mascot} size="md" action="celebrate" />
            </div>

            {/* Hero Title */}
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.1] mb-3 tracking-tight relative z-10">
              ค้นหาสาขาที่ใช่<br />
              <span className="text-yellow-400">ในสไตล์คุณ</span>
            </h2>

            {/* Subtitle */}
            <p className="text-blue-100 text-sm sm:text-base mb-7 max-w-md mx-auto leading-relaxed relative z-10 font-medium">
              วิทยาลัยเทคนิคบางแสน พร้อมนำทางคุณสู่อาชีพในฝัน ด้วยแบบทดสอบวัดความถนัด 6 ข้อ
            </p>

            {/* Giant Bold CTA */}
            <button
              onClick={() => setHasStarted(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-base sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl transform transition active:scale-95 cursor-pointer relative z-10 uppercase tracking-wider flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-blue-900" />
              <span>เริ่มทำแบบทดสอบ</span>
              <ArrowRight className="w-5 h-5 text-blue-900" />
            </button>
          </div>

          {/* Column 4: Level 02 ปวส. */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-tighter text-blue-600 bg-blue-50 px-3 py-1 rounded w-fit inline-block">
                LEVEL 02
              </span>
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">ปวส.</h3>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-0.5">
                  ประกาศนียบัตรวิชาชีพชั้นสูง (จบ ปวช./ม.6)
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                หลักสูตร 2 ปี ยกระดับสู่ช่างเทคนิคขั้นสูง หัวหน้างาน และต่อยอด ป.ตรี ได้ทันที
              </p>

              {/* Major list with bold indicator bar */}
              <div className="border-l-4 sm:border-l-0 sm:border-r-4 border-blue-600 pl-3.5 sm:pl-0 sm:pr-3.5 sm:text-right space-y-2 pt-1 text-xs">
                {pvsDepts.map((d, i) => (
                  <div key={d.id} className="flex items-center justify-between sm:justify-end gap-2 group">
                    <span className="font-bold text-slate-800 hover:text-blue-600 transition-colors">
                      {d.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 hidden sm:inline-block" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Admissions Callout */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ADMISSION STATUS</p>
              <p className="text-xs font-black text-slate-900 mt-0.5">รับสมัครรอบโควตา & ทั่วไป</p>
              <p className="text-[11px] text-slate-500">สมัครออนไลน์พร้อมแนบเอกสารได้ 24 ชม.</p>
            </div>
          </div>
        </div>

        {/* Mascots Showcase Banner Strip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                เหล่ามาสคอตประจำสาขาวิชา (BSTC MASCOTS)
              </h4>
              <p className="text-xs text-slate-500">
                ตัวแทนทักษะและความเชี่ยวชาญของแต่ละสาขาวิชาในวิทยาลัยเทคนิคบางแสน
              </p>
            </div>
            <button
              onClick={onExploreMajors}
              className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-wider"
            >
              สำรวจสาขาทั้งหมด &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {DEPARTMENTS.slice(0, 8).map((dept) => (
              <div
                key={dept.id}
                onClick={onExploreMajors}
                className="flex flex-col items-center bg-slate-50 hover:bg-blue-50/60 rounded-2xl p-3 border border-slate-200/80 hover:border-blue-300 transition-all hover:scale-105 cursor-pointer text-center group"
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <MascotCharacter mascot={dept.mascot} size="sm" action="wave" />
                </div>
                <span className="text-xs font-black text-slate-900 mt-1 truncate w-full group-hover:text-blue-600">
                  {dept.shortName}
                </span>
                <span className="text-[10px] text-slate-400 truncate w-full">
                  {dept.mascot.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isCurrentAnswered = selectedAnswers[currentQuestion.id] !== undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header & Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500 mb-2.5">
          <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            QUESTION {currentQuestionIndex + 1} / {totalQuestions}
          </span>
          <span className="text-slate-900 font-black">ความคืบหน้า {progressPercent}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-yellow-400 rounded-full"
            initial={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Main Question Card with Animated Transition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Question and Options */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200"
            >
              {/* Question Context Badge */}
              <div className="mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200">
                  {currentQuestion.context}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-6 tracking-tight">
                {currentQuestion.scenario}
              </h2>

              {/* Options List */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      onMouseEnter={() => setHoveredOptionIndex(idx)}
                      onMouseLeave={() => setHoveredOptionIndex(null)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group relative cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      {/* Check Circle */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'border-2 border-slate-300 group-hover:border-blue-400'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p className={`text-sm sm:text-base font-bold leading-snug ${
                          isSelected ? 'text-blue-950 font-black' : 'text-slate-800 group-hover:text-slate-900'
                        }`}>
                          {option.text}
                        </p>
                        {option.subText && (
                          <p className={`text-xs mt-1 font-medium ${
                            isSelected ? 'text-blue-700 font-bold' : 'text-slate-500'
                          }`}>
                            {option.subText}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                    currentQuestionIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  ข้อก่อนหน้า
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isCurrentAnswered}
                  className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer ${
                    isCurrentAnswered
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-blue-900 hover:shadow-lg active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQuestionIndex === totalQuestions - 1 ? 'ดูผลการวิเคราะห์' : 'ข้อถัดไป'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Cheering Mascot Sidekick */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              BSTC MASCOT GUIDE
            </p>
            <MascotCharacter
              mascot={currentCheerMascot}
              size="md"
              action={isCurrentAnswered ? 'celebrate' : 'wave'}
              showSpeechBubble={true}
              customSpeech={
                isCurrentAnswered
                  ? 'ยอดเยี่ยมมาก! ลุยข้อถัดไปกันเลย!'
                  : 'เลือกคำตอบที่ตรงกับใจเราที่สุดนะ!'
              }
            />

            <div className="mt-4 pt-3 border-t border-slate-100 text-left space-y-1 text-xs text-slate-600">
              <p className="font-black text-slate-800">💡 เคล็ดลับการตอบ:</p>
              <p className="text-slate-500 font-medium leading-relaxed">ตอบตามความรู้สึกและความชอบจริง เพื่อให้ระบบคำนวณสาขาที่ตรงกับศักยภาพของคุณสูงสุด</p>
            </div>
          </div>

          {/* College Quick Info */}
          <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200 text-xs text-blue-900 space-y-1">
            <p className="font-black flex items-center gap-1.5 text-blue-900">
              <Award className="w-4 h-4 text-yellow-500" />
              วิทยาลัยเทคนิคบางแสน
            </p>
            <p className="text-slate-600 font-medium">
              สถาบันอาชีวศึกษามาตรฐานสากล รองรับอุตสาหกรรมเป้าหมาย EEC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
