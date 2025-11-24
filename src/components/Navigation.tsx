import { Crown, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  isStudentView?: boolean;
}

export function Navigation({ isStudentView = false }: NavigationProps) {
  const location = useLocation();

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
            <span className="text-[#a33013]">CultureQuest</span>
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
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
