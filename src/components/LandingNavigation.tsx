import { Crown } from 'lucide-react';

export function LandingNavigation() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => scrollToSection('hero')}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#e17624] flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#a33013] font-bold text-xl">CultureQuest</span>
                    </button>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Pricing
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
