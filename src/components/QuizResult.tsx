import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Share2,
  Download,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Zap,
  Wrench
} from 'lucide-react';
import { QuizResultData, Department } from '../types';
import { MascotCharacter } from './MascotCharacter';

interface QuizResultProps {
  result: QuizResultData;
  onRetake: () => void;
  onApplyForMajor: (department: Department) => void;
  onViewDepartmentDetails: (department: Department) => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  onRetake,
  onApplyForMajor,
  onViewDepartmentDetails
}) => {
  const [studentName, setStudentName] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'highlights' | 'careers' | 'pathway'>('highlights');
  const certificateRef = useRef<HTMLDivElement>(null);

  const topDept = result.topDepartment;
  const runnerUps = result.rankings.slice(1, 3);

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `ผลวัดความถนัดของฉันที่วิทยาลัยเทคนิคบางแสน ตรงกับ "${topDept.name}" (${result.scorePercentage}%) กับ ${topDept.mascot.name}!`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Top Banner Result Announcement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <span className="text-xs font-black uppercase tracking-tighter text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          APTITUDE ASSESSMENT RESULT
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          ยินดีด้วย! สาขาวิชาที่ตรงกับคุณมากที่สุด
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          วิทยาลัยเทคนิคบางแสน พร้อมพาคุณก้าวสู่ความเป็นมืออาชีพด้วยหลักสูตรที่ตอบโจทย์อุตสาหกรรมยุคใหม่ EEC
        </p>
      </motion.div>

      {/* Main Champion Major Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border-2 border-slate-200"
      >
        {/* Top Header Background with Gradient */}
        <div className={`p-6 sm:p-10 bg-gradient-to-r ${topDept.color.gradient} text-white relative`}>
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Department Titles & Match Score */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-white border border-white/30">
                  อันดับที่ 1 แนะนำสูงสุด
                </span>
                {topDept.eecCertified && (
                  <span className="px-3 py-1 bg-yellow-400 text-blue-950 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                    ★ หลักสูตรรองรับ EEC
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {topDept.name}
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-medium">
                "{topDept.tagline}"
              </p>

              {/* Match Score Meter */}
              <div className="pt-3">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-white/90 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    MATCHING SCORE
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-yellow-300">{result.scorePercentage}%</span>
                </div>
                <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-md"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.scorePercentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Mascot Spotlight */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-sm rounded-3xl p-5 border border-white/20">
              <MascotCharacter
                mascot={topDept.mascot}
                size="lg"
                action="celebrate"
                showSpeechBubble={true}
                customSpeech={topDept.mascot.catchphrase}
              />
              <p className="text-xs text-white/90 font-bold mt-2">
                มาสคอตประจำสาขา: <strong className="text-yellow-300">{topDept.mascot.title}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Content Tabs Inside the Champion Card */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Sub Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveSubTab('highlights')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === 'highlights'
                  ? 'bg-blue-900 text-yellow-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              จุดเด่น & รายวิชา
            </button>
            <button
              onClick={() => setActiveSubTab('careers')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === 'careers'
                  ? 'bg-blue-900 text-yellow-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              สายอาชีพ & รายได้
            </button>
            <button
              onClick={() => setActiveSubTab('pathway')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === 'pathway'
                  ? 'bg-blue-900 text-yellow-400 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              การต่อยอด ปวส./ป.ตรี
            </button>
          </div>

          {/* Sub Tab Content */}
          <div className="space-y-4">
            {activeSubTab === 'highlights' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ไฮไลต์การเรียนรู้ที่วิทยาลัยเทคนิคบางแสน:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {topDept.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-blue-600" />
                    ตัวอย่างวิชาปฏิบัติจริง & เครื่องมือแล็บ:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {topDept.sampleCourses.map((c, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-800 px-3 py-1 rounded-lg border border-blue-100 font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs text-slate-600 mt-2">
                      <p className="font-semibold text-slate-700 mb-1">อุปกรณ์และห้องแล็บทันสมัย:</p>
                      <p>{topDept.toolsAndEquipments.join(' • ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'careers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    โอกาสทางอาชีพหลังสำเร็จการศึกษา:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {topDept.careers.map((c, i) => (
                      <li key={i} className="flex items-center gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-emerald-950 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      อัตราเงินเดือนเฉลี่ยเริ่มต้น
                    </p>
                    <p className="text-2xl font-black text-amber-900 mt-1">
                      {topDept.startingSalary}
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      * ไม่รวมโอที, ค่าเบี้ยเลี้ยง, สวัสดิการโรงงาน EEC หรือโบนัสประจำปี
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800">ลักษณะนิสัยที่เหมาะสมกับสาขานี้:</p>
                    <p>{topDept.suitableTraits.join(' • ')}</p>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'pathway' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-2">
                  <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded text-xs font-bold">
                    ระดับ ปวส. (2 ปี)
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm">
                    {topDept.futurePathways.pvs}
                  </h5>
                  <p className="text-xs text-slate-600">
                    ต่อยอดเป็นช่างเทคนิคขั้นสูง หัวหน้างาน และผู้เชี่ยวชาญเฉพาะทาง
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 space-y-2">
                  <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded text-xs font-bold">
                    ระดับปริญญาตรี (เทียบโอน 2-3 ปี)
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm">
                    {topDept.futurePathways.bachelor}
                  </h5>
                  <p className="text-xs text-slate-600">
                    สามารถเทียบโอนศึกษาต่อในมหาวิทยาลัยเทคโนโลยีราชมงคล ม.บูรพา หรือสถาบันชั้นนำ
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs for Champion Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{isCopied ? 'คัดลอกลิงก์แล้ว!' : 'แชร์ผลลัพธ์'}</span>
              </button>

              <button
                onClick={onRetake}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ทำแบบทดสอบใหม่</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onViewDepartmentDetails(topDept)}
                className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                ดูหลักสูตรละเอียด
              </button>

              <button
                onClick={() => onApplyForMajor(topDept)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>ยื่นสมัครสาขานี้ทันที</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Runner-up Matches (อันดับ 2 & 3) */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
          <Award className="w-6 h-6 text-blue-600" />
          สาขาวิชาทางเลือกที่แนะนำเพิ่มเติม (อันดับ 2 และ 3)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {runnerUps.map((item, idx) => (
            <div
              key={item.department.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                    อันดับ {idx + 2} แนะนำ
                  </span>
                  <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
                    ความตรงกัน {item.percentage}%
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                    <MascotCharacter mascot={item.department.mascot} size="sm" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                      {item.department.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-0.5">
                      {item.department.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.department.sampleCourses.slice(0, 2).map((sc, i) => (
                    <span key={i} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      {sc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onViewDepartmentDetails(item.department)}
                  className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-wider"
                >
                  ดูรายละเอียด &rarr;
                </button>
                <button
                  onClick={() => onApplyForMajor(item.department)}
                  className="text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 transition-colors"
                >
                  เลือกสมัครสาขานี้
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trait Profile Radar / Score Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          โครงสร้างความถนัดเชิงอาชีพ (VOCATIONAL APTITUDE TRAITS)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.traitScores.map((trait, idx) => {
            const pct = Math.min(Math.round((trait.score / trait.maxScore) * 100), 100);
            return (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-slate-700 uppercase tracking-wider">
                  <span>{trait.trait}</span>
                  <span className="text-blue-600 font-black">{pct}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Personalized Mentor Advice */}
        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 flex items-start gap-3.5 text-xs sm:text-sm text-blue-950">
          <Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-bold">
            {result.aiAdvice}
          </p>
        </div>
      </div>

      {/* Certificate of Aptitude (ใบรับรองความถนัดสำหรับดาวน์โหลด / พิมพ์) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-yellow-400 shadow-sm space-y-4 print:m-0 print:border-none print:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 tracking-tight">
              <Award className="w-5 h-5 text-yellow-500" />
              เกียรติบัตรผลการประเมินความถนัด (APTITUDE CERTIFICATE)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              กรอกชื่อของคุณเพื่อพิมพ์ใบสรุปผลสำหรับใช้ประกอบการยื่นโควตาหรือสมัครเรียน
            </p>
          </div>
          <button
            onClick={handlePrintCertificate}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            พิมพ์ / บันทึก PDF
          </button>
        </div>

        {/* Name input */}
        <div className="max-w-md print:hidden">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
            ชื่อ-นามสกุล ผู้เข้ารับการทดสอบ:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="ตัวอย่าง: นายสมศักดิ์ รักการเรียน"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
          />
        </div>

        {/* Printable Certificate Template */}
        <div
          ref={certificateRef}
          className="bg-gradient-to-b from-yellow-50/50 via-white to-yellow-50/50 border-4 border-yellow-400/80 rounded-2xl p-6 sm:p-8 text-center space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-yellow-500" />
          <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-yellow-500" />
          <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-yellow-500" />
          <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-yellow-500" />

          <div className="flex items-center justify-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-900" />
            <h4 className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
              วิทยาลัยเทคนิคบางแสน
            </h4>
          </div>
          <p className="text-xs text-slate-600 font-black tracking-widest uppercase">
            Bangsaen Technical College • Vocational Aptitude Certification
          </p>

          <div className="py-3">
            <p className="text-xs text-slate-500 font-medium">ขอมอบเอกสารรับรองผลการประเมินความถนัดนี้ให้แก่</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 my-2 underline decoration-yellow-400 decoration-4">
              {studentName.trim() || 'ผู้เข้ารับการประเมินความถนัด'}
            </p>
            <p className="text-xs text-slate-600 max-w-lg mx-auto mt-2 font-medium">
              ได้รับการประเมินว่ามีศักยภาพและความถนัดสูงสุดในระดับร้อยละ <strong>{result.scorePercentage}%</strong> ตรงกับ
            </p>
            <div className="inline-block my-3 px-8 py-2.5 bg-blue-900 text-yellow-400 rounded-2xl shadow-md">
              <span className="text-lg sm:text-2xl font-black">{topDept.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 text-xs text-slate-500 pt-4 border-t border-yellow-200">
            <div>
              <p className="font-black text-slate-800">ระบบประเมินความถนัดนักศึกษาใหม่</p>
              <p className="font-medium">วิทยาลัยเทคนิคบางแสน จ.ชลบุรี</p>
            </div>
            <div>
              <p className="font-black text-slate-800">ลงวันที่</p>
              <p className="font-medium">{new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
