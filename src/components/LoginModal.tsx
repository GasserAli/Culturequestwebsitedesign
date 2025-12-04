import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenSignup: () => void;
}

type AccountType = 'child' | 'parent';

export function LoginModal({ isOpen, onClose, onOpenSignup }: LoginModalProps) {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState<AccountType>('child');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
            setEmail('');
            setUsername('');
            setPassword('');
            setShowPassword(false);
        }
    }, [isOpen]);

    // Reset email/username when switching account types
    useEffect(() => {
        setEmail('');
        setUsername('');
    }, [accountType]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleLogin = () => {
        // Placeholder for login logic
        console.log('Login attempt:', { accountType, email, username, password });

        // Navigate to appropriate dashboard based on account type
        if (accountType === 'parent') {
            navigate('/parent-dashboard');
        } else {
            navigate('/student-dashboard');
        }

        onClose();
    };

    const handleCreateAccount = () => {
        // Close login modal and open signup modal
        onClose();
        onOpenSignup();
    };

    const openSocialMedia = (platform: 'google' | 'facebook' | 'instagram') => {
        const urls = {
            google: 'https://www.google.com',
            facebook: 'https://www.facebook.com',
            instagram: 'https://www.instagram.com',
        };
        window.open(urls[platform], '_blank');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scaleIn">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#a33013]">Welcome Back!</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {/* Account Type Selector */}
                    <div className="mb-6">
                        <label className="block text-center text-lg font-medium text-gray-700 mb-3">
                            Account Type
                        </label>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setAccountType('child')}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${accountType === 'child'
                                    ? 'bg-[#e17624] text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Learner
                            </button>
                            <button
                                onClick={() => setAccountType('parent')}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${accountType === 'parent'
                                    ? 'bg-[#e17624] text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Parent
                            </button>

                        </div>
                    </div>

                    {/* Conditional Form Fields */}
                    <div className="space-y-4 mb-6">
                        {accountType === 'parent' ? (
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all"
                                    placeholder="Enter your username"
                                />
                            </div>
                        )}

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e17624] focus:border-transparent transition-all pr-24"
                                    placeholder="Enter your password"
                                />
                                <button
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                    onMouseLeave={() => setShowPassword(false)}
                                    onTouchStart={() => setShowPassword(true)}
                                    onTouchEnd={() => setShowPassword(false)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-[#e17624] hover:bg-[#fff5ef] rounded-lg transition-colors"
                                    type="button"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Login (Parent Only) */}
                    {accountType === 'parent' && (
                        <div className="mb-6">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center mb-4">
                                <button
                                    onClick={() => openSocialMedia('google')}
                                    className="p-3 border-2 border-gray-300 rounded-xl hover:border-[#e17624] hover:bg-[#fff5ef] transition-all group"
                                    aria-label="Login with Google"
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
                                    aria-label="Login with Facebook"
                                >
                                    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => openSocialMedia('instagram')}
                                    className="p-3 border-2 border-gray-300 rounded-xl hover:border-[#e17624] hover:bg-[#fff5ef] transition-all group"
                                    aria-label="Login with Instagram"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <defs>
                                            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: '#FD5949', stopOpacity: 1 }} />
                                                <stop offset="50%" style={{ stopColor: '#D6249F', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#285AEB', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            fill="url(#instagram-gradient)"
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Create Account Button */}
                            <div className="text-center">
                                <button
                                    onClick={handleCreateAccount}
                                    className="text-sm text-[#e17624] hover:text-[#a33013] font-medium hover:underline transition-colors"
                                >
                                    Create account now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-red-600 hover:bg-red-100 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleLogin}
                            className="flex-1 py-3 px-4 rounded-xl font-medium bg-[#2cc75c] text-black hover:bg-[#25b350] transition-colors shadow-lg"
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
