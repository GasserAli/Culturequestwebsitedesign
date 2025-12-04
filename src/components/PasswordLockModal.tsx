import { X, Lock, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PasswordLockModalProps {
    isOpen: boolean;
    onSuccess: () => void;
}

export function PasswordLockModal({ isOpen, onSuccess }: PasswordLockModalProps) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);

    // The correct password (in a real app, this would be validated on the backend)
    const CORRECT_PASSWORD = 'parent123';
    const MAX_ATTEMPTS = 3;

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setPassword('');
            setError('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!password) {
            setError('Please enter a password');
            return;
        }

        if (password === CORRECT_PASSWORD) {
            setError('');
            setAttempts(0);
            onSuccess();
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= MAX_ATTEMPTS) {
                setError(`Maximum attempts reached. Access denied. (Hint: Try "${CORRECT_PASSWORD}")`);
                setPassword('');
            } else {
                setError(`Incorrect password. ${MAX_ATTEMPTS - newAttempts} attempt(s) remaining.`);
                setPassword('');
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e as any);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#e17624]/10 flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-[#e17624]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#a33013] text-center">Parent Dashboard Access</h2>
                    <p className="text-gray-600 text-center mt-2">
                        Please enter your password to continue
                    </p>
                </div>

                {/* Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                onKeyPress={handleKeyPress}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all pr-24 ${error
                                        ? 'border-red-300 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-[#e17624]'
                                    }`}
                                placeholder="Enter password"
                                autoFocus
                                disabled={attempts >= MAX_ATTEMPTS}
                            />
                            <button
                                type="button"
                                onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)}
                                onMouseLeave={() => setShowPassword(false)}
                                onTouchStart={() => setShowPassword(true)}
                                onTouchEnd={() => setShowPassword(false)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-[#e17624] hover:bg-[#fff5ef] rounded-lg transition-colors"
                                disabled={attempts >= MAX_ATTEMPTS}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Hint */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-700">
                            <strong>Development Hint:</strong> The password is "{CORRECT_PASSWORD}"
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${attempts >= MAX_ATTEMPTS
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-[#2cc75c] text-black hover:bg-[#25b350]'
                            }`}
                        disabled={attempts >= MAX_ATTEMPTS}
                    >
                        {attempts >= MAX_ATTEMPTS ? 'Access Denied' : 'Unlock Dashboard'}
                    </button>

                    {/* Reset Button (only shown after max attempts) */}
                    {attempts >= MAX_ATTEMPTS && (
                        <button
                            type="button"
                            onClick={() => {
                                setAttempts(0);
                                setError('');
                                setPassword('');
                            }}
                            className="w-full py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            Try Again
                        </button>
                    )}
                </form>

                {/* Footer Note */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        This password protects access to parent controls and child account management.
                    </p>
                </div>
            </div>
        </div>
    );
}
