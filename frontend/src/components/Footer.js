import React from 'react';
import { storeInfo } from '../data/storeData';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

const Footer = ({ onAdminClick }) => {
    return (
        <footer className="bg-brand-dark text-gray-400 py-16 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-teal/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-b border-white/5 pb-16">
                    <div className="lg:col-span-2 pr-8">
                        <div className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-pink-500 flex flex-col justify-center items-center shadow-neon-orange">
                                <span className="text-white text-lg leading-none">S</span>
                            </div>
                            <span className="text-white">Sai Baba Appliances</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm mb-8 text-gray-500">
                            Your trusted premier destination for high-quality home electronics and appliances in Ambattur, Chennai. Elevating homes with reliable technology.
                        </p>

                        <div className="flex items-center gap-4">
                            <a href={`tel:${storeInfo.phone}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all text-gray-400 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <Phone className="w-4 h-4" />
                            </a>
                            <a href={storeInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all text-gray-400 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            {[
                                { name: 'Home', link: '#home' },
                                { name: 'Collections', link: '#categories' },
                                { name: 'About Us', link: '#about' },
                                { name: 'Contact', link: '#contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a href={item.link} className="hover:text-brand-teal transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-brand-teal transition-colors"></span>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">Store Information</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 group">
                                <MapPin className="w-5 h-5 text-gray-600 group-hover:text-brand-orange transition-colors shrink-0" />
                                <a href={storeInfo.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">
                                    {storeInfo.address}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Phone className="w-5 h-5 text-gray-600 group-hover:text-brand-orange transition-colors shrink-0" />
                                <a href={`tel:${storeInfo.phone}`} className="hover:text-white transition-colors">{storeInfo.phone}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Sai Baba Home Appliances. All rights reserved.</p>
                    <button onClick={onAdminClick} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                        Admin Dashboard Access
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
