import { useState } from 'react';
import { X, ChevronRight, Check, User, GraduationCap, Globe } from 'lucide-react';

interface OnboardingProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Onboarding({ isOpen, onClose }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<'student' | 'parent' | null>(null);
    const [interests, setInterests] = useState<string[]>([]);

    if (!isOpen) return null;

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            onClose();
        }
    };

    const toggleInterest = (interest: string) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter(i => i !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Progress Bar */}
                <div className="h-2 bg-gray-100">
                    <div
                        className="h-full bg-[#e17624] transition-all duration-300 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-sm font-bold text-[#e17624] uppercase tracking-wider">Step {step} of {totalSteps}</span>
                            <h2 className="text-3xl font-bold text-[#a33013] mt-2">
                                {step === 1 && "Welcome to CultureQuest!"}
                                {step === 2 && "Who are you?"}
                                {step === 3 && "What interests you?"}
                                {step === 4 && "You're all set!"}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    <div className="min-h-[300px]">
                        {/* Step 1: Welcome */}
                        {step === 1 && (
                            <div className="text-center py-8">
                                <div className="w-32 h-32 bg-[#fff5ef] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Globe className="w-16 h-16 text-[#e17624]" />
                                </div>
                                <p className="text-xl text-gray-600 mb-8">
                                    Get ready to embark on an exciting journey through history, culture, and the world around us.
                                </p>
                            </div>
                        )}

                        {/* Step 2: Role Selection */}
                        {step === 2 && (
                            <div className="grid md:grid-cols-2 gap-6 py-4">
                                <button
                                    onClick={() => setRole('student')}
                                    className={`p-6 rounded-xl border-2 text-left transition-all ${role === 'student'
                                            ? 'border-[#e17624] bg-[#fff5ef]'
                                            : 'border-gray-200 hover:border-[#e17624]/50'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${role === 'student' ? 'bg-[#e17624] text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Student</h3>
                                    <p className="text-gray-600">I want to learn, play games, and earn rewards.</p>
                                </button>

                                <button
                                    onClick={() => setRole('parent')}
                                    className={`p-6 rounded-xl border-2 text-left transition-all ${role === 'parent'
                                            ? 'border-[#e17624] bg-[#fff5ef]'
                                            : 'border-gray-200 hover:border-[#e17624]/50'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${role === 'parent' ? 'bg-[#e17624] text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Parent</h3>
                                    <p className="text-gray-600">I want to track progress and manage accounts.</p>
                                </button>
                            </div>
                        )}

                        {/* Step 3: Interests */}
                        {step === 3 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                                {['History', 'Art', 'Music', 'Food', 'Language', 'Geography'].map((interest) => (
                                    <button
                                        key={interest}
                                        onClick={() => toggleInterest(interest)}
                                        className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${interests.includes(interest)
                                                ? 'border-[#2cc75c] bg-[#2cc75c]/10 text-[#2cc75c] font-bold'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                            }`}
                                    >
                                        {interest}
                                        {interests.includes(interest) && <Check className="w-5 h-5" />}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 4: Complete */}
                        {step === 4 && (
                            <div className="text-center py-8">
                                <div className="w-32 h-32 bg-[#2cc75c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-16 h-16 text-[#2cc75c]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">You're Ready to Go!</h3>
                                <p className="text-gray-600 mb-8">
                                    Your profile has been set up. Start exploring the wonders of the world today.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
                        <button
                            onClick={() => step > 1 && setStep(step - 1)}
                            className={`text-gray-500 font-bold hover:text-gray-700 transition-colors ${step === 1 ? 'invisible' : ''
                                }`}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={step === 2 && !role}
                            className="bg-[#e17624] text-white px-8 py-3 rounded-xl hover:bg-[#c96520] transition-colors font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {step === totalSteps ? 'Get Started' : 'Continue'}
                            {step !== totalSteps && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
