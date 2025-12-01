import { Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface TimeBlockPopupProps {
    isOpen: boolean;
}

export function TimeBlockPopup({ isOpen }: TimeBlockPopupProps) {
    const navigate = useNavigate();

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNavigateToParentDashboard = () => {
        navigate('/parent-dashboard');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#e17624]/10 flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-[#e17624]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#a33013] text-center">Screen Time Limit Reached</h2>
                    <p className="text-gray-600 text-center mt-2">
                        You've used your allotted time for today
                    </p>
                </div>

                {/* Info Message */}
                <div className="flex items-start gap-3 p-4 bg-[#fff5ef] border-2 border-[#e17624]/20 rounded-xl mb-6">
                    <AlertCircle className="w-5 h-5 text-[#e17624] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Your screen time for learning has ended. If you need more time, ask a parent to adjust your screen time settings in the Parent Dashboard.
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleNavigateToParentDashboard}
                    className="w-full py-4 px-4 rounded-xl font-semibold bg-[#2cc75c] text-black hover:bg-[#25b350] transition-colors shadow-md"
                >
                    Go to Parent Dashboard
                </button>

                {/* Footer Note */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        Parents can manage screen time limits and extend learning sessions from the Parent Dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
