import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2, Circle, Pencil } from "lucide-react";

interface Lesson {
    id: string;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "locked";
}

interface Unit {
    id: string;
    title: string;
    lessonCount: number;
    lessons: Lesson[];
}

interface TopicData {
    id: number;
    title: string;
    color: string;
    units: Unit[];
}

export function TopicDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const topicData = location.state?.topic as TopicData;

    // Mock data - in a real app, this would come from props or API
    const defaultTopicData: TopicData = {
        id: 1,
        title: "World History Fundamentals",
        color: "#60a5fa",
        units: [
            {
                id: "1.1",
                title: "Ancient Civilizations",
                lessonCount: 5,
                lessons: [
                    {
                        id: "1.1.1",
                        title: "Mesopotamia: Medieval Europe",
                        description: "Learn about the cradle of civilization",
                        status: "completed",
                    },
                    {
                        id: "1.1.2",
                        title: "Ancient Egypt",
                        description: "Explore the land of pharaohs",
                        status: "in-progress",
                    },
                    {
                        id: "1.1.3",
                        title: "Ancient Greece",
                        description: "Discover Greek philosophy and democracy",
                        status: "locked",
                    },
                    {
                        id: "1.1.4",
                        title: "Ancient Rome",
                        description: "Study the Roman Empire",
                        status: "locked",
                    },
                    {
                        id: "1.1.5",
                        title: "Ancient China",
                        description: "Learn about Chinese dynasties",
                        status: "locked",
                    },
                ],
            },
            {
                id: "1.2",
                title: "Medieval Europe",
                lessonCount: 5,
                lessons: [
                    {
                        id: "1.2.1",
                        title: "The Fall of Rome",
                        description: "Understand the transition period",
                        status: "locked",
                    },
                    {
                        id: "1.2.2",
                        title: "Feudalism",
                        description: "Learn about medieval social structure",
                        status: "locked",
                    },
                    {
                        id: "1.2.3",
                        title: "The Crusades",
                        description: "Explore religious conflicts",
                        status: "locked",
                    },
                    {
                        id: "1.2.4",
                        title: "The Black Death",
                        description: "Study the plague's impact",
                        status: "locked",
                    },
                    {
                        id: "1.2.5",
                        title: "The Renaissance",
                        description: "Discover cultural rebirth",
                        status: "locked",
                    },
                ],
            },
        ],
    };

    const topic = topicData || defaultTopicData;

    // State to track which units are expanded - initialized with all units expanded
    const [expandedUnits, setExpandedUnits] = useState<Set<string>>(() => {
        // Initialize with all unit IDs to expand all units by default
        return new Set(topic.units.map(unit => unit.id));
    });

    const toggleUnit = (unitId: string) => {
        const newExpanded = new Set(expandedUnits);
        if (newExpanded.has(unitId)) {
            newExpanded.delete(unitId);
        } else {
            newExpanded.add(unitId);
        }
        setExpandedUnits(newExpanded);
    };

    const handleLessonClick = (lesson: Lesson) => {
        if (lesson.status !== "locked") {
            navigate("/lesson", { state: { lesson } });
        }
    };

    const getStatusIcon = (status: Lesson["status"]) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="w-5 h-5 text-[#2cc75c]" />;
            case "in-progress":
                return <Circle className="w-5 h-5 text-[#e17624]" />;
            case "locked":
                return <Circle className="w-5 h-5 text-gray-300" />;
        }
    };

    const getStatusBadge = (status: Lesson["status"]) => {
        if (status === "in-progress") {
            return (
                <span className="px-3 py-1 bg-[#2cc75c] text-white text-xs font-semibold rounded-full">
                    Continue
                </span>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-[#fff5ef] p-6">
            <div className="max-w-4xl mx-auto">
                {/* Topic Title - Centered */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {topic.title}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#a33013] to-[#e17624] mx-auto rounded-full"></div>
                </div>

                {/* Units List */}
                <div className="space-y-4">
                    {topic.units.map((unit) => (
                        <div key={unit.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                            {/* Unit Header - Clickable */}
                            <button
                                onClick={() => toggleUnit(unit.id)}
                                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                style={{ backgroundColor: expandedUnits.has(unit.id) ? topic.color + "20" : "transparent" }}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: topic.color + "30" }}
                                    >
                                        <BookOpen className="w-6 h-6" style={{ color: topic.color }} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Unit {unit.id}: {unit.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {unit.lessonCount} Lessons
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {expandedUnits.has(unit.id) ? (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronRight className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {/* Lessons List - Expandable */}
                            {expandedUnits.has(unit.id) && (
                                <div className="border-t border-gray-200">
                                    {unit.lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${lesson.status === "locked" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                                                } ${index !== unit.lessons.length - 1 ? "border-b border-gray-100" : ""}`}
                                            onClick={() => handleLessonClick(lesson)}
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="ml-8">
                                                    {getStatusIcon(lesson.status)}
                                                </div>
                                                <div className="flex items-center gap-3 flex-1">
                                                    <Pencil className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <h4 className="text-base font-medium text-gray-900">
                                                            Lesson {lesson.id}: {lesson.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {lesson.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {getStatusBadge(lesson.status)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md"
                    >
                        Back to Topics
                    </button>
                </div>
            </div>
        </div>
    );
}
