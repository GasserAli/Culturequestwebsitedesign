import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CurriculumCarousel } from './components/CurriculumCarousel';
import { TopicDetailPage } from './components/TopicDetailPage';
import { LessonPage } from './components/LessonPage';
import { Marketplace } from './components/Marketplace';
import { ParentDashboard } from './components/ParentDashboard';
import { NotFoundPage } from './components/NotFoundPage';

export type Page = 'landing' | 'student-dashboard' | 'curriculum' | 'topic-detail' | 'lesson' | 'marketplace' | 'parent-dashboard';

function AppContent() {
  const location = useLocation();

  const isStudentView = location.pathname === '/student-dashboard' ||
    location.pathname === '/curriculum' ||
    location.pathname === '/topic-detail' ||
    location.pathname === '/lesson' ||
    location.pathname === '/marketplace';

  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#fff5ef]">
      {!isLandingPage && <Navigation isStudentView={isStudentView} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/curriculum" element={<CurriculumCarousel />} />
        <Route path="/topic-detail" element={<TopicDetailPage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
