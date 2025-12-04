import { useState } from 'react';
import { Send, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export function SuggestionForm() {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subject.trim() || !message.trim()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitted(true);
        setIsSubmitting(false);

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubject('');
            setMessage('');
            setIsSubmitted(false);
        }, 3000);
    };

    const isFormValid = subject.trim().length > 0 && message.trim().length > 0;

    return (
        <div className="min-h-screen bg-[#fff5ef] py-12 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a33013] to-[#e17624] rounded-full mb-4">
                        <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-[#a33013] mb-4">Send Us Your Feedback</h1>
                    <p className="text-xl text-gray-600">
                        We'd love to hear your suggestions, issues, or feedback!
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100">
                    {isSubmitted ? (
                        // Success Message
                        <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
                            <p className="text-lg text-gray-600 mb-2">
                                Your feedback has been successfully submitted.
                            </p>
                            <p className="text-gray-500">
                                We'll review it and get back to you as soon as possible.
                            </p>
                        </div>
                    ) : (
                        // Form
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Subject Field */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Brief summary of your feedback"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#e17624] focus:outline-none text-gray-700 bg-white transition-all placeholder:text-gray-400"
                                    maxLength={100}
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    {subject.length}/100 characters
                                </p>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Issue / Suggestion <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Please describe your issue or suggestion in detail..."
                                    rows={8}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#e17624] focus:outline-none text-gray-700 bg-white transition-all placeholder:text-gray-400 resize-none"
                                    maxLength={1000}
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    {message.length}/1000 characters
                                </p>
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-blue-800 mb-1">
                                            Response Time
                                        </p>
                                        <p className="text-sm text-blue-700">
                                            Our support team typically responds within 24-48 hours. For urgent issues, please contact us directly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white transition-all shadow-md ${isFormValid && !isSubmitting
                                            ? 'bg-gradient-to-r from-[#a33013] to-[#e17624] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Feedback</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Additional Help */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">
                        Need immediate assistance?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="/help-faq"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#a33013] border-2 border-[#a33013] rounded-xl hover:bg-[#a33013] hover:text-white transition-colors font-semibold shadow-sm"
                        >
                            Visit Help Center
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
