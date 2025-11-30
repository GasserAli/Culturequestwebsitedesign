import { X, User, Shield, Users, CreditCard, AlertTriangle, Download, Trash2, Clock, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TabType = 'general' | 'security' | 'childSettings' | 'billing';

interface ChildAccount {
    id: number;
    username: string;
    profilePicture: string;
    screenTime: number; // in minutes
    screenTimeLimit: number; // in minutes
}

interface ConfirmationPopupProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDangerous?: boolean;
}

function ConfirmationPopup({
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    isDangerous = true
}: ConfirmationPopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDangerous ? 'bg-red-100' : 'bg-yellow-100'}`}>
                        <AlertTriangle className={`w-6 h-6 ${isDangerous ? 'text-red-600' : 'text-yellow-600'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${isDangerous
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-[#e17624] text-white hover:bg-[#c96520]'
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>('general');
    const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
    const [showCloseChildAccountPopup, setShowCloseChildAccountPopup] = useState(false);
    const [selectedChildToClose, setSelectedChildToClose] = useState<number | null>(null);

    // User data (mock)
    const [firstName, setFirstName] = useState('Ahmed');
    const [lastName, setLastName] = useState('Hassan');
    const [email, setEmail] = useState('ahmed.hassan@example.com');
    const [subscriptionPlan, setSubscriptionPlan] = useState('Premium Family Plan');

    // Child accounts (mock)
    const [childAccounts, setChildAccounts] = useState<ChildAccount[]>([
        {
            id: 1,
            username: 'sarah_learner',
            profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            screenTime: 45,
            screenTimeLimit: 120
        },
        {
            id: 2,
            username: 'omar_explorer',
            profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            screenTime: 90,
            screenTimeLimit: 90
        }
    ]);

    // Security data
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Screen time extension
    const [screenTimeExtensions, setScreenTimeExtensions] = useState<{ [key: number]: number }>({});

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Reset to general tab when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab('general');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDeleteAccount = () => {
        console.log('Account deleted');
        setShowDeleteAccountPopup(false);
        onClose();
    };

    const handleCloseChildAccount = () => {
        if (selectedChildToClose !== null) {
            setChildAccounts(childAccounts.filter(child => child.id !== selectedChildToClose));
            setShowCloseChildAccountPopup(false);
            setSelectedChildToClose(null);
        }
    };

    const handleDownloadData = () => {
        console.log('Downloading user data...');
        // Simulate download
        alert('Your data download has started!');
    };

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Password updated');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Password updated successfully!');
    };

    const handleExtendScreenTime = (childId: number) => {
        const extension = screenTimeExtensions[childId] || 30;
        setChildAccounts(childAccounts.map(child =>
            child.id === childId
                ? { ...child, screenTimeLimit: child.screenTimeLimit + extension }
                : child
        ));
        setScreenTimeExtensions({ ...screenTimeExtensions, [childId]: 30 });
    };

    const tabs = [
        { id: 'general' as TabType, label: 'General', icon: User },
        { id: 'security' as TabType, label: 'Security', icon: Shield },
        { id: 'childSettings' as TabType, label: 'Child Settings', icon: Users },
        { id: 'billing' as TabType, label: 'Billing', icon: CreditCard }
    ];

    return (
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                onClick={handleBackdropClick}
            >
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-[#a33013]">Settings</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar Tabs */}
                        <div className="w-48 bg-gray-50 border-r border-gray-200 p-4">
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                                    ? 'bg-[#e17624] text-white shadow-lg'
                                                    : 'text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-sm">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* General Tab */}
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
                                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17624]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17624]"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17624]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Subscription Plan
                                                </label>
                                                <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700">
                                                    {subscriptionPlan}
                                                </div>
                                            </div>
                                            <button className="w-full bg-[#2cc75c] text-black py-3 rounded-xl font-medium hover:bg-[#25b350] transition-colors">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>

                                    {/* Connected Children */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Connected Children Accounts</h3>
                                        <div className="space-y-3">
                                            {childAccounts.map((child) => (
                                                <div key={child.id} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                                                    <ImageWithFallback
                                                        src={child.profilePicture}
                                                        alt={child.username}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900">{child.username}</p>
                                                        <span className="inline-block text-xs bg-[#e17624] text-white px-2 py-1 rounded-full">
                                                            Child
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Update Password</h3>
                                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17624]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17624]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17624]"
                                                />
                                            </div>
                                            <button
                                                onClick={handleUpdatePassword}
                                                className="w-full bg-[#2cc75c] text-black py-3 rounded-xl font-medium hover:bg-[#25b350] transition-colors"
                                            >
                                                Update Password
                                            </button>
                                        </div>
                                    </div>

                                    {/* Data Management */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Data Management</h3>
                                        <div className="space-y-3">
                                            <button
                                                onClick={handleDownloadData}
                                                className="w-full bg-[#e17624] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#c96520] transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-5 h-5" />
                                                Download My Data
                                            </button>
                                        </div>
                                    </div>

                                    {/* Danger Zone */}
                                    <div>
                                        <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                            <p className="text-sm text-gray-700 mb-4">
                                                Deleting your account will permanently remove all your data and connected child accounts. This action cannot be undone.
                                            </p>
                                            <button
                                                onClick={() => setShowDeleteAccountPopup(true)}
                                                className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Child Settings Tab */}
                            {activeTab === 'childSettings' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900">Child Account Management</h3>
                                    {childAccounts.map((child) => (
                                        <div key={child.id} className="bg-gray-50 rounded-xl p-6 space-y-4">
                                            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                                                <ImageWithFallback
                                                    src={child.profilePicture}
                                                    alt={child.username}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-bold text-gray-900 text-lg">{child.username}</p>
                                                    <span className="inline-block text-xs bg-[#e17624] text-white px-2 py-1 rounded-full">
                                                        Child
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setSelectedChildToClose(child.id);
                                                        setShowCloseChildAccountPopup(true);
                                                    }}
                                                    className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                                                >
                                                    Close Account
                                                </button>
                                            </div>

                                            {/* Screen Time Management */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Clock className="w-5 h-5 text-[#e17624]" />
                                                    <h4 className="font-bold text-gray-900">Screen Time Limit</h4>
                                                </div>
                                                <div className="bg-white rounded-lg p-4 mb-3">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm text-gray-600">Current Usage</span>
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {child.screenTime} / {child.screenTimeLimit} minutes
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                                        <div
                                                            className={`h-3 rounded-full transition-all ${child.screenTime >= child.screenTimeLimit
                                                                    ? 'bg-red-500'
                                                                    : child.screenTime >= child.screenTimeLimit * 0.8
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-[#2cc75c]'
                                                                }`}
                                                            style={{ width: `${Math.min((child.screenTime / child.screenTimeLimit) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <input
                                                        type="number"
                                                        value={screenTimeExtensions[child.id] || 30}
                                                        onChange={(e) => setScreenTimeExtensions({
                                                            ...screenTimeExtensions,
                                                            [child.id]: parseInt(e.target.value) || 30
                                                        })}
                                                        className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17624]"
                                                        min="1"
                                                    />
                                                    <button
                                                        onClick={() => handleExtendScreenTime(child.id)}
                                                        className="flex-1 bg-[#e17624] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#c96520] transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        Extend Screen Time
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Billing Tab */}
                            {activeTab === 'billing' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Current Subscription</h3>
                                        <div className="bg-gradient-to-r from-[#a33013] to-[#e17624] rounded-xl p-6 text-white">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <p className="text-sm opacity-90">Current Plan</p>
                                                    <h4 className="text-2xl font-bold">{subscriptionPlan}</h4>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm opacity-90">Monthly</p>
                                                    <h4 className="text-2xl font-bold">$29.99</h4>
                                                </div>
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                    <span className="text-sm">Up to 5 child accounts</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                    <span className="text-sm">Unlimited lessons and quizzes</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                    <span className="text-sm">Advanced progress tracking</span>
                                                </div>
                                            </div>
                                            <button className="w-full bg-white text-[#a33013] py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                                                Manage Subscription
                                            </button>
                                        </div>
                                    </div>

                                    {/* Billing Information */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Billing Information</h3>
                                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                                <span className="text-gray-600">Payment Method</span>
                                                <span className="font-medium text-gray-900">•••• •••• •••• 4242</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                                <span className="text-gray-600">Next Billing Date</span>
                                                <span className="font-medium text-gray-900">December 30, 2025</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Billing Email</span>
                                                <span className="font-medium text-gray-900">{email}</span>
                                            </div>
                                            <button className="w-full bg-[#e17624] text-white py-3 rounded-xl font-medium hover:bg-[#c96520] transition-colors">
                                                Update Payment Method
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Popups */}
            <ConfirmationPopup
                isOpen={showDeleteAccountPopup}
                title="Delete Account"
                message="Are you sure you want to delete your account? This will permanently remove all your data and all connected child accounts. This action cannot be undone."
                confirmText="Delete Account"
                cancelText="Cancel"
                onConfirm={handleDeleteAccount}
                onCancel={() => setShowDeleteAccountPopup(false)}
                isDangerous={true}
            />

            <ConfirmationPopup
                isOpen={showCloseChildAccountPopup}
                title="Close Child Account"
                message="Are you sure you want to close this child account? All progress and data for this account will be permanently deleted. This action cannot be undone."
                confirmText="Close Account"
                cancelText="Cancel"
                onConfirm={handleCloseChildAccount}
                onCancel={() => {
                    setShowCloseChildAccountPopup(false);
                    setSelectedChildToClose(null);
                }}
                isDangerous={true}
            />
        </>
    );
}
