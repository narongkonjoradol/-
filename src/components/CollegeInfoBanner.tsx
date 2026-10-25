import React from 'react';
import { MapPin, PhoneCall, Globe, Mail, Award, CheckCircle2, Shield, HeartHandshake, Compass, Users, Sparkles, ArrowRight } from 'lucide-react';
import { DEPARTMENTS } from '../data/departments';
import { MascotCharacter } from './MascotCharacter';

interface CollegeInfoBannerProps {
  onStartQuiz: () => void;
  onExploreMajors: () => void;
}

export const CollegeInfoBanner: React.FC<CollegeInfoBannerProps> = ({
  onStartQuiz,
  onExploreMajors
}) => {
  return (
    <div className="bg-slate-900 text-white border-t border-slate-800">
      {/* Why Choose Bangsaen Tech Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3.5 py-1.5 rounded-full border border-yellow-400/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            WHY BANGSAEN TECHNICAL COLLEGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ทำไมต้องเรียนที่ "วิทยาลัยเทคนิคบางแสน"?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            สถาบันการอาชีวศึกษาชั้นนำใจกลางเมืองบางแสน ผสานบรรยากาศริมทะเลกับเทคโนโลยีระดับสากลและ EEC
          </p>
        </div>

        {/* 4 Feature Bento Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-white">ศูนย์กลาง EEC & ทวิภาคี</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              เชื่อมโยงกับนิคมอุตสาหกรรมชลบุรี-ระยอง และโรงแรม 5 ดาว ฝึกงานจริงมีเบี้ยเลี้ยง จบแล้วมีงานทำ 100%
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-white">แล็บ & เครื่องมือล้ำสมัย</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              ชุดฝึกแขนกลหุ่นยนต์, รถยนต์ไฟฟ้า EV จริง, เครื่องสแกน OBD-II, ซอฟต์แวร์ ERP และห้องปฏิบัติการมาตรฐานสากล
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-yellow-600/20 text-yellow-400 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-white">บรรยากาศเมืองชายทะเล</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              ตั้งอยู่ใกล้หาดบางแสน บรรยากาศร่มรื่น ปลอดภัย เดินทางสะดวก พร้อมกิจกรรมชมรมพัฒนาทักษะรอบด้าน
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-white">ทุนการศึกษา & สวัสดิการ</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              มีกองทุน กยศ., ทุนเรียนดี, ทุนยากจน และหอพักเครือข่ายสำหรับนักศึกษาต่างจังหวัด ครบครัน
            </p>
          </div>
        </div>

        {/* Mascot Mascot Lineup Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700">
          <div className="text-center mb-6">
            <h3 className="font-black text-lg sm:text-xl text-white tracking-tight">
              เหล่ามาสคอตประจำสาขาวิชา พร้อมต้อนรับนักศึกษาใหม่ทุกคน!
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              คลิกที่ตัวการ์ตูนเพื่อดูสาขาวิชาที่เกี่ยวข้อง
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {DEPARTMENTS.slice(0, 8).map(dept => (
              <div
                key={dept.id}
                onClick={onExploreMajors}
                className="flex flex-col items-center bg-slate-900/90 hover:bg-blue-900/40 p-3 rounded-2xl border border-slate-700/80 hover:border-yellow-400 cursor-pointer transition-all hover:scale-105 group text-center"
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <MascotCharacter mascot={dept.mascot} size="sm" action="wave" />
                </div>
                <span className="text-[11px] font-black text-slate-200 mt-1 truncate w-full group-hover:text-yellow-300">
                  {dept.shortName}
                </span>
                <span className="text-[9px] text-slate-400 truncate w-full">
                  {dept.mascot.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* College Contact & Info Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-blue-900 font-black px-2 py-0.5 rounded text-sm tracking-tighter">
                BSTC
              </span>
              <p className="font-black text-white text-base">วิทยาลัยเทคนิคบางแสน</p>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              สำนักงานคณะกรรมการการอาชีวศึกษา (สอศ.) กระทรวงศึกษาธิการ
            </p>
            <p className="flex items-center gap-1.5 pt-1 text-slate-400">
              <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>ตำบลห้วยกะปิ อำเภอเมืองชลบุรี จังหวัดชลบุรี 20130</span>
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="font-black uppercase tracking-widest text-white text-xs">ช่องทางการติดต่อ</p>
            <p className="flex items-center gap-2 text-slate-300 font-medium">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>โทรศัพท์: 038-382-628, 038-382-629</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300 font-medium">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>อีเมล: info@bstc.ac.th</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300 font-medium">
              <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>เว็บไซต์: www.bstc.ac.th</span>
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-black uppercase tracking-widest text-white text-xs">การเปิดรับสมัครนักศึกษาใหม่</p>
            <p className="leading-relaxed text-slate-400 font-medium">
              เปิดรับสมัครนักเรียนระดับ ปวช. (จบ ม.3) และ ปวส. (จบ ปวช./ม.6) ตลอดปีการศึกษา ทั้งระบบปกติและทวิภาคี
            </p>
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black uppercase tracking-wider rounded-full text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-900" />
              <span>ค้นหาสาขาที่ใช่ด้วยแบบทดสอบ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 text-center text-slate-500 font-medium">
          <p>© {new Date().getFullYear() + 543} BANGSAEN TECHNICAL COLLEGE (วิทยาลัยเทคนิคบางแสน). สงวนลิขสิทธิ์ทุกประการ</p>
        </div>
      </footer>
    </div>
  );
};
