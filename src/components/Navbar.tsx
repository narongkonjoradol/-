import React from 'react';
import { Compass, BookOpen, GitCompare, UserCheck, PhoneCall, Sparkles, GraduationCap, MapPin } from 'lucide-react';

export type ActiveTab = 'quiz' | 'explorer' | 'compare' | 'admission' | 'about';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onQuickStartQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onQuickStartQuiz
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice with Live Pulse */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-widest text-yellow-400">
              ADMISSION 2569
            </span>
            <span className="text-slate-300 text-xs font-medium">
              เปิดรับสมัครนักศึกษาใหม่ ปวช. (จบ ม.3) & ปวส. (จบ ปวช./ม.6) ประจำปีการศึกษา 2569
            </span>
          </div>
          <div className="flex items-center gap-5 text-slate-400 text-xs hidden md:flex font-medium">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-yellow-400" />
              ห้วยกะปิ เมืองชลบุรี
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-green-400" />
              038-382-628
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Logo & Bold Brand Title */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group select-none"
            onClick={() => setActiveTab('quiz')}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-blue-800">
              <GraduationCap className="w-7 h-7 text-yellow-400" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none text-blue-900">
                BANG SAEN
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <h2 className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase">
                  TECHNICAL COLLEGE
                </h2>
                <span className="text-[10px] font-black uppercase tracking-tight text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                  สอศ.
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links with Bold Typography */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-black'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              วัดความถนัด
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'explorer'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-black'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              สาขาวิชา (ปวช./ปวส.)
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'compare'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-black'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              เปรียบเทียบสาขา
            </button>

            <button
              onClick={() => setActiveTab('admission')}
              className={`text-xs font-bold uppercase tracking-widest pb-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'admission'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-black'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              ยื่นสมัครเรียน
            </button>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onQuickStartQuiz}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-xs sm:text-sm px-6 sm:px-7 py-3 rounded-full shadow-md hover:shadow-lg transform transition active:scale-95 uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>เริ่มทำแบบวัดความถนัด</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden border-t border-slate-200 bg-slate-50/90 overflow-x-auto py-2.5 px-3 flex gap-2 no-scrollbar">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'quiz' ? 'bg-blue-900 text-yellow-400 shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          วัดความถนัด
        </button>

        <button
          onClick={() => setActiveTab('explorer')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'explorer' ? 'bg-blue-900 text-yellow-400 shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          สาขาวิชา
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'compare' ? 'bg-blue-900 text-yellow-400 shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
          เปรียบเทียบ
        </button>

        <button
          onClick={() => setActiveTab('admission')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
            activeTab === 'admission' ? 'bg-blue-900 text-yellow-400 shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          สมัครเรียน
        </button>
      </div>
    </header>
  );
};
