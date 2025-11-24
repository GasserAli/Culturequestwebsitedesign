import { Facebook, Twitter, Instagram, Youtube, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
    onOpenHelp: () => void;
}

export function Footer({ onOpenHelp }: FooterProps) {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#e17624] flex items-center justify-center">
                                <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <span className="text-[#a33013] font-bold text-xl">CultureQuest</span>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Empowering the next generation of global citizens through immersive cultural learning.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-[#e17624] transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#e17624] transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#e17624] transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#e17624] transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                        <ul className="space-y-3">
                            <li><Link to="/curriculum" className="text-gray-600 hover:text-[#e17624]">Curriculum</Link></li>
                            <li><Link to="/marketplace" className="text-gray-600 hover:text-[#e17624]">Marketplace</Link></li>
                            <li><Link to="/student-dashboard" className="text-gray-600 hover:text-[#e17624]">Student View</Link></li>
                            <li><Link to="/parent-dashboard" className="text-gray-600 hover:text-[#e17624]">Parent Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 hover:text-[#e17624]">About Us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#e17624]">Careers</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#e17624]">Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#e17624]">Press</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={onOpenHelp}
                                    className="text-gray-600 hover:text-[#e17624] flex items-center gap-2"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    Help Center
                                </button>
                            </li>
                            <li><a href="#" className="text-gray-600 hover:text-[#e17624]">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#e17624]">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-[#e17624]">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} CultureQuest. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-[#e17624] text-sm">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-[#e17624] text-sm">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-[#e17624] text-sm">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
