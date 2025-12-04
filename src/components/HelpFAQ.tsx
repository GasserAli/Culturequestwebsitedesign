import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Mail, MessageCircle, Book } from 'lucide-react';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    // Getting Started
    {
        id: 'gs1',
        question: 'How do I create an account for my child?',
        answer: 'Click on "Start Free Trial" on the homepage, select the account type (Child or Parent), and follow the onboarding steps. You\'ll need to provide basic information and create a secure password.',
        category: 'Getting Started'
    },
    {
        id: 'gs2',
        question: 'What age group is CultureQuest designed for?',
        answer: 'CultureQuest is designed for children aged 7-12 years old. Our curriculum is tailored to be engaging and educational for this age range, with content that grows with your child.',
        category: 'Getting Started'
    },
    {
        id: 'gs3',
        question: 'How does the free trial work?',
        answer: 'You get 7 days of full access to all features and content. No credit card required upfront. You can cancel anytime during the trial period without being charged.',
        category: 'Getting Started'
    },
    {
        id: 'gs4',
        question: 'Can I use CultureQuest on multiple devices?',
        answer: 'Yes! Your account works across all devices - desktop, tablet, and mobile. Your child\'s progress syncs automatically across all devices.',
        category: 'Getting Started'
    },

    // Account & Billing
    {
        id: 'ab1',
        question: 'How do I change my subscription plan?',
        answer: 'Go to Settings from the profile menu, select "Subscription", and choose your new plan. Changes take effect immediately, and we\'ll prorate any differences.',
        category: 'Account & Billing'
    },
    {
        id: 'ab2',
        question: 'Can I cancel my subscription anytime?',
        answer: 'Absolutely! You can cancel your subscription at any time from the Settings menu. You\'ll continue to have access until the end of your current billing period.',
        category: 'Account & Billing'
    },
    {
        id: 'ab3',
        question: 'Do you offer family plans?',
        answer: 'Yes! Our Scholar plan includes access for up to 3 children. Each child gets their own personalized learning journey and progress tracking.',
        category: 'Account & Billing'
    },
    {
        id: 'ab4',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay for your convenience.',
        category: 'Account & Billing'
    },

    // Learning & Curriculum
    {
        id: 'lc1',
        question: 'What topics are covered in the Egyptian culture curriculum?',
        answer: 'Our comprehensive curriculum covers six main areas: Ancient Egyptian History, Art & Hieroglyphics, Language & Writing, Daily Life & Society, Religion & Mythology, and Architecture & Engineering. Each area includes interactive lessons, quizzes, and activities.',
        category: 'Learning & Curriculum'
    },
    {
        id: 'lc2',
        question: 'How long does it take to complete the full curriculum?',
        answer: 'On average, children complete the full curriculum in 3-6 months with regular practice (3-4 sessions per week). However, they can learn at their own pace - there\'s no rush!',
        category: 'Learning & Curriculum'
    },
    {
        id: 'lc3',
        question: 'Are the lessons aligned with educational standards?',
        answer: 'Yes! Our curriculum is developed by Egyptologists and educators, aligned with Common Core and state educational standards for social studies and history.',
        category: 'Learning & Curriculum'
    },
    {
        id: 'lc4',
        question: 'Can my child earn certificates?',
        answer: 'Yes! Children earn a Certificate of Completion for each major unit they finish. Adventurer and Scholar plan members also receive a special overall completion certificate.',
        category: 'Learning & Curriculum'
    },
    {
        id: 'lc5',
        question: 'How does the gamification work?',
        answer: 'Children earn coins for completing lessons and quests, unlock achievements for milestones, collect virtual Egyptian artifacts, and can customize their avatar with items from the marketplace. This makes learning fun and motivating!',
        category: 'Learning & Curriculum'
    },

    // Technical Support
    {
        id: 'ts1',
        question: 'The app is running slowly. What should I do?',
        answer: 'Try clearing your browser cache, ensuring you have a stable internet connection, and closing other browser tabs. If issues persist, try using a different browser or contact our support team.',
        category: 'Technical Support'
    },
    {
        id: 'ts2',
        question: 'I forgot my password. How do I reset it?',
        answer: 'Click "Forgot Password" on the login screen, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
        category: 'Technical Support'
    },
    {
        id: 'ts3',
        question: 'My child\'s progress isn\'t saving. What\'s wrong?',
        answer: 'Make sure you\'re connected to the internet and logged in. Progress saves automatically after each activity. If the issue continues, try logging out and back in, or contact support.',
        category: 'Technical Support'
    },
    {
        id: 'ts4',
        question: 'Which browsers are supported?',
        answer: 'CultureQuest works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.',
        category: 'Technical Support'
    },

    // Parent Dashboard
    {
        id: 'pd1',
        question: 'How do I access the Parent Dashboard?',
        answer: 'Click on your profile icon in the navigation bar, select "Switch to Parent" if you\'re in student view, then navigate to the Parent Dashboard. You\'ll need to enter your password for security.',
        category: 'Parent Dashboard'
    },
    {
        id: 'pd2',
        question: 'What information can I see in the Parent Dashboard?',
        answer: 'You can view your child\'s learning progress, time spent on lessons, quiz scores, achievements earned, areas of strength and improvement, and detailed analytics on their learning journey.',
        category: 'Parent Dashboard'
    },
    {
        id: 'pd3',
        question: 'Can I set learning goals for my child?',
        answer: 'Yes! The Parent Dashboard allows you to set daily or weekly learning goals, and you\'ll receive notifications when your child reaches milestones.',
        category: 'Parent Dashboard'
    },
    {
        id: 'pd4',
        question: 'How do I monitor multiple children?',
        answer: 'If you have a family plan, you can switch between child profiles in the Parent Dashboard to view each child\'s individual progress and analytics.',
        category: 'Parent Dashboard'
    }
];

// Simple fuzzy search function
function fuzzyMatch(text: string, query: string): boolean {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();

    // Exact match or substring match
    if (textLower.includes(queryLower)) return true;

    // Fuzzy match: check if all characters in query appear in order in text
    let queryIndex = 0;
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
        if (textLower[i] === queryLower[queryIndex]) {
            queryIndex++;
        }
    }
    return queryIndex === queryLower.length;
}

export function HelpFAQ() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    // Filter FAQs based on search query
    const filteredFAQs = useMemo(() => {
        if (!searchQuery.trim()) return faqData;

        return faqData.filter(faq =>
            fuzzyMatch(faq.question, searchQuery) ||
            fuzzyMatch(faq.answer, searchQuery) ||
            fuzzyMatch(faq.category, searchQuery)
        );
    }, [searchQuery]);

    // Group FAQs by category
    const categorizedFAQs = useMemo(() => {
        const categories: { [key: string]: FAQItem[] } = {};
        filteredFAQs.forEach(faq => {
            if (!categories[faq.category]) {
                categories[faq.category] = [];
            }
            categories[faq.category].push(faq);
        });
        return categories;
    }, [filteredFAQs]);

    const toggleItem = (id: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const categoryIcons: { [key: string]: any } = {
        'Getting Started': Book,
        'Account & Billing': MessageCircle,
        'Learning & Curriculum': Book,
        'Technical Support': HelpCircle,
        'Parent Dashboard': MessageCircle
    };

    return (
        <div className="min-h-screen bg-[#fff5ef] py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a33013] to-[#e17624] rounded-full mb-4">
                        <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-[#a33013] mb-4">Help & FAQ</h1>
                    <p className="text-xl text-gray-600">Find answers to common questions about CultureQuest</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help... (e.g., 'password', 'subscription', 'progress')"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#e17624] focus:outline-none text-gray-700 bg-white shadow-md transition-all"
                        />
                    </div>
                    {searchQuery && (
                        <p className="mt-2 text-sm text-gray-600">
                            Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {/* FAQ Categories */}
                {Object.keys(categorizedFAQs).length > 0 ? (
                    <div className="space-y-8">
                        {Object.entries(categorizedFAQs).map(([category, faqs]) => {
                            const IconComponent = categoryIcons[category] || HelpCircle;
                            return (
                                <div key={category} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="bg-gradient-to-r from-[#a33013] to-[#e17624] px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <IconComponent className="w-6 h-6 text-[#e17624]" />
                                            <h2 className="text-2xl font-bold text-[#e17624]">{category}</h2>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {faqs.map((faq) => (
                                            <div key={faq.id} className="transition-colors hover:bg-gray-50">
                                                <button
                                                    onClick={() => toggleItem(faq.id)}
                                                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                                                >
                                                    <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                                                    {expandedItems.has(faq.id) ? (
                                                        <ChevronUp className="w-5 h-5 text-[#e17624] flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                    )}
                                                </button>
                                                {expandedItems.has(faq.id) && (
                                                    <div className="px-6 pb-4 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                        <p className="text-gray-500">Try adjusting your search terms or browse all categories above</p>
                    </div>
                )}

                {/* Contact Support Section */}
                <div className="mt-12 bg-gradient-to-br from-[#fff5ef] to-white rounded-xl shadow-md p-8 border-2 border-[#e17624]">
                    <h3 className="text-2xl font-bold text-[#a33013] mb-4 text-center">Still need help?</h3>
                    <p className="text-gray-600 text-center mb-6">
                        Can't find what you're looking for? Our support team is here to help!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/suggestion-form"
                            className="flex items-center justify-center gap-2 bg-[#e17624] text-white px-6 py-3 rounded-xl hover:bg-[#c96520] transition-colors shadow-md"
                        >
                            <Mail className="w-5 h-5" />
                            Email Support
                        </a>
                        {/* <button className="flex items-center justify-center gap-2 bg-[#2cc75c] text-white px-6 py-3 rounded-xl hover:bg-[#25b350] transition-colors shadow-md">
                            <MessageCircle className="w-5 h-5" />
                            Live Chat
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
