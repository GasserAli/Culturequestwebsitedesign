import { useState } from "react";
import {
    BookOpen,
    Music,
    Utensils,
    Heart,
    ChevronLeft,
    ChevronRight,
    Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CurriculumCarousel() {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleTopicClick = (topic: any) => {
        // Exclude the icon property as it's a React component and cannot be serialized
        const { icon, ...topicData } = topic;
        console.log("Navigating to topic:", topicData);
        navigate("/topic-detail", { state: { topic: topicData } });
    };

    const topics = [
        {
            id: 1,
            title: "History",
            icon: BookOpen,
            color: "#a33013",
            totalUnits: 5,
            completedUnits: 3,
            description: "Explore pyramids, pharaohs, and ancient civilizations",
            image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&h=600&fit=crop",
            units: [
                {
                    id: "1.1",
                    title: "Ancient Egypt Basics",
                    lessonCount: 5,
                    lessons: [
                        { id: "1.1.1", title: "Introduction to Ancient Egypt", description: "Overview of Egyptian civilization", status: "completed" as const },
                        { id: "1.1.2", title: "The Nile River", description: "Life along the Nile", status: "in-progress" as const },
                        { id: "1.1.3", title: "Egyptian Society", description: "Social structure and daily life", status: "locked" as const },
                        { id: "1.1.4", title: "Pharaohs and Power", description: "Egyptian rulers", status: "locked" as const },
                        { id: "1.1.5", title: "Writing and Hieroglyphs", description: "Egyptian writing system", status: "locked" as const },
                    ],
                },
                {
                    id: "1.2",
                    title: "Pyramids and Architecture",
                    lessonCount: 4,
                    lessons: [
                        { id: "1.2.1", title: "The Great Pyramid", description: "Wonders of Giza", status: "locked" as const },
                        { id: "1.2.2", title: "Temple Construction", description: "Building techniques", status: "locked" as const },
                        { id: "1.2.3", title: "Tombs and Burial", description: "Egyptian afterlife beliefs", status: "locked" as const },
                        { id: "1.2.4", title: "Architectural Innovations", description: "Engineering marvels", status: "locked" as const },
                    ],
                },
            ],
        },
        {
            id: 2,
            title: "Food & Cuisine",
            icon: Utensils,
            color: "#e17624",
            totalUnits: 4,
            completedUnits: 1,
            description: "Discover traditional Egyptian cuisine and recipes",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
            units: [
                {
                    id: "2.1",
                    title: "Traditional Dishes",
                    lessonCount: 5,
                    lessons: [
                        { id: "2.1.1", title: "Koshari", description: "Egypt's national dish", status: "completed" as const },
                        { id: "2.1.2", title: "Ful Medames", description: "Traditional breakfast", status: "locked" as const },
                        { id: "2.1.3", title: "Molokhia", description: "Green soup delicacy", status: "locked" as const },
                        { id: "2.1.4", title: "Mahshi", description: "Stuffed vegetables", status: "locked" as const },
                        { id: "2.1.5", title: "Egyptian Bread", description: "Aish baladi", status: "locked" as const },
                    ],
                },
            ],
        },
        {
            id: 3,
            title: "Music & Arts",
            icon: Music,
            color: "#2cc75c",
            totalUnits: 4,
            completedUnits: 0,
            description: "Learn about ancient instruments and rhythms",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
            units: [
                {
                    id: "3.1",
                    title: "Ancient Music",
                    lessonCount: 4,
                    lessons: [
                        { id: "3.1.1", title: "Egyptian Instruments", description: "Traditional instruments", status: "locked" as const },
                        { id: "3.1.2", title: "Music in Ceremonies", description: "Religious and cultural music", status: "locked" as const },
                        { id: "3.1.3", title: "Dance and Movement", description: "Traditional dances", status: "locked" as const },
                        { id: "3.1.4", title: "Modern Egyptian Music", description: "Contemporary influences", status: "locked" as const },
                    ],
                },
            ],
        },
        {
            id: 4,
            title: "Etiquette & Customs",
            icon: Heart,
            color: "#a33013",
            totalUnits: 3,
            completedUnits: 2,
            description: "Understand customs, traditions, and social norms",
            image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&h=600&fit=crop",
            units: [
                {
                    id: "4.1",
                    title: "Social Customs",
                    lessonCount: 5,
                    lessons: [
                        { id: "4.1.1", title: "Greetings and Hospitality", description: "Egyptian manners", status: "completed" as const },
                        { id: "4.1.2", title: "Family Values", description: "Family structure", status: "in-progress" as const },
                        { id: "4.1.3", title: "Celebrations and Festivals", description: "Traditional celebrations", status: "locked" as const },
                        { id: "4.1.4", title: "Religious Practices", description: "Cultural traditions", status: "locked" as const },
                        { id: "4.1.5", title: "Modern Etiquette", description: "Contemporary customs", status: "locked" as const },
                    ],
                },
            ],
        },
    ];

    const scroll = (direction: "left" | "right") => {
        const container = document.getElementById("topics-container");
        if (container) {
            const scrollAmount = 400;
            const newPosition =
                direction === "left"
                    ? scrollPosition - scrollAmount
                    : scrollPosition + scrollAmount;

            container.scrollTo({
                left: newPosition,
                behavior: "smooth",
            });
            setScrollPosition(newPosition);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Topics
                    </h1>
                    <p className="text-xl text-gray-600">
                        Explore the various layers of Egyptian culture
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Previous topics"
                    >
                        <ChevronLeft className="w-7 h-7 text-gray-700" />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Next topics"
                    >
                        <ChevronRight className="w-7 h-7 text-gray-700" />
                    </button>

                    {/* Topics Container */}
                    <div
                        id="topics-container"
                        className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-20"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {topics.map((topic) => (
                            <div
                                key={topic.id}
                                className="flex-shrink-0 w-96 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                                onClick={() => handleTopicClick(topic)}
                            >
                                {/* Topic Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={topic.image}
                                        alt={topic.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                    {/* Icon Badge */}
                                    <div
                                        className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm"
                                        style={{ backgroundColor: `${topic.color}dd` }}
                                    >
                                        <topic.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Title Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-3xl text-[#fff5ef] font-bold mb-2 ">
                                            {topic.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Topic Info */}
                                <div className="p-8">
                                    <p className="text-gray-600 mb-6 text-lg">
                                        {topic.description}
                                    </p>

                                    {/* Progress */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                            <span className="font-medium">Progress</span>
                                            <span className="font-semibold">
                                                {topic.completedUnits}/{topic.totalUnits} units completed
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="h-3 rounded-full transition-all duration-500 bg-[#e17624]"
                                                style={{
                                                    width: `${(topic.completedUnits / topic.totalUnits) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleTopicClick(topic);
                                        }}
                                        className="w-full py-4 rounded-xl font-semibold text-white text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md bg-[#e17624]">
                                        {topic.completedUnits === 0
                                            ? "Start Learning"
                                            : topic.completedUnits === topic.totalUnits
                                                ? "Review Topic"
                                                : "Continue Learning"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievement Section */}
                <div className="mt-16 bg-gradient-to-r from-[#a33013] to-[#e17624] rounded-2xl p-8 text-white text-center">
                    <h2 className="text-white text-3xl font-bold mb-4">
                        Complete All Topics to Earn
                    </h2>
                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                        <div className="w-28 h-28 bg-[#2cc75c] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Star className="w-14 h-14 text-white" />
                        </div>
                        <h3 className="text-white text-2xl font-bold mb-3">
                            Master Explorer Certificate
                        </h3>
                        <p className="text-white/90 text-lg">
                            Official recognition of your Ancient Egypt expertise
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
