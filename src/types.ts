export type EducationLevel = 'pvc' | 'pvs'; // ปวช. หรือ ปวส.

export type DepartmentCategory = 
  | 'industrial' // ช่างอุตสาหกรรม
  | 'high-tech'   // เทคโนโลยีและนวัตกรรม (EV / หุ่นยนต์ / คอม)
  | 'business'    // พาณิชยการและบริหารธุรกิจ
  | 'hospitality'; // อุตสาหกรรมท่องเที่ยวและการบริการ

export interface Department {
  id: string;
  name: string;
  shortName: string;
  level: EducationLevel[];
  category: DepartmentCategory;
  tagline: string;
  description: string;
  durationYears: number; // 3 ปีสำหรับ ปวช., 2 ปีสำหรับ ปวส.
  mascot: Mascot;
  color: {
    primary: string;
    secondary: string;
    bgLight: string;
    border: string;
    gradient: string;
    text: string;
    badge: string;
  };
  highlights: string[];
  sampleCourses: string[];
  careers: string[];
  startingSalary: string;
  toolsAndEquipments: string[];
  quotaAvailable: boolean;
  futurePathways: {
    pvs: string;
    bachelor: string;
  };
  suitableTraits: string[];
  eecCertified?: boolean; // สอดรับโครงการ EEC
}

export interface Mascot {
  id: string;
  name: string;
  title: string;
  species: string;
  characterDescription: string;
  catchphrase: string;
  avatarType: 'gear' | 'spark' | 'megabot' | 'flammy' | 'cashy' | 'hospy' | 'volty' | 'cyber';
  accentColor: string;
  accessories: string[];
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  context: string;
  iconName: string;
  options: {
    text: string;
    subText?: string;
    // คะแนน weight ให้แต่ละสาขาวิชา id (0 - 5)
    weights: Record<string, number>;
  }[];
}

export interface QuizResultData {
  topDepartment: Department;
  scorePercentage: number;
  rankings: {
    department: Department;
    score: number;
    percentage: number;
  }[];
  traitScores: {
    trait: string;
    score: number;
    maxScore: number;
  }[];
  aiAdvice: string;
}

export interface ApplicationFormState {
  fullName: string;
  nationalId: string;
  phone: string;
  currentSchool: string;
  currentGpa: string;
  selectedLevel: EducationLevel;
  selectedDepartmentId: string;
  secondaryDepartmentId?: string;
  quotaType: 'general' | 'academic' | 'portfolio' | 'eec_scholarship';
  parentPhone: string;
  address: string;
}
