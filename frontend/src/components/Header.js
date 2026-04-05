import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, ChevronRight, Clock } from 'lucide-react';
import { storeInfo } from '../data/storeData';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="font-sans w-full">
            {/* Main Navigation - Floating Teal/Navy Capsule */}
            <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="w-full max-w-6xl bg-brand-navy/95 backdrop-blur-xl border border-brand-teal/20 rounded-[2rem] px-6 py-3 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] ">
                    {/* Logo Area */}
                    <div className="flex flex-col">
                        <div className="text-xl font-bold font-heading text-white tracking-widest flex items-center gap-2">
                            <span>SAI BABA</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-teal mt-0.5">
                            <span>APPLIANCES</span>
                            <span className="w-1 h-1 rounded-full bg-brand-teal shadow-[0_0_8px_rgba(100,255,218,0.8)]"></span>
                            <span>CHENNAI</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 font-medium text-gray-300 text-sm">
                        {['Home', 'Products', 'About', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="hover:text-brand-teal transition-colors tracking-wide"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button - aligned right on mobile */}
                    <button
                        className="lg:hidden text-brand-teal p-2 hover:bg-brand-teal/10 rounded-full transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>

            {/* Mobile Menu Drawer */}
            <div className={`lg:hidden fixed top-24 right-4 left-4 z-50 bg-brand-navy rounded-3xl shadow-[0_0_40px_rgba(100,255,218,0.1)] overflow-hidden border border-brand-teal/20 transition-all duration-300 transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
                <div className="p-4 flex justify-between items-center border-b border-brand-teal/10">
                    <div className="font-heading font-bold text-brand-teal tracking-widest text-sm">MENU</div>
                    <button onClick={() => setIsOpen(false)} className="p-1.5 bg-brand-teal/10 rounded-full hover:bg-brand-teal/20 transition-colors">
                        <X className="w-5 h-5 text-brand-teal" />
                    </button>
                </div>
                <div className="p-2">
                    {['Home', 'Products', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="flex items-center justify-between text-gray-300 hover:text-brand-teal hover:bg-brand-teal/5 p-4 rounded-2xl transition-colors font-medium tracking-wide"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                            <ChevronRight className="w-4 h-4 opacity-50 text-brand-teal" />
                        </a>
                    ))}
                </div>
                <div className="p-4 bg-brand-teal/5 border-t border-brand-teal/10">
                    <a
                        href={`tel:${storeInfo.phone}`}
                        className="w-full flex justify-center items-center gap-2 bg-brand-teal text-brand-navy py-3.5 rounded-2xl font-bold hover:bg-[#4CD8B8] transition-colors shadow-[0_0_20px_rgba(100,255,218,0.3)]"
                    >
                        <Phone className="w-5 h-5" />
                        Call Us Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
