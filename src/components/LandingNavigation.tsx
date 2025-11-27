import { Crown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LandingNavigation() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sections = ['hero', 'about', 'pricing'];
        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getButtonClass = (sectionId: string) => {
        const baseClass = 'px-4 py-2 rounded-lg transition-colors';
        const activeClass = 'bg-[#e17624] text-white';
        const inactiveClass = 'text-gray-700 hover:bg-gray-100';

        return `${baseClass} ${activeSection === sectionId ? activeClass : inactiveClass}`;
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('hero')}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#e17624] flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#a33013] font-bold text-xl">CultureQuest</span>
                    </button>

                    {/* Centered Navigation Links */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={getButtonClass('hero')}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className={getButtonClass('about')}
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className={getButtonClass('pricing')}
                        >
                            Pricing
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                        >
                            Log in
                        </button>
                        <button
                            className="px-6 py-2 rounded-lg bg-[#2cc75c] text-black hover:bg-[#25b350] transition-colors font-medium shadow-sm"
                        >
                            Start free trial
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
