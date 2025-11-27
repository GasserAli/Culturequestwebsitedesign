import { User, HelpCircle, Settings, LogOut, RefreshCw } from 'lucide-react';
import { useEffect, useRef, RefObject } from 'react';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    isStudentView?: boolean;
    onSwitchView?: () => void;
    onLogout?: () => void;
    onSettings?: () => void;
    onHelpCenter?: () => void;
    userName?: string;
    userEmail?: string;
    userAvatar?: string;
    triggerRef?: RefObject<HTMLButtonElement | null>;
}

export function ProfileModal({
    isOpen,
    onClose,
    isStudentView = false,
    onSwitchView,
    onLogout,
    onSettings,
    onHelpCenter,
    userName = 'Jayden Mango',
    userEmail = 'jaydenmango@gmail.com',
    userAvatar,
    triggerRef,
}: ProfileModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Check if click is outside modal AND outside trigger button
            const isOutsideModal = modalRef.current && !modalRef.current.contains(target);
            const isOutsideTrigger = triggerRef?.current && !triggerRef.current.contains(target);

            if (isOutsideModal && isOutsideTrigger) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
        >
            {/* Profile Section */}
            <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a33013] to-[#e17624] flex items-center justify-center flex-shrink-0">
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User className="w-5 h-5 text-white" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="py-2 border-b border-gray-200">
                <button
                    onClick={() => {
                        onHelpCenter?.();
                        onClose();
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Help Center</span>
                </button>

                <button
                    onClick={() => {
                        onSettings?.();
                        onClose();
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                >
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Settings</span>
                </button>

                {isStudentView && onSwitchView && (
                    <button
                        onClick={() => {
                            onSwitchView();
                            onClose();
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                        <RefreshCw className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Switch to Parent</span>
                    </button>
                )}
            </div>

            {/* Logout Section */}
            <div className="border-t border-gray-200 pt-1">
                <button
                    onClick={() => {
                        onLogout?.();
                        onClose();
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left"
                >
                    <LogOut className="w-5 h-5 text-red-600 " />
                    <span className="text-sm text-red-600 font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
