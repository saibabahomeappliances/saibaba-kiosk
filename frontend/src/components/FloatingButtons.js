import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, ChevronUp } from 'lucide-react';
import { storeInfo } from '../data/storeData';

const FloatingButtons = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
            {/* Scroll To Top (Desktop) */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-opacity hidden md:flex items-center justify-center transform hover:scale-110"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}

            {/* Mobile Sticky Action Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 grid grid-cols-2 gap-4">
                <a
                    href={`tel:${storeInfo.phone}`}
                    className="flex items-center justify-center gap-2 bg-brand-orange text-white py-3 rounded-lg font-bold shadow-md"
                >
                    <Phone className="w-5 h-5" /> Call
                </a>
                <a
                    href={storeInfo.whatsappLink}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-bold shadow-md"
                >
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
            </div>

            {/* Desktop WhatsApp Button */}
            <a
                href={storeInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 items-center justify-center"
                title="Chat on WhatsApp"
            >
                <MessageCircle className="w-8 h-8" />
            </a>
        </div>
    );
};

export default FloatingButtons;
