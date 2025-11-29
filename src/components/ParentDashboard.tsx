import { TrendingUp, Clock, Award, BookOpen, Target, CheckCircle, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function ParentDashboard() {
  const navigate = useNavigate();
  const weeklyProgressData = [
    { day: 'Mon', minutes: 25, lessons: 2 },
    { day: 'Tue', minutes: 35, lessons: 3 },
    { day: 'Wed', minutes: 20, lessons: 1 },
    { day: 'Thu', minutes: 45, lessons: 4 },
    { day: 'Fri', minutes: 30, lessons: 2 },
    { day: 'Sat', minutes: 50, lessons: 3 },
    { day: 'Sun', minutes: 40, lessons: 3 },
  ];

  const activityFeed = [
    {
      id: 1,
      type: 'lesson',
      title: 'Completed "The Great Pyramids"',
      unit: 'History',
      timestamp: '2 hours ago',
      score: 95,
      icon: CheckCircle,
      color: '#2cc75c',
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Earned "History Master" Badge',
      timestamp: '5 hours ago',
      icon: Award,
      color: '#e17624',
    },
    {
      id: 3,
      type: 'quiz',
      title: 'Quiz: Egyptian Hieroglyphics',
      unit: 'Language',
      timestamp: '1 day ago',
      score: 88,
      icon: Target,
      color: '#a33013',
    },
    {
      id: 4,
      type: 'lesson',
      title: 'Started "Ancient Music"',
      unit: 'Music',
      timestamp: '1 day ago',
      icon: BookOpen,
      color: '#2cc75c',
    },
    {
      id: 5,
      type: 'achievement',
      title: '7-Day Streak Achieved',
      timestamp: '2 days ago',
      icon: Award,
      color: '#e17624',
    },
  ];

  const stats = [
    {
      label: 'Total Time',
      value: '12.5 hrs',
      change: '+15%',
      icon: Clock,
      color: '#a33013',
    },
    {
      label: 'Lessons Completed',
      value: '23',
      change: '+8 this week',
      icon: BookOpen,
      color: '#e17624',
    },
    {
      label: 'Avg. Quiz Score',
      value: '91%',
      change: '+3%',
      icon: Target,
      color: '#2cc75c',
    },
    {
      label: 'Current Streak',
      value: '7 days',
      change: 'Personal best!',
      icon: Award,
      color: '#a33013',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763013259158-8a8370542ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGlsZCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjM3MTM4ODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Parent and child"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="mb-1">Welcome back, Parent!</h2>
                <p className="text-gray-600">Your child's learning progress</p>
              </div>
            </div>
            <button className="bg-[#e17624] text-white px-6 py-3 rounded-xl hover:bg-[#c96520] transition-colors">
              Manage Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-[#a33013] mb-2">{stat.value}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#2cc75c]" />
                <span className="text-sm text-[#2cc75c]">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weekly Progress Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="mb-2">Weekly Activity</h3>
                <p className="text-gray-600">Learning time and lessons completed</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#e17624]"></div>
                  <span className="text-sm text-gray-600">Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2cc75c]"></div>
                  <span className="text-sm text-gray-600">Lessons</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  stroke="#666"
                  style={{ fontSize: '14px' }}
                />
                <YAxis
                  stroke="#666"
                  style={{ fontSize: '14px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#e17624"
                  strokeWidth={3}
                  dot={{ fill: '#e17624', r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="lessons"
                  stroke="#2cc75c"
                  strokeWidth={3}
                  dot={{ fill: '#2cc75c', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#e17624]" />
              Recent Activity
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${activity.color}15` }}
                  >
                    <activity.icon className="w-5 h-5" style={{ color: activity.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 mb-1">{activity.title}</p>
                    {activity.unit && (
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mb-1">
                        {activity.unit}
                      </span>
                    )}
                    {activity.score && (
                      <p className="text-xs text-[#2cc75c] mb-1">Score: {activity.score}%</p>
                    )}
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unit Progress */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="mb-6">Progress by Unit</h3>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { name: 'History', progress: 67, color: '#a33013' },
              { name: 'Food', progress: 0, color: '#e17624' },
              { name: 'Music', progress: 0, color: '#2cc75c' },
              { name: 'Language', progress: 20, color: '#a33013' },
              { name: 'Etiquette', progress: 0, color: '#e17624' },
            ].map((unit, index) => (
              <div key={index} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#f0f0f0"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke={unit.color}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - unit.progress / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#a33013]">{unit.progress}%</span>
                  </div>
                </div>
                <p className="text-gray-700">{unit.name}</p>
                <p className="text-sm text-gray-500">
                  {unit.progress === 0 ? 'Not started' : 'In progress'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Child Management */}
        <div className="mt-6 bg-gradient-to-r from-[#a33013] to-[#e17624] rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#e17624] mb-2">Child Account Settings</h3>
              <p className="text-white/90">
                Manage learning goals, screen time limits, and curriculum preferences
              </p>
            </div>
            <button className="bg-white text-[#a33013] px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Configure Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
