import {
  BookOpen,
  Music,
  Utensils,
  MessageSquare,
  Heart,
  Lock,
  CheckCircle,
  Star,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function CurriculumMap() {
  const navigate = useNavigate();
  const units = [
    {
      id: 1,
      title: "History",
      icon: BookOpen,
      color: "#a33013",
      lessons: 12,
      completed: 8,
      status: "in-progress",
      description:
        "Explore pyramids, pharaohs, and ancient civilizations",
    },
    {
      id: 2,
      title: "Food",
      icon: Utensils,
      color: "#e17624",
      lessons: 8,
      completed: 0,
      status: "locked",
      description:
        "Discover traditional Egyptian cuisine and recipes",
    },
    {
      id: 3,
      title: "Music",
      icon: Music,
      color: "#2cc75c",
      lessons: 10,
      completed: 0,
      status: "locked",
      description:
        "Learn about ancient instruments and rhythms",
    },
    {
      id: 4,
      title: "Language",
      icon: MessageSquare,
      color: "#a33013",
      lessons: 15,
      completed: 3,
      status: "in-progress",
      description:
        "Master hieroglyphics and basic Egyptian words",
    },
    {
      id: 5,
      title: "Etiquette",
      icon: Heart,
      color: "#e17624",
      lessons: 6,
      completed: 0,
      status: "locked",
      description:
        "Understand customs, traditions, and social norms",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Your Learning Journey</h1>
          <p className="text-xl text-gray-600">
            Follow the path through Ancient Egypt
          </p>
        </div>

        {/* Journey Path */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a33013] via-[#e17624] to-[#2cc75c] transform -translate-x-1/2 hidden lg:block"></div>

          {/* Units */}
          <div className="space-y-8">
            {units.map((unit, index) => (
              <div
                key={unit.id}
                className={`flex items-center gap-8 ${index % 2 === 0
                  ? "lg:flex-row"
                  : "lg:flex-row-reverse"
                  }`}
              >
                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1"></div>

                {/* Unit Card */}
                <div
                  className={`flex-1 bg-white rounded-2xl shadow-xl p-8 relative ${unit.status === "locked" ? "opacity-60" : ""
                    }`}
                >
                  {/* Status Badge */}
                  <div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: unit.color }}
                  >
                    {unit.status === "locked" ? (
                      <Lock className="w-8 h-8 text-white" />
                    ) : unit.completed === unit.lessons ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <Star className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <div className="flex items-start gap-6">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${unit.color}15`,
                      }}
                    >
                      <unit.icon
                        className="w-10 h-10"
                        style={{ color: unit.color }}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2>{unit.title}</h2>
                        <span className="text-sm text-gray-500">
                          Unit {unit.id}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {unit.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {unit.completed} / {unit.lessons}{" "}
                            lessons
                          </span>
                        </div>
                        {unit.status === "in-progress" && (
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(unit.completed / unit.lessons) * 100}%`,
                                backgroundColor: unit.color,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          unit.status !== "locked" &&
                          navigate("/lesson")
                        }
                        disabled={unit.status === "locked"}
                        className={`px-6 py-3 rounded-xl transition-colors ${unit.status === "locked"
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "text-white hover:opacity-90"
                          }`}
                        style={{
                          backgroundColor:
                            unit.status !== "locked"
                              ? unit.color
                              : undefined,
                        }}
                      >
                        {unit.status === "locked"
                          ? "Complete previous units to unlock"
                          : unit.completed === 0
                            ? "Start Unit"
                            : "Continue Learning"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div
                  className="hidden lg:block w-8 h-8 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 z-10"
                  style={{ backgroundColor: unit.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Showcase */}
        <div className="mt-16 bg-gradient-to-r from-[#a33013] to-[#e17624] rounded-2xl p-8 text-white text-center">
          <h2 className="text-white mb-4">
            Complete All Units to Earn
          </h2>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="w-24 h-24 bg-[#2cc75c] rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-white mb-2">
              Master Explorer Certificate
            </h3>
            <p className="text-white/90">
              Official recognition of your Ancient Egypt
              expertise
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}