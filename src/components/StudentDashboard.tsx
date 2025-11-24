import { Coins, Play, CheckCircle, Star, Target, Book, ChevronRight, Lock } from 'lucide-react';
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

  const curriculum = [
    {
      id: 'unit-1',
      title: 'Ancient Egypt',
      color: 'from-[#e17624] to-[#a33013]',
      topics: [
        {
          id: 'topic-1',
          title: 'Pharaohs & Pyramids',
          lessons: [
            { id: 'l1', title: 'The Great Pyramid', type: 'video', duration: '5 min', completed: true },
            { id: 'l2', title: 'Life of a Pharaoh', type: 'quiz', duration: '10 min', completed: false, locked: false },
            { id: 'l3', title: 'Building the Sphinx', type: 'activity', duration: '15 min', completed: false, locked: true },
          ]
        },
        {
          id: 'topic-2',
          title: 'Daily Life',
          lessons: [
            { id: 'l4', title: 'Food & Farming', type: 'video', duration: '8 min', completed: false, locked: true },
            { id: 'l5', title: 'Games & Toys', type: 'activity', duration: '12 min', completed: false, locked: true },
          ]
        }
      ]
    },
    {
      id: 'unit-2',
      title: 'Ancient Greece',
      color: 'from-[#2cc75c] to-[#1a9f43]',
      topics: [
        {
          id: 'topic-3',
          title: 'Gods & Heroes',
          lessons: [
            { id: 'l6', title: 'Mount Olympus', type: 'video', duration: '6 min', completed: false, locked: true },
            { id: 'l7', title: 'Hercules', type: 'story', duration: '15 min', completed: false, locked: true },
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Avatar and Coins */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e17624] to-[#a33013] flex items-center justify-center border-4 border-[#2cc75c] shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748200100427-52921dec8597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGF2YXRhciUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjM3MjkwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome back, Explorer!</h1>
                <div className="flex items-center gap-2">
                  <span className="bg-[#fff5ef] text-[#e17624] px-3 py-1 rounded-full text-sm font-bold border border-[#e17624]/20">Level 7</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 font-medium">History Master</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#e17624] to-[#a33013] text-white px-8 py-4 rounded-2xl shadow-lg flex items-center gap-4 transform hover:scale-105 transition-transform">
              <div className="bg-white/20 p-2 rounded-full">
                <Coins className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">Your Treasure</p>
                <p className="text-3xl font-bold">1,250</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Curriculum Carousel */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Your Journey</h2>
              <button
                onClick={() => navigate('/curriculum')}
                className="text-[#e17624] font-bold hover:text-[#c96520] flex items-center gap-1"
              >
                View Map <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Units Carousel */}
            <div className="space-y-8">
              {curriculum.map((unit) => (
                <div key={unit.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className={`bg-gradient-to-r ${unit.color} p-4 text-white flex justify-between items-center`}>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      {unit.title}
                    </h3>
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {unit.topics.length} Topics
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex overflow-x-auto pb-4 gap-6 snap-x">
                      {unit.topics.map((topic) => (
                        <div key={topic.id} className="min-w-[280px] snap-start">
                          <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            {topic.title}
                          </h4>
                          <div className="space-y-3">
                            {topic.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                disabled={lesson.locked}
                                onClick={() => !lesson.locked && navigate('/lesson')}
                                className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between group ${lesson.locked
                                    ? 'bg-gray-50 border-gray-100 opacity-70 cursor-not-allowed'
                                    : lesson.completed
                                      ? 'bg-[#2cc75c]/5 border-[#2cc75c] hover:bg-[#2cc75c]/10'
                                      : 'bg-white border-gray-200 hover:border-[#e17624] hover:shadow-md'
                                  }`}
                              >
                                <div>
                                  <p className={`font-bold text-sm ${lesson.completed ? 'text-[#2cc75c]' : 'text-gray-800'}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{lesson.duration} • {lesson.type}</p>
                                </div>
                                {lesson.locked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : lesson.completed ? (
                                  <CheckCircle className="w-5 h-5 text-[#2cc75c]" />
                                ) : (
                                  <Play className="w-5 h-5 text-[#e17624] opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#2cc75c]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-[#2cc75c]" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Lessons Done</p>
                <p className="text-2xl font-bold text-[#2cc75c]">23</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#e17624]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-[#e17624]" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Achievements</p>
                <p className="text-2xl font-bold text-[#e17624]">12</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#a33013]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-[#a33013]" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Day Streak</p>
                <p className="text-2xl font-bold text-[#a33013]">7</p>
              </div>
            </div>
          </div>

          {/* Daily Quests Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Star className="w-6 h-6 text-[#e17624] fill-[#e17624]" />
                  Daily Quests
                </h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  12h left
                </span>
              </div>

              <div className="space-y-4">
                {dailyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className={`p-4 rounded-xl border-2 transition-all ${quest.completed
                      ? 'bg-[#2cc75c]/5 border-[#2cc75c]'
                      : 'bg-white border-gray-100 hover:border-[#e17624] hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${quest.completed ? 'bg-[#2cc75c] text-white' : 'bg-[#fff5ef] text-[#e17624]'
                        }`}>
                        {quest.completed ? <CheckCircle className="w-6 h-6" /> : <quest.icon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm mb-1 ${quest.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                          {quest.title}
                        </p>
                        {!quest.completed && (
                          <div className="flex items-center gap-1.5">
                            <Coins className="w-3.5 h-3.5 text-[#e17624]" />
                            <span className="text-xs font-bold text-[#e17624]">+{quest.reward}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Daily Progress</span>
                  <span className="text-sm font-bold text-[#e17624]">1/4</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e17624] w-1/4 rounded-full"></div>
                </div>
              </div>

              <button
                onClick={() => navigate('/curriculum')}
                className="w-full bg-[#e17624] text-white py-3.5 rounded-xl hover:bg-[#c96520] transition-colors mt-6 font-bold shadow-lg shadow-[#e17624]/20 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
