import { Crown, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ProfileModal } from './ProfileModal';

interface NavigationProps {
  isStudentView?: boolean;
}

export function Navigation({ isStudentView = false }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const studentLinks: { path: string; label: string }[] = [
    { path: '/student-dashboard', label: 'Dashboard' },
    { path: '/curriculum', label: 'Learn' },
    { path: '/marketplace', label: 'Shop' },
  ];

  const parentLinks: { path: string; label: string }[] = [
    { path: '/', label: 'Home' },
    { path: '/student-dashboard', label: 'Student View' },
    { path: '/parent-dashboard', label: 'Parent View' },
  ];

  const links = isStudentView ? studentLinks : parentLinks;

  const handleSwitchView = () => {
    navigate('/parent-dashboard');
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    navigate('/');
  };

  const handleSettings = () => {
    // Add settings navigation logic here
    console.log('Opening settings...');
  };

  const handleHelpCenter = () => {
    navigate('/help-faq');
  };

  const handleSuggestion = () => {
    navigate('/suggestion-form');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-[#e17624] flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#a33013] font-bold text-xl">CultureQuest</span>
          </Link>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === link.path
                  ? 'bg-[#e17624] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                isStudentView={isStudentView}
                onSwitchView={handleSwitchView}
                onLogout={handleLogout}
                onSettings={handleSettings}
                onHelpCenter={handleHelpCenter}
                onSuggestion={handleSuggestion}
                userAvatar="https://images.unsplash.com/photo-1748200100427-52921dec8597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGF2YXRhciUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjM3MjkwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                triggerRef={profileButtonRef}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
