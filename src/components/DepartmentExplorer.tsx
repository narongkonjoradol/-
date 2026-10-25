import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  Briefcase,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  X,
  GraduationCap,
  ArrowRight,
  Filter,
  Flame,
  Zap,
  Wrench,
  DollarSign
} from 'lucide-react';
import { Department, EducationLevel, DepartmentCategory } from '../types';
import { DEPARTMENTS, CATEGORY_LABELS } from '../data/departments';
import { MascotCharacter } from './MascotCharacter';

interface DepartmentExplorerProps {
  onApplyForMajor: (department: Department) => void;
  onCompareWith: (department: Department) => void;
  selectedDepartmentForModal?: Department | null;
  onCloseModal?: () => void;
}

export const DepartmentExplorer: React.FC<DepartmentExplorerProps> = ({
  onApplyForMajor,
  onCompareWith,
  selectedDepartmentForModal: initialModalDept = null
}) => {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>('pvc');
  const [selectedCategory, setSelectedCategory] = useState<DepartmentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDept, setActiveModalDept] = useState<Department | null>(initialModalDept);

  // Filter departments based on level, category, and search query
  const filteredDepartments = useMemo(() => {
    return DEPARTMENTS.filter(dept => {
      // Level check
      const matchLevel = dept.level.includes(selectedLevel);
      if (!matchLevel) return false;

      // Category check
      if (selectedCategory !== 'all' && dept.category !== selectedCategory) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = dept.name.toLowerCase().includes(query);
        const matchDesc = dept.description.toLowerCase().includes(query);
        const matchMascot = dept.mascot.name.toLowerCase().includes(query);
        const matchCareers = dept.careers.some(c => c.toLowerCase().includes(query));
        return matchName || matchDesc || matchMascot || matchCareers;
      }

      return true;
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Title Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-tighter text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-blue-700" />
          BSTC ACADEMIC PROGRAMS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          สำรวจสาขาวิชาที่เปิดสอน
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-medium">
          เปิดสอนทั้งระดับ <strong className="text-slate-900">ปวช. (8 สาขาวิชา)</strong> และ <strong className="text-slate-900">ปวส. (6 สาขาวิชา)</strong> ครอบคลุมทั้งสายช่างอุตสาหกรรม เทคโนโลยี EEC บริหารธุรกิจ และการโรงแรม
        </p>
      </div>

      {/* Controls: Level Toggle + Category Filters + Search */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-5">
        {/* Education Level Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 hidden sm:inline-block">LEVEL:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setSelectedLevel('pvc')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  selectedLevel === 'pvc'
                    ? 'bg-blue-900 text-yellow-400 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                ระดับ ปวช. (8 สาขา)
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-bold">จบ ม.3</span>
              </button>

              <button
                onClick={() => setSelectedLevel('pvs')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  selectedLevel === 'pvs'
                    ? 'bg-blue-900 text-yellow-400 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                ระดับ ปวส. (6 สาขา)
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-bold">จบ ปวช./ม.6</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อสาขา, ทักษะ, อาชีพ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-black uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด ({selectedLevel === 'pvc' ? 8 : 6})
          </button>

          {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey as DepartmentCategory)}
              className={`px-4 py-2 rounded-full font-black uppercase tracking-wider whitespace-nowrap transition-colors border cursor-pointer ${
                selectedCategory === catKey
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {info.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Department Cards */}
      {filteredDepartments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-400 font-bold">ไม่พบสาขาวิชาที่ตรงกับเงื่อนไขการค้นหา</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-black uppercase tracking-wider text-blue-600 hover:underline"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <motion.div
              key={dept.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group hover:border-blue-400"
            >
              {/* Card Header with Top Gradient Strip */}
              <div>
                <div className={`h-3 bg-gradient-to-r ${dept.color.gradient}`} />
                <div className="p-6 space-y-4">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border ${CATEGORY_LABELS[dept.category].color}`}>
                      {CATEGORY_LABELS[dept.category].label}
                    </span>

                    {dept.eecCertified && (
                      <span className="text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-yellow-100 text-blue-900 border border-yellow-300">
                        ★ EEC Certified
                      </span>
                    )}
                  </div>

                  {/* Mascot and Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-18 h-18 shrink-0 flex items-center justify-center bg-slate-50 rounded-2xl p-1 border border-slate-100 group-hover:scale-105 transition-transform">
                      <MascotCharacter mascot={dept.mascot} size="sm" />
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        มาสคอต: <span className="font-bold text-slate-700">{dept.mascot.name}</span>
                      </p>
                      <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                        หลักสูตร {dept.durationYears} ปี ({selectedLevel === 'pvc' ? 'ปวช.' : 'ปวส.'})
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    "{dept.tagline}"
                  </p>

                  {/* Sample Courses Tags */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      วิชาเด่นน่าสนใจ:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {dept.sampleCourses.slice(0, 2).map((course, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-blue-50 text-blue-900 px-2.5 py-0.5 rounded-md border border-blue-100 font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Starting Salary Badge */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      เงินเดือนเริ่มต้น:
                    </span>
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                      {dept.startingSalary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalDept(dept)}
                  className="text-xs font-black uppercase tracking-wider text-slate-700 hover:text-blue-600 py-1.5 px-3 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  รายละเอียดเต็ม
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onCompareWith(dept)}
                    title="เทียบกับสาขาอื่น"
                    className="px-2.5 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-black uppercase tracking-wider border border-slate-200 cursor-pointer"
                  >
                    เทียบ
                  </button>

                  <button
                    onClick={() => onApplyForMajor(dept)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 text-xs font-black uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    <span>สมัครสาขานี้</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Deep-Dive Curriculum Modal */}
      <AnimatePresence>
        {activeModalDept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative"
            >
              {/* Modal Top Header */}
              <div className={`p-6 bg-gradient-to-r ${activeModalDept.color.gradient} text-white relative`}>
                <button
                  onClick={() => setActiveModalDept(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl p-1 flex items-center justify-center border border-white/20">
                    <MascotCharacter mascot={activeModalDept.mascot} size="sm" />
                  </div>
                  <div>
                    <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">
                      หลักสูตร {activeModalDept.durationYears} ปี
                    </span>
                    <h2 className="text-2xl font-extrabold text-white mt-1">
                      {activeModalDept.name}
                    </h2>
                    <p className="text-xs text-white/90">
                      มาสคอต: {activeModalDept.mascot.name} ({activeModalDept.mascot.title})
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">รายละเอียดสาขาวิชา:</h4>
                  <p className="leading-relaxed text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    {activeModalDept.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    จุดเด่นของหลักสูตร:
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalDept.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Courses */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    รายวิชาฝึกปฏิบัติเด่น:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalDept.sampleCourses.map((c, i) => (
                      <span key={i} className="bg-blue-50 text-blue-900 px-3 py-1 rounded-lg border border-blue-200 font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Careers & Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                    <p className="font-bold text-emerald-900 mb-1 flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-emerald-700" />
                      สายงานรองรับ:
                    </p>
                    <ul className="text-xs text-emerald-950 space-y-1">
                      {activeModalDept.careers.map((cr, i) => (
                        <li key={i}>• {cr}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                    <p className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-amber-700" />
                      รายได้เริ่มต้น:
                    </p>
                    <p className="text-lg font-black text-amber-900">{activeModalDept.startingSalary}</p>
                    <p className="text-[11px] text-amber-700 mt-1">
                      ต่อยอด ปวส./ป.ตรี: {activeModalDept.futurePathways.bachelor}
                    </p>
                  </div>
                </div>

                {/* Lab tools */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <p className="font-bold text-slate-800 mb-1">อุปกรณ์และห้องปฏิบัติการ:</p>
                  <p className="text-slate-600">{activeModalDept.toolsAndEquipments.join(' • ')}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalDept(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
                >
                  ปิดหน้าต่าง
                </button>

                <button
                  onClick={() => {
                    const dept = activeModalDept;
                    setActiveModalDept(null);
                    onApplyForMajor(dept);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
                >
                  สมัครเรียนสาขาวิชานี้ทันที
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
