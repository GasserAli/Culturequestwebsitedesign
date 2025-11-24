import { Crown, User, LogOut, Settings, HelpCircle, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface NavigationProps {
  isStudentView?: boolean;
}

export function Navigation({ isStudentView = false }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/student-dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate('/');
  };

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

  // Only show navigation links if logged in
  const links = isLoggedIn ? (isStudentView ? studentLinks : parentLinks) : [];

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
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${location.pathname === link.path
                  ? 'bg-[#e17624] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors border-2 border-transparent hover:border-[#e17624]"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">Explorer Account</p>
                      <p className="text-xs text-gray-500">explorer@culturequest.com</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => navigate('/parent-dashboard')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Help Center
                      </button>
                    </div>

                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-[#e17624] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#c96520] transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
