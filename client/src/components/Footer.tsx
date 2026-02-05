import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <BookOpen className="text-primary" size={24} />
                            <span className="font-logo font-bold text-xl">
                                <span className="text-primary">SilidAklatan</span>
                                <span className="text-white">PH</span>
                            </span>
                        </Link>
                        <p className="text-gray-300">
                            Your digital library companion. Access thousands of books, resources, and learning materials anytime, anywhere.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="text-gray-300 hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="text-gray-300 hover:text-primary transition-colors">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-300 hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies" className="text-gray-300 hover:text-primary transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="text-gray-300 hover:text-primary transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-gray-300">
                                <Mail size={18} />
                                <span>support@silidaklatanph.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-300">
                                <Phone size={18} />
                                <span>+63 123 456 7890</span>
                            </li>
                            <li className="flex items-start space-x-2 text-gray-300">
                                <MapPin size={18} />
                                <span>123 Library Street, Quezon City, Metro Manila, Philippines</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SilidAklatanPH. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;