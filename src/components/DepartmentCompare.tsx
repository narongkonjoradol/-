import React, { useState } from 'react';
import { GitCompare, Sparkles, CheckCircle2, ArrowRight, DollarSign, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { Department } from '../types';
import { DEPARTMENTS } from '../data/departments';
import { MascotCharacter } from './MascotCharacter';

interface DepartmentCompareProps {
  initialDeptA?: Department;
  initialDeptB?: Department;
  onApplyForMajor: (department: Department) => void;
}

export const DepartmentCompare: React.FC<DepartmentCompareProps> = ({
  initialDeptA,
  initialDeptB,
  onApplyForMajor
}) => {
  const [deptAId, setDeptAId] = useState<string>(initialDeptA?.id || DEPARTMENTS[0].id);
  const [deptBId, setDeptBId] = useState<string>(initialDeptB?.id || DEPARTMENTS[2].id);

  const deptA = DEPARTMENTS.find(d => d.id === deptAId) || DEPARTMENTS[0];
  const deptB = DEPARTMENTS.find(d => d.id === deptBId) || DEPARTMENTS[2];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-2">
          <GitCompare className="w-3.5 h-3.5 text-blue-700" />
          SIDE-BY-SIDE MAJOR COMPARISON
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          เปรียบเทียบสาขาที่สนใจ
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium">
          เลือก 2 สาขาวิชาที่คุณกำลังลังเล เพื่อดูจุดเด่น วิชาเรียน โอกาสการทำงาน และเงินเดือนเปรียบเทียบกันแบบชัดเจน
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
            เลือกสาขาวิชาที่ 1:
          </label>
          <select
            value={deptAId}
            onChange={(e) => setDeptAId(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            {DEPARTMENTS.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.level.map(l => l.toUpperCase()).join('/')})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
            เลือกสาขาวิชาที่ 2:
          </label>
          <select
            value={deptBId}
            onChange={(e) => setDeptBId(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            {DEPARTMENTS.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.level.map(l => l.toUpperCase()).join('/')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Major A */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className={`p-6 bg-gradient-to-r ${deptA.color.gradient} text-white`}>
              <div className="flex items-center gap-4">
                <div className="w-18 h-18 bg-white/20 rounded-2xl p-1 shrink-0 flex items-center justify-center">
                  <MascotCharacter mascot={deptA.mascot} size="sm" />
                </div>
                <div>
                  <span className="text-[10px] bg-white/30 text-white px-2.5 py-0.5 rounded font-black uppercase tracking-wider">
                    สาขา A
                  </span>
                  <h3 className="text-xl font-black mt-1">{deptA.name}</h3>
                  <p className="text-xs text-white/90 font-medium">มาสคอต: {deptA.mascot.name}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs sm:text-sm">
              <div>
                <p className="font-black text-slate-900 mb-1 uppercase tracking-wider text-xs">คำขวัญประจำสาขา:</p>
                <p className="text-slate-600 font-medium italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{deptA.tagline}"
                </p>
              </div>

              <div>
                <p className="font-black text-slate-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  รายวิชาเด่น:
                </p>
                <div className="flex flex-wrap gap-1">
                  {deptA.sampleCourses.map((c, i) => (
                    <span key={i} className="bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg text-xs font-medium border border-blue-100">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-black text-slate-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  อาชีพในอนาคต:
                </p>
                <ul className="space-y-1.5 text-slate-600 font-medium">
                  {deptA.careers.slice(0, 3).map((cr, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <p className="text-xs text-emerald-800 font-black uppercase tracking-wider flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  เงินเดือนเริ่มต้น:
                </p>
                <p className="text-xl font-black text-emerald-900 mt-0.5">{deptA.startingSalary}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-slate-600">
                <p className="font-black text-slate-800 uppercase tracking-wider">เส้นทางต่อยอด ป.ตรี:</p>
                <p className="mt-0.5 font-medium">{deptA.futurePathways.bachelor}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button
              onClick={() => onApplyForMajor(deptA)}
              className="w-full py-3 px-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-blue-900" />
              <span>เลือกสมัคร {deptA.shortName}</span>
            </button>
          </div>
        </div>

        {/* Major B */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className={`p-6 bg-gradient-to-r ${deptB.color.gradient} text-white`}>
              <div className="flex items-center gap-4">
                <div className="w-18 h-18 bg-white/20 rounded-2xl p-1 shrink-0 flex items-center justify-center">
                  <MascotCharacter mascot={deptB.mascot} size="sm" />
                </div>
                <div>
                  <span className="text-[10px] bg-white/30 text-white px-2.5 py-0.5 rounded font-black uppercase tracking-wider">
                    สาขา B
                  </span>
                  <h3 className="text-xl font-black mt-1">{deptB.name}</h3>
                  <p className="text-xs text-white/90 font-medium">มาสคอต: {deptB.mascot.name}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs sm:text-sm">
              <div>
                <p className="font-black text-slate-900 mb-1 uppercase tracking-wider text-xs">คำขวัญประจำสาขา:</p>
                <p className="text-slate-600 font-medium italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  "{deptB.tagline}"
                </p>
              </div>

              <div>
                <p className="font-black text-slate-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  รายวิชาเด่น:
                </p>
                <div className="flex flex-wrap gap-1">
                  {deptB.sampleCourses.map((c, i) => (
                    <span key={i} className="bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg text-xs font-medium border border-blue-100">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-black text-slate-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  อาชีพในอนาคต:
                </p>
                <ul className="space-y-1.5 text-slate-600 font-medium">
                  {deptB.careers.slice(0, 3).map((cr, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <p className="text-xs text-emerald-800 font-black uppercase tracking-wider flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  เงินเดือนเริ่มต้น:
                </p>
                <p className="text-xl font-black text-emerald-900 mt-0.5">{deptB.startingSalary}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl text-xs text-slate-600">
                <p className="font-black text-slate-800 uppercase tracking-wider">เส้นทางต่อยอด ป.ตรี:</p>
                <p className="mt-0.5 font-medium">{deptB.futurePathways.bachelor}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button
              onClick={() => onApplyForMajor(deptB)}
              className="w-full py-3 px-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-blue-900" />
              <span>เลือกสมัคร {deptB.shortName}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
