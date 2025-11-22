import { Crown, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isStudentView?: boolean;
}

export function Navigation({ currentPage, onNavigate, isStudentView = false }: NavigationProps) {
  const studentLinks = [
    { id: 'student-dashboard', label: 'Dashboard' },
    { id: 'curriculum', label: 'Learn' },
    { id: 'marketplace', label: 'Shop' },
  ];

  const parentLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'student-dashboard', label: 'Student View' },
    { id: 'parent-dashboard', label: 'Parent View' },
  ];

  const links = isStudentView ? studentLinks : parentLinks;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-[#e17624] flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#a33013]">CultureQuest</span>
          </button>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#e17624] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
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
