import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CurriculumCarousel } from './components/CurriculumCarousel';
import { TopicDetailPage } from './components/TopicDetailPage';
import { LessonPage } from './components/LessonPage';
import { Marketplace } from './components/Marketplace';
import { ParentDashboard } from './components/ParentDashboard';
import AvatarSamplePage from "./components/avatarSample";
import { HelpFAQ } from './components/HelpFAQ';
import { SuggestionForm } from './components/SuggestionForm';
import { NotFoundPage } from './components/NotFoundPage';
import { Footer } from './components/Footer';
import { TimeBlockPopup } from './components/TimeBlockPopup';


export type Page = 'landing' | 'student-dashboard' | 'curriculum' | 'topic-detail' | 'lesson' | 'marketplace' | 'parent-dashboard' | 'help-faq' | 'suggestion-form';

function AppContent() {
  const location = useLocation();

  // Timer state for tracking student page usage - persisted in sessionStorage
  const [timeSpent, setTimeSpent] = useState(() => {
    const saved = sessionStorage.getItem('studentTimeSpent');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showTimeBlockPopup, setShowTimeBlockPopup] = useState(() => {
    const saved = sessionStorage.getItem('timeBlockPopupShown');
    return saved === 'true';
  });
  const TIME_LIMIT = 300; // 12 seconds for testing (change to 120 for 2 minutes)

  const isStudentView = location.pathname === '/student-dashboard' ||
    location.pathname === '/curriculum' ||
    location.pathname === '/topic-detail' ||
    location.pathname === '/lesson' ||
    location.pathname === '/marketplace';

  const isLandingPage = location.pathname === '/';

  // Save timer state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('studentTimeSpent', timeSpent.toString());
  }, [timeSpent]);

  useEffect(() => {
    sessionStorage.setItem('timeBlockPopupShown', showTimeBlockPopup.toString());
  }, [showTimeBlockPopup]);

  // Timer logic for student pages
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isStudentView && !showTimeBlockPopup) {
      // Start timer when on student pages
      interval = setInterval(() => {
        setTimeSpent((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= TIME_LIMIT) {
            setShowTimeBlockPopup(true);
            return newTime;
          }
          return newTime;
        });
      }, 1000); // Update every second
    }
    // Note: We no longer reset the timer when leaving student pages
    // Timer persists across navigation within the session

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStudentView, showTimeBlockPopup]);

  return (
    <div className="min-h-screen bg-[#fff5ef] flex flex-col">
      {!isLandingPage && <Navigation isStudentView={isStudentView} />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/curriculum" element={<CurriculumCarousel />} />
          <Route path="/topic-detail" element={<TopicDetailPage />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/help-faq" element={<HelpFAQ />} />
          <Route path="/suggestion-form" element={<SuggestionForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
      {isStudentView && <TimeBlockPopup isOpen={showTimeBlockPopup} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      {/* <AvatarSamplePage /> */}
    </BrowserRouter>
  );
}
