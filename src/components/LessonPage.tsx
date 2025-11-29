import { BookOpen, Clock, Star, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { QuizModal } from './QuizModal';

export function LessonPage() {
  const navigate = useNavigate();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/curriculum')}
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
          <div className="relative w-full" style={{ paddingBottom: '42.15%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/vJucA4FOTSI"
              title="How Were the Pyramids Actually Built?"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
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
              onClick={() => setIsQuizOpen(true)}
              className="bg-white text-[#a33013] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Quiz
            </button>
            <button
              onClick={() => navigate('/curriculum')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-colors font-semibold"
            >
              Save for Later
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
