import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#a33013] to-[#e17624] text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#e17624] flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                            <div>
                                <h3 className="text-xl font-bold">CultureQuest</h3>
                                <p className="text-sm text-white/80">Discover Egypt</p>
                            </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Bringing Egyptian civilization to life through interactive learning experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/help-faq" className="text-white/90 hover:text-white transition-colors text-sm">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/suggestion-form" className="text-white/90 hover:text-white transition-colors text-sm">
                                    Suggestions Center
                                </Link>
                            </li>
                            <li>
                                <a href="/#about" className="text-white/90 hover:text-white transition-colors text-sm">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/#pricing" className="text-white/90 hover:text-white transition-colors text-sm">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span className="text-white/90 text-sm">
                                    123 Pyramid Plaza, Cairo District<br />
                                    Cairo, Egypt 21500
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <a href="tel:+20123456789" className="text-white/90 hover:text-white transition-colors text-sm">
                                    +20 (123) 456-789
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <a href="mailto:support@culturequest.com" className="text-white/90 hover:text-white transition-colors text-sm">
                                    support@culturequest.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="font-semibold mb-4 text-lg">Follow Us</h4>
                        <p className="text-white/90 text-sm mb-4">
                            Join our community and stay updated with the latest content!
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                {/* <div className="border-t border-white/20 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/80 text-sm">
                            © {new Date().getFullYear()} CultureQuest. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                                Terms of Service
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </footer>
    );
}
