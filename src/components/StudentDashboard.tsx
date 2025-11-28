import { Coins, Play, CheckCircle, Star, Target, Book } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function StudentDashboard() {
  const navigate = useNavigate();
  const dailyQuests = [
    {
      id: 1,
      title: 'Complete a History Lesson',
      reward: 50,
      completed: false,
      icon: Book,
    },
    {
      id: 2,
      title: 'Score 80% on Any Quiz',
      reward: 75,
      completed: true,
      icon: Target,
    },
    {
      id: 3,
      title: 'Watch 3 Videos',
      reward: 30,
      completed: false,
      icon: Play,
    },
    {
      id: 4,
      title: 'Explore the Marketplace',
      reward: 20,
      completed: false,
      icon: Star,
    },
  ];

  const recentLessons = [
    {
      id: 1,
      title: 'The Great Pyramids',
      unit: 'History',
      progress: 65,
      thumbnail: 'https://images.unsplash.com/photo-1697453809142-35c7c1463682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBweXJhbWlkc3xlbnwxfHx8fDE3NjM4MTYyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Egyptian Hieroglyphics',
      unit: 'Language',
      progress: 30,
      thumbnail: 'https://images.unsplash.com/photo-1662655558695-fa6d74f16b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBhbmNpZW50JTIwZWd5cHR8ZW58MXx8fHwxNzYzODE2MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Avatar and Coins */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e17624] to-[#a33013] flex items-center justify-center border-4 border-[#2cc75c]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748200100427-52921dec8597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGF2YXRhciUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjM3MjkwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="mb-1">Welcome back, Explorer!</h2>
                <p className="text-gray-600">Level 7 • History Master</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#e17624] to-[#a33013] text-white px-8 py-4 rounded-xl flex items-center gap-3">
              <Coins className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Your Coins</p>
                <p className="text-2xl">1,250</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Learning */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#a33013] to-[#e17624] text-white p-6">
                <h3 className="text-[#e17624] mb-2">Resume Learning</h3>
                <p className="text-white/90">Pick up where you left off</p>
              </div>
              <div className="p-6">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex gap-4 items-center mb-4 last:mb-0">
                    <ImageWithFallback
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-32 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="inline-block bg-[#2cc75c] text-white px-3 py-1 rounded-full text-sm mb-2">
                        {lesson.unit}
                      </div>
                      <h3 className="mb-2">{lesson.title}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#e17624] h-2 rounded-full"
                            style={{ width: `${lesson.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{lesson.progress}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/lesson')}
                      className="bg-[#e17624] text-white px-6 py-3 rounded-xl hover:bg-[#c96520] transition-colors flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-[#2cc75c] rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-600 mb-1">Lessons Done</p>
                <p className="text-[#a33013]">23</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-[#e17624] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-600 mb-1">Achievements</p>
                <p className="text-[#a33013]">12</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-[#a33013] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-600 mb-1">Streak</p>
                <p className="text-[#a33013]">7 days</p>
              </div>
            </div>
          </div>

          {/* Daily Quests Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="mb-6 flex items-center gap-2 text-[#a33013]">
                <Star className="w-6 h-6 text-[#e17624]" />
                Daily Quests
              </h3>
              <div className="space-y-4">
                {dailyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className={`p-4 rounded-xl border-2 transition-all ${quest.completed
                      ? 'bg-[#2cc75c]/10 border-[#2cc75c]'
                      : 'bg-gray-50 border-gray-200 hover:border-[#e17624]'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${quest.completed ? 'bg-[#2cc75c]' : 'bg-[#e17624]'
                        }`}>
                        <quest.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className={quest.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                          {quest.title}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Coins className="w-4 h-4 text-[#e17624]" />
                          <span className="text-sm text-gray-600">+{quest.reward} coins</span>
                        </div>
                      </div>
                      {quest.completed && (
                        <CheckCircle className="w-6 h-6 text-[#2cc75c]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/curriculum')}
                className="w-full bg-[#e17624] text-white py-3 rounded-xl hover:bg-[#c96520] transition-colors mt-6"
              >
                Start New Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
