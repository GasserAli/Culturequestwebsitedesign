import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CurriculumMap } from './components/CurriculumMap';
import { LessonPage } from './components/LessonPage';
import { Marketplace } from './components/Marketplace';
import { ParentDashboard } from './components/ParentDashboard';

type Page = 'landing' | 'student-dashboard' | 'curriculum' | 'lesson' | 'marketplace' | 'parent-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const isStudentView = currentPage === 'student-dashboard' || 
                        currentPage === 'curriculum' || 
                        currentPage === 'lesson' || 
                        currentPage === 'marketplace';

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'student-dashboard':
        return <StudentDashboard onNavigate={setCurrentPage} />;
      case 'curriculum':
        return <CurriculumMap onNavigate={setCurrentPage} />;
      case 'lesson':
        return <LessonPage onNavigate={setCurrentPage} />;
      case 'marketplace':
        return <Marketplace onNavigate={setCurrentPage} />;
      case 'parent-dashboard':
        return <ParentDashboard onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5ef]">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isStudentView={isStudentView}
      />
      {renderPage()}
    </div>
  );
}
