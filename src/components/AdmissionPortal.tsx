import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  UserCheck,
  CheckCircle2,
  FileText,
  Calendar,
  AlertCircle,
  PhoneCall,
  GraduationCap,
  Sparkles,
  Download,
  Building,
  MapPin,
  Clock,
  Printer
} from 'lucide-react';
import { Department, EducationLevel, ApplicationFormState } from '../types';
import { DEPARTMENTS } from '../data/departments';
import { MascotCharacter } from './MascotCharacter';

interface AdmissionPortalProps {
  preSelectedDepartment?: Department | null;
  onGoToExplorer: () => void;
}

export const AdmissionPortal: React.FC<AdmissionPortalProps> = ({
  preSelectedDepartment,
  onGoToExplorer
}) => {
  const [formData, setFormData] = useState<ApplicationFormState>({
    fullName: '',
    nationalId: '',
    phone: '',
    currentSchool: '',
    currentGpa: '',
    selectedLevel: (preSelectedDepartment?.level[0] as EducationLevel) || 'pvc',
    selectedDepartmentId: preSelectedDepartment?.id || DEPARTMENTS[0].id,
    secondaryDepartmentId: DEPARTMENTS[1].id,
    quotaType: 'general',
    parentPhone: '',
    address: 'ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    doc1: true,
    doc2: true,
    doc3: true,
    doc4: false,
    doc5: false
  });

  const selectedDept = DEPARTMENTS.find(d => d.id === formData.selectedDepartmentId) || DEPARTMENTS[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLevelChange = (level: EducationLevel) => {
    const availableDepts = DEPARTMENTS.filter(d => d.level.includes(level));
    setFormData(prev => ({
      ...prev,
      selectedLevel: level,
      selectedDepartmentId: availableDepts[0]?.id || DEPARTMENTS[0].id
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `BSTC-${new Date().getFullYear() + 543}-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegistrationCode(randomCode);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const availableDeptsForLevel = DEPARTMENTS.filter(d => d.level.includes(formData.selectedLevel));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-2">
          <UserCheck className="w-3.5 h-3.5 text-blue-700" />
          ONLINE ADMISSION PORTAL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          ยื่นสมัครเรียนออนไลน์ (ปวช. & ปวส.)
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium">
          กรอกข้อมูลเพื่อลงทะเบียนรับสิทธิ์โควตาและรอบคัดเลือก พร้อมรับบัตรประจำตัวผู้สมัครและเอกสารประกอบการสอบสัมภาษณ์
        </p>
      </div>

      {isSubmitted ? (
        /* Submission Success Slip */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border-2 border-emerald-400 shadow-xl p-6 sm:p-10 space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black uppercase tracking-wider">
              บันทึกข้อมูลการสมัครเรียบร้อยแล้ว
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              ยินดีต้อนรับสู่ครอบครัววิทยาลัยเทคนิคบางแสน
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              เลขประจำตัวผู้สมัครของคุณ: <strong className="text-blue-900 text-xl font-black font-mono">{registrationCode}</strong>
            </p>
          </div>

          {/* Registration Slip Details */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 border-b border-slate-200 pb-1.5 text-sm uppercase tracking-wider">ข้อมูลผู้สมัคร:</h4>
              <p><strong>ชื่อ-สกุล:</strong> {formData.fullName || 'ผู้สมัครนักเรียนใหม่'}</p>
              <p><strong>เลขบัตรประชาชน:</strong> {formData.nationalId || '-'}</p>
              <p><strong>เบอร์โทรศัพท์:</strong> {formData.phone || '-'}</p>
              <p><strong>โรงเรียนเดิม:</strong> {formData.currentSchool || '-'}</p>
              <p><strong>เกรดเฉลี่ย (GPAX):</strong> {formData.currentGpa || '3.00'}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-slate-900 border-b border-slate-200 pb-1.5 text-sm uppercase tracking-wider">สาขาวิชาที่เลือก:</h4>
              <p><strong>ระดับการศึกษา:</strong> {formData.selectedLevel === 'pvc' ? 'ปวช. (3 ปี)' : 'ปวส. (2 ปี)'}</p>
              <p className="text-blue-900 font-black"><strong>อันดับ 1:</strong> {selectedDept.name}</p>
              <p><strong>ประเภทการสมัคร:</strong> {
                formData.quotaType === 'academic' ? 'โควตาเรียนดี' :
                formData.quotaType === 'portfolio' ? 'โควตาความสามารถพิเศษ' :
                formData.quotaType === 'eec_scholarship' ? 'ทุนความร่วมมือ EEC ทวิภาคี' : 'รอบคัดเลือกทั่วไป'
              }</p>
              <p><strong>วันที่สมัคร:</strong> {new Date().toLocaleDateString('th-TH')}</p>
            </div>
          </div>

          {/* Cheering Mascot Greeting */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 flex items-center gap-4">
            <div className="w-18 h-18 shrink-0">
              <MascotCharacter mascot={selectedDept.mascot} size="sm" action="celebrate" />
            </div>
            <div>
              <h5 className="font-black text-slate-900 text-sm">
                {selectedDept.mascot.name} ยินดีต้อนรับครับ!
              </h5>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                "{selectedDept.mascot.catchphrase} เจอกันในวันรายงานตัวและตรวจหลักฐาน ณ วิทยาลัยเทคนิคบางแสน นะครับ!"
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-black uppercase tracking-wider text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              แก้ไขข้อมูลการสมัคร
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-md transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>พิมพ์ใบสมัคร (Print Slip)</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Application Form & Guidelines Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (8 Cols) */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              {/* Level Selection Tabs */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  1. เลือกระดับการศึกษาที่ต้องการสมัคร:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleLevelChange('pvc')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      formData.selectedLevel === 'pvc'
                        ? 'border-blue-900 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-black text-sm text-slate-900">ระดับ ปวช. (3 ปี)</p>
                    <p className="text-xs text-slate-500 font-medium">สำหรับผู้จบ ม.3 หรือเทียบเท่า</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLevelChange('pvs')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      formData.selectedLevel === 'pvs'
                        ? 'border-blue-900 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-black text-sm text-slate-900">ระดับ ปวส. (2 ปี)</p>
                    <p className="text-xs text-slate-500 font-medium">สำหรับผู้จบ ปวช. / ม.6 หรือเทียบเท่า</p>
                  </button>
                </div>
              </div>

              {/* Department Choice Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    2. สาขาวิชาที่เลือก (อันดับ 1): *
                  </label>
                  <select
                    name="selectedDepartmentId"
                    value={formData.selectedDepartmentId}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {availableDeptsForLevel.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    สาขาวิชาสำรอง (อันดับ 2):
                  </label>
                  <select
                    name="secondaryDepartmentId"
                    value={formData.secondaryDepartmentId}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {availableDeptsForLevel.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quota Type Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  3. ประเภทการสมัคร:
                </label>
                <select
                  name="quotaType"
                  value={formData.quotaType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="general">รอบคัดเลือกทั่วไป</option>
                  <option value="academic">โควตาเรียนดี (GPAX 2.50 ขึ้นไป)</option>
                  <option value="portfolio">โควตาความสามารถพิเศษ / กิจกรรมดีเด่น</option>
                  <option value="eec_scholarship">ทุนความร่วมมืออุตสาหกรรม EEC ทวิภาคี (มีเบี้ยเลี้ยง)</option>
                </select>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">4. ข้อมูลส่วนตัวผู้สมัคร:</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ชื่อ-นามสกุล (พร้อมคำนำหน้า): *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="เช่น นายธนากร ใจรักช่าง"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      เลขประจำตัวประชาชน 13 หลัก: *
                    </label>
                    <input
                      type="text"
                      name="nationalId"
                      placeholder="1234567890123"
                      maxLength={13}
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      เบอร์โทรศัพท์มือถือผู้สมัคร: *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="08x-xxx-xxxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      เบอร์โทรศัพท์ผู้ปกครอง: *
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      placeholder="08x-xxx-xxxx"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      โรงเรียนเดิมที่สำเร็จการศึกษา: *
                    </label>
                    <input
                      type="text"
                      name="currentSchool"
                      placeholder="เช่น โรงเรียนแสนสุข"
                      value={formData.currentSchool}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ผลการเรียนเฉลี่ยสะสม (GPAX): *
                    </label>
                    <input
                      type="text"
                      name="currentGpa"
                      placeholder="เช่น 3.25"
                      value={formData.currentGpa}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-sm sm:text-base uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-blue-900" />
                  <span>ยืนยันการสมัครเรียนออนไลน์</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Checklist & Admission Schedules (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Selected Major Preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                สาขาที่คุณกำลังสมัคร
              </span>
              <MascotCharacter
                mascot={selectedDept.mascot}
                size="md"
                action="wave"
                className="my-2"
              />
              <h4 className="font-black text-slate-900 text-base">{selectedDept.name}</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">{selectedDept.tagline}</p>
            </div>

            {/* Document Checklist */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-blue-600" />
                เช็กลิสต์เอกสารที่ต้องใช้รายงานตัว:
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                {[
                  { id: 'doc1', label: 'ใบแสดงผลการเรียน (ปพ.1 / Transcript)' },
                  { id: 'doc2', label: 'สำเนาทะเบียนบ้าน ผู้สมัคร + บิดา/มารดา' },
                  { id: 'doc3', label: 'สำเนาบัตรประชาชนผู้สมัคร' },
                  { id: 'doc4', label: 'รูปถ่ายชุดนักเรียนขนาด 1.5 นิ้ว (2 รูป)' },
                  { id: 'doc5', label: 'แฟ้มสะสมผลงาน Portfolio (ถ้ามี)' }
                ].map(doc => (
                  <label
                    key={doc.id}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checkedDocs[doc.id]}
                      onChange={(e) => setCheckedDocs({ ...checkedDocs, [doc.id]: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <span className={`font-medium ${checkedDocs[doc.id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {doc.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Admission Calendar Timeline */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
              <h4 className="font-black text-yellow-400 text-xs sm:text-sm flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-yellow-400" />
                กำหนดการรับสมัครประจำปี
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-white">รอบโควตาพิเศษ & EEC:</p>
                    <p>รับสมัคร พฤศจิกายน - มกราคม</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-white">รอบทั่วไป (ม.3 & ม.6/ปวช.):</p>
                    <p>รับสมัคร กุมภาพันธ์ - มีนาคม</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-white">รายงานตัวและมอบตัว:</p>
                    <p>เมษายน ณ วิทยาลัยเทคนิคบางแสน</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <p className="flex items-center gap-1 text-slate-300">
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  สอบถามงานรับสมัคร: 038-382-628 ต่อ 102
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
