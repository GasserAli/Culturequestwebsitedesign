import { X, Search, MessageCircle, FileQuestion, Book } from 'lucide-react';
import { useState } from 'react';

interface HelpCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HelpCenter({ isOpen, onClose }: HelpCenterProps) {
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "Go to the login page and click 'Forgot Password'. Follow the instructions sent to your email."
        },
        {
            question: "Can I change my subscription plan?",
            answer: "Yes, you can upgrade or downgrade your plan at any time from the Parent Dashboard settings."
        },
        {
            question: "Is the content suitable for all ages?",
            answer: "Our content is primarily designed for children aged 6-12, but can be enjoyed by learners of all ages."
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-[#a33013]">Help Center</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#e17624] focus:ring-2 focus:ring-[#e17624]/20 outline-none transition-all"
                        />
                    </div>

                    {/* Quick Links */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <button className="p-4 rounded-xl border border-gray-200 hover:border-[#e17624] hover:bg-[#fff5ef] transition-all text-left group">
                            <div className="w-10 h-10 rounded-full bg-[#e17624]/10 flex items-center justify-center mb-3 group-hover:bg-[#e17624]">
                                <Book className="w-5 h-5 text-[#e17624] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Guides</h3>
                            <p className="text-sm text-gray-500">Learn how to use the platform</p>
                        </button>
                        <button className="p-4 rounded-xl border border-gray-200 hover:border-[#e17624] hover:bg-[#fff5ef] transition-all text-left group">
                            <div className="w-10 h-10 rounded-full bg-[#2cc75c]/10 flex items-center justify-center mb-3 group-hover:bg-[#2cc75c]">
                                <FileQuestion className="w-5 h-5 text-[#2cc75c] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">FAQ</h3>
                            <p className="text-sm text-gray-500">Common questions answered</p>
                        </button>
                        <button className="p-4 rounded-xl border border-gray-200 hover:border-[#e17624] hover:bg-[#fff5ef] transition-all text-left group">
                            <div className="w-10 h-10 rounded-full bg-[#a33013]/10 flex items-center justify-center mb-3 group-hover:bg-[#a33013]">
                                <MessageCircle className="w-5 h-5 text-[#a33013] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Support</h3>
                            <p className="text-sm text-gray-500">Contact our support team</p>
                        </button>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Support */}
                    <div className="bg-[#fff5ef] rounded-xl p-6 text-center">
                        <h3 className="text-lg font-bold text-[#a33013] mb-2">Still need help?</h3>
                        <p className="text-gray-600 mb-4">Our support team is available 24/7 to assist you.</p>
                        <button className="bg-[#e17624] text-white px-6 py-3 rounded-xl hover:bg-[#c96520] transition-colors font-bold">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
