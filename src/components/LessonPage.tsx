import { Play, BookOpen, Clock, Star, ArrowLeft, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LessonPageProps {
  onNavigate: (page: string) => void;
}

export function LessonPage({ onNavigate }: LessonPageProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('curriculum')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#a33013] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Curriculum
        </button>

        {/* Lesson Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="inline-block bg-[#a33013] text-white px-4 py-2 rounded-lg mb-3">
                History • Lesson 3
              </div>
              <h1 className="mb-2">The Great Pyramids</h1>
              <p className="text-xl text-gray-600">
                Discover how the ancient Egyptians built these magnificent structures
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#2cc75c]/10 px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 text-[#2cc75c]" />
              <span className="text-[#2cc75c]">+50 coins</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Beginner Level</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#2cc75c]" />
              <span>65% Complete</span>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1697453809142-35c7c1463682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBweXJhbWlkc3xlbnwxfHx8fDE3NjM4MTYyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Pyramids"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button className="w-20 h-20 bg-[#e17624] rounded-full flex items-center justify-center hover:bg-[#c96520] transition-colors shadow-2xl">
                <Play className="w-10 h-10 text-white ml-1" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Introduction to the Pyramids</span>
                <span>3:45 / 8:30</span>
              </div>
              <div className="mt-2 bg-white/20 rounded-full h-2">
                <div className="bg-[#e17624] h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="mb-6">About the Pyramids</h2>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700">
              The Great Pyramids of Giza are among the most iconic structures in human history. 
              Built over 4,500 years ago, these massive monuments were constructed as tombs for the 
              pharaohs of ancient Egypt.
            </p>

            <div className="bg-[#fff5ef] border-l-4 border-[#e17624] p-6 rounded-r-lg my-6">
              <h3 className="mb-3 flex items-center gap-2">
                <Star className="w-6 h-6 text-[#e17624]" />
                Fun Fact
              </h3>
              <p className="text-gray-700">
                The Great Pyramid of Khufu was the tallest man-made structure in the world for over 
                3,800 years! It stands at 481 feet (146 meters) tall.
              </p>
            </div>

            <h3>How Were They Built?</h3>
            <p className="text-gray-700">
              The ancient Egyptians used incredible engineering skills to build the pyramids. Workers 
              cut massive limestone blocks from quarries and transported them to the building site. 
              They used ramps, levers, and thousands of workers to move and stack the stones.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="bg-[#a33013]/10 p-6 rounded-xl text-center">
                <p className="text-[#a33013] mb-2">2.3 million</p>
                <p className="text-sm text-gray-600">Stone blocks used</p>
              </div>
              <div className="bg-[#e17624]/10 p-6 rounded-xl text-center">
                <p className="text-[#e17624] mb-2">20 years</p>
                <p className="text-sm text-gray-600">Time to build</p>
              </div>
              <div className="bg-[#2cc75c]/10 p-6 rounded-xl text-center">
                <p className="text-[#2cc75c] mb-2">100,000</p>
                <p className="text-sm text-gray-600">Workers involved</p>
              </div>
            </div>

            <h3>Why Were Pyramids Important?</h3>
            <p className="text-gray-700">
              The pyramids served as eternal resting places for pharaohs and their treasures. 
              Ancient Egyptians believed in an afterlife, and the pyramids were designed to help 
              the pharaoh's spirit journey to the next world. Inside the pyramids were burial chambers, 
              passages, and sometimes treasure rooms filled with items the pharaoh might need in the afterlife.
            </p>

            <div className="bg-[#2cc75c]/10 p-6 rounded-xl my-6">
              <h3 className="mb-3">Key Vocabulary</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Pharaoh:</strong> The ruler of ancient Egypt</li>
                <li><strong>Limestone:</strong> The type of stone used to build the pyramids</li>
                <li><strong>Sarcophagus:</strong> A stone coffin where the pharaoh was buried</li>
                <li><strong>Hieroglyphics:</strong> The ancient Egyptian writing system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz CTA */}
        <div className="bg-gradient-to-r from-[#a33013] to-[#e17624] rounded-2xl p-8 text-white text-center">
          <h2 className="text-white mb-4">Ready to Test Your Knowledge?</h2>
          <p className="text-white/90 mb-6 text-lg">
            Complete the quiz to earn coins and unlock the next lesson!
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => onNavigate('student-dashboard')}
              className="bg-white text-[#a33013] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Start Quiz
            </button>
            <button 
              onClick={() => onNavigate('curriculum')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-colors"
            >
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
