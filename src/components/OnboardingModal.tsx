import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type OnboardingStage = 'parent-info' | 'child-info' | 'interests' | 'avatar';

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
    const [currentStage, setCurrentStage] = useState<OnboardingStage>('parent-info');
    const [isLoginMode, setIsLoginMode] = useState(false);

    // Login fields
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // Parent information
    const [parentFirstName, setParentFirstName] = useState('');
    const [parentLastName, setParentLastName] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [parentPassword, setParentPassword] = useState('');
    const [parentConfirmPassword, setParentConfirmPassword] = useState('');
    const [showParentPassword, setShowParentPassword] = useState(false);
    const [showParentConfirmPassword, setShowParentConfirmPassword] = useState(false);

    // Child information
    const [childFirstName, setChildFirstName] = useState('');
    const [childLastName, setChildLastName] = useState('');
    const [childPassword, setChildPassword] = useState('');
    const [childConfirmPassword, setChildConfirmPassword] = useState('');
    const [showChildPassword, setShowChildPassword] = useState(false);
    const [showChildConfirmPassword, setShowChildConfirmPassword] = useState(false);

    // Interests
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const interests = [
        'History',
        'Art & Architecture',
        'Language',
        'Daily Life',
        'Religion',
        'Geography',
        'Music',
        'Food & Cuisine',
        'Mythology'
    ];

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setCurrentStage('parent-info');
            setIsLoginMode(false);
            // Reset parent info
            setParentFirstName('');
            setParentLastName('');
            setParentEmail('');
            setParentPassword('');
            setParentConfirmPassword('');
            setShowParentPassword(false);
            setShowParentConfirmPassword(false);
            // Reset child info
            setChildFirstName('');
            setChildLastName('');
            setChildPassword('');
            setChildConfirmPassword('');
            setShowChildPassword(false);
            setShowChildConfirmPassword(false);
            // Reset interests
            setSelectedInterests([]);
            // Reset login fields
            setLoginEmail('');
            setLoginPassword('');
            setShowLoginPassword(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const stages: OnboardingStage[] = ['parent-info', 'child-info', 'interests', 'avatar'];
    const currentStageIndex = stages.indexOf(currentStage);

    const handleContinue = () => {
        if (currentStageIndex < stages.length - 1) {
            setCurrentStage(stages[currentStageIndex + 1]);
        } else {
            // Final submission
            console.log('Onboarding complete:', {
                parent: { parentFirstName, parentLastName, parentEmail, parentPassword },
                child: { childFirstName, childLastName, childPassword },
                interests: selectedInterests
            });
            onClose();
        }
    };

    const handleCancel = () => {
        if (currentStageIndex > 0) {
            setCurrentStage(stages[currentStageIndex - 1]);
        } else {
            onClose();
        }
    };

    const openSocialMedia = (platform: 'google' | 'facebook' | 'instagram') => {
        const urls = {
            google: 'https://www.google.com',
            facebook: 'https://www.facebook.com',
            instagram: 'https://www.instagram.com',
        };
        window.open(urls[platform], '_blank');
    };

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const getStageName = (stage: OnboardingStage): string => {
        switch (stage) {
            case 'parent-info':
                return 'Parent Information';
            case 'child-info':
                return 'Child Information';
            case 'interests':
                return 'Choose Interests';
            case 'avatar':
                return 'Customize Avatar';
            default:
                return '';
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-scaleIn max-h-[90vh] overflow-y-auto">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-[#a33013]">
                        {isLoginMode ? 'Welcome Back!' : getStageName(currentStage)}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>


                {/* Progress Bar - Only show in signup mode */}
                {!isLoginMode && (
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-center mb-8">
                            {stages.map((stage, index) => (
                                <div key={stage} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${index <= currentStageIndex
                                                ? 'bg-[#e17624] text-white shadow-lg'
                                                : 'bg-gray-200 text-gray-500'
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <span className="text-xs mt-2 text-center text-gray-600 hidden sm:block">
                                            {getStageName(stage).split(' ')[0]}
                                        </span>
                                    </div>
                                    {index < stages.length - 1 && (
                                        <div
                                            className={`w-16 h-1 mx-2 transition-all ${index < currentStageIndex
                                                ? 'bg-[#e17624]'
                                                : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal Content */}
                <div className="p-6">
                    {/* Login Form */}
                    {isLoginMode ? (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="loginEmail"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showLoginPassword ? 'text' : 'password'}
                                        id="loginPassword"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all pr-24"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        onMouseDown={() => setShowLoginPassword(true)}
                                        onMouseUp={() => setShowLoginPassword(false)}
                                        onMouseLeave={() => setShowLoginPassword(false)}
                                        onTouchStart={() => setShowLoginPassword(true)}
                                        onTouchEnd={() => setShowLoginPassword(false)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-[#e17624] hover:bg-[#fff5ef] rounded-lg transition-colors"
                                        type="button"
                                    >
                                        {showLoginPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            {/* Don't have an account */}
                            <div className="text-center pt-2">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setIsLoginMode(false)}
                                        className="text-[#e17624] hover:text-[#a33013] font-medium hover:underline transition-colors"
                                    >
                                        Sign up here
                                    </button>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        console.log('Login:', { loginEmail, loginPassword });
                                        // Switch back to signup mode and proceed to next step
                                        setIsLoginMode(false);
                                        setCurrentStage('child-info');
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl font-medium bg-[#2cc75c] text-black hover:bg-[#25b350] transition-colors shadow-lg"
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Stage 1: Parent Information */}
                            {currentStage === 'parent-info' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="parentFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="parentFirstName"
                                                value={parentFirstName}
                                                onChange={(e) => setParentFirstName(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="parentLastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="parentLastName"
                                                value={parentLastName}
                                                onChange={(e) => setParentLastName(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="parentEmail"
                                            value={parentEmail}
                                            onChange={(e) => setParentEmail(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="parentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showParentPassword ? 'text' : 'password'}
                                                id="parentPassword"
                                                value={parentPassword}
                                                onChange={(e) => setParentPassword(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all pr-24"
                                                placeholder="Enter password"
                                            />
                                            <button
                                                onMouseDown={() => setShowParentPassword(true)}
                                                onMouseUp={() => setShowParentPassword(false)}
                                                onMouseLeave={() => setShowParentPassword(false)}
                                                onTouchStart={() => setShowParentPassword(true)}
                                                onTouchEnd={() => setShowParentPassword(false)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-[#e17624] hover:bg-[#fff5ef] rounded-lg transition-colors"
                                                type="button"
                                            >
                                                {showParentPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="parentConfirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showParentConfirmPassword ? 'text' : 'password'}
                                                id="parentConfirmPassword"
                                                value={parentConfirmPassword}
                                                onChange={(e) => setParentConfirmPassword(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all pr-24"
                                                placeholder="Confirm password"
                                            />
                                            <button
                                                onMouseDown={() => setShowParentConfirmPassword(true)}
                                                onMouseUp={() => setShowParentConfirmPassword(false)}
                                                onMouseLeave={() => setShowParentConfirmPassword(false)}
                                                onTouchStart={() => setShowParentConfirmPassword(true)}
                                                onTouchEnd={() => setShowParentConfirmPassword(false)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-[#e17624] hover:bg-[#fff5ef] rounded-lg transition-colors"
                                                type="button"
                                            >
                                                {showParentConfirmPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Already a member */}
                                    <div className="text-center pt-2">
                                        <p className="text-sm text-gray-600">
                                            Already a member?{' '}
                                            <button
                                                onClick={() => setIsLoginMode(true)}
                                                className="text-[#e17624] hover:text-[#a33013] font-medium hover:underline transition-colors"
                                            >
                                                Log in here
                                            </button>
                                        </p>
                                    </div>

                                    {/* Social Media Options */}
                                    <div className="pt-4">
                                        <div className="relative mb-4">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 justify-center">
                                            <button
                                                onClick={() => openSocialMedia('google')}
                                                className="p-3 border-2 border-gray-300 rounded-xl hover:border-[#e17624] hover:bg-[#fff5ef] transition-all group"
                                                aria-label="Continue with Google"
                                            >
                                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                    <path
                                                        fill="#4285F4"
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    />
                                                    <path
                                                        fill="#34A853"
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    />
                                                    <path
                                                        fill="#FBBC05"
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    />
                                                    <path
                                                        fill="#EA4335"
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => openSocialMedia('facebook')}
                                                className="p-3 border-2 border-gray-300 rounded-xl hover:border-[#e17624] hover:bg-[#fff5ef] transition-all group"
                                                aria-label="Continue with Facebook"
                                            >
                                                <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => openSocialMedia('instagram')}
                                                className="p-3 border-2 border-gray-300 rounded-xl hover:border-[#e17624] hover:bg-[#fff5ef] transition-all group"
                                                aria-label="Continue with Instagram"
                                            >
                                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                    <defs>
                                                        <linearGradient id="instagram-gradient-onboarding" x1="0%" y1="100%" x2="100%" y2="0%">
                                                            <stop offset="0%" style={{ stopColor: '#FD5949', stopOpacity: 1 }} />
                                                            <stop offset="50%" style={{ stopColor: '#D6249F', stopOpacity: 1 }} />
                                                            <stop offset="100%" style={{ stopColor: '#285AEB', stopOpacity: 1 }} />
                                                        </linearGradient>
                                                    </defs>
                                                    <path
                                                        fill="url(#instagram-gradient-onboarding)"
                                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Stage 2: Child Information */}
                            {currentStage === 'child-info' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="childFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="childFirstName"
                                                value={childFirstName}
                                                onChange={(e) => setChildFirstName(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="childLastName"
                                                value={childLastName}
                                                onChange={(e) => setChildLastName(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="childPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showChildPassword ? 'text' : 'password'}
                                                id="childPassword"
                                                value={childPassword}
                                                onChange={(e) => setChildPassword(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all pr-24"
                                                placeholder="Enter password"
                                            />
                                            <button
                                                onMouseDown={() => setShowChildPassword(true)}
                                                onMouseUp={() => setShowChildPassword(false)}
                                                onMouseLeave={() => setShowChildPassword(false)}
                                                onTouchStart={() => setShowChildPassword(true)}
                                                onTouchEnd={() => setShowChildPassword(false)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-[#e17624] hover:bg-[#fff5ef] rounded-lg transition-colors"
                                                type="button"
                                            >
                                                {showChildPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="childConfirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showChildConfirmPassword ? 'text' : 'password'}
                                                id="childConfirmPassword"
                                                value={childConfirmPassword}
                                                onChange={(e) => setChildConfirmPassword(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all pr-24"
                                                placeholder="Confirm password"
                                            />
                                            <button
                                                onMouseDown={() => setShowChildConfirmPassword(true)}
                                                onMouseUp={() => setShowChildConfirmPassword(false)}
                                                onMouseLeave={() => setShowChildConfirmPassword(false)}
                                                onTouchStart={() => setShowChildConfirmPassword(true)}
                                                onTouchEnd={() => setShowChildConfirmPassword(false)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-[#e17624] hover:bg-[#fff5ef] rounded-lg transition-colors"
                                                type="button"
                                            >
                                                {showChildConfirmPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Stage 3: Choose Interests */}
                            {currentStage === 'interests' && (
                                <div className="space-y-4">
                                    <p className="text-gray-600 text-center mb-6">
                                        Select the topics your child is interested in learning about
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {interests.map((interest) => (
                                            <button
                                                key={interest}
                                                onClick={() => toggleInterest(interest)}
                                                className={`py-3 px-4 rounded-xl font-medium transition-all ${selectedInterests.includes(interest)
                                                    ? 'bg-[#e17624] text-white shadow-lg scale-105'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                    {selectedInterests.length > 0 && (
                                        <p className="text-sm text-center text-gray-600 mt-4">
                                            {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Stage 4: Customize Avatar */}
                            {currentStage === 'avatar' && (
                                <div className="space-y-4">
                                    <div className="text-center py-12">
                                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#e17624] to-[#a33013] rounded-full flex items-center justify-center mb-6">
                                            <span className="text-6xl">👤</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            Avatar Customization
                                        </h3>
                                        <p className="text-gray-600">
                                            This section will be implemented soon!
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    {currentStageIndex === 0 ? 'Cancel' : 'Back'}
                                </button>
                                <button
                                    onClick={handleContinue}
                                    className="flex-1 py-3 px-4 rounded-xl font-medium bg-[#2cc75c] text-black hover:bg-[#25b350] transition-colors shadow-lg"
                                >
                                    {currentStageIndex === stages.length - 1 ? 'Complete' : 'Continue'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
