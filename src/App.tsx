import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { QuizSection } from './components/QuizSection';
import { QuizResult } from './components/QuizResult';
import { DepartmentExplorer } from './components/DepartmentExplorer';
import { DepartmentCompare } from './components/DepartmentCompare';
import { AdmissionPortal } from './components/AdmissionPortal';
import { CollegeInfoBanner } from './components/CollegeInfoBanner';
import { QuizResultData, Department } from './types';
import { DEPARTMENTS } from './data/departments';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quiz');
  const [quizResult, setQuizResult] = useState<QuizResultData | null>(null);
  const [selectedDeptForApply, setSelectedDeptForApply] = useState<Department | null>(null);
  const [compareDeptA, setCompareDeptA] = useState<Department>(DEPARTMENTS[0]);
  const [compareDeptB, setCompareDeptB] = useState<Department>(DEPARTMENTS[2]);
  const [deptForModal, setDeptForModal] = useState<Department | null>(null);

  const handleQuizComplete = (result: QuizResultData) => {
    setQuizResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setQuizResult(null);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyForMajor = (department: Department) => {
    setSelectedDeptForApply(department);
    setActiveTab('admission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompareWith = (department: Department) => {
    setCompareDeptA(department);
    const other = DEPARTMENTS.find(d => d.id !== department.id) || DEPARTMENTS[1];
    setCompareDeptB(other);
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDepartmentDetails = (department: Department) => {
    setDeptForModal(department);
    setActiveTab('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickStartQuiz = () => {
    setQuizResult(null);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickStartQuiz={handleQuickStartQuiz}
      />

      {/* Main View Router Container */}
      <main className="flex-1">
        {activeTab === 'quiz' && (
          <div>
            {quizResult ? (
              <QuizResult
                result={quizResult}
                onRetake={handleRetakeQuiz}
                onApplyForMajor={handleApplyForMajor}
                onViewDepartmentDetails={handleViewDepartmentDetails}
              />
            ) : (
              <QuizSection
                onComplete={handleQuizComplete}
                onExploreMajors={() => {
                  setActiveTab('explorer');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        )}

        {activeTab === 'explorer' && (
          <DepartmentExplorer
            onApplyForMajor={handleApplyForMajor}
            onCompareWith={handleCompareWith}
            selectedDepartmentForModal={deptForModal}
            onCloseModal={() => setDeptForModal(null)}
          />
        )}

        {activeTab === 'compare' && (
          <DepartmentCompare
            initialDeptA={compareDeptA}
            initialDeptB={compareDeptB}
            onApplyForMajor={handleApplyForMajor}
          />
        )}

        {activeTab === 'admission' && (
          <AdmissionPortal
            preSelectedDepartment={selectedDeptForApply}
            onGoToExplorer={() => {
              setActiveTab('explorer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* College Info, Mascots Showcase & Footer */}
      <CollegeInfoBanner
        onStartQuiz={handleQuickStartQuiz}
        onExploreMajors={() => {
          setActiveTab('explorer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
