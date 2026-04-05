import React from 'react';
import { Phone, MessageCircle, MapPin, Star, ShieldCheck, Zap } from 'lucide-react';
import { storeInfo } from '../data/storeData';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center bg-brand-navy overflow-hidden pt-20">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-brand-teal/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-12 lg:py-0">
                {/* Text Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                        </span>
                        <span className="text-sm font-medium text-brand-teal tracking-wide uppercase">
                            Premium Appliances in Ambattur
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white leading-[1.1]">
                        Elevate Your <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-pink-500 to-purple-500">
                            Everyday Living
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                        Discover a curated collection of state-of-the-art home appliances.
                        Experience unbeatable quality, trusted service, and lightning-fast local delivery.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <a
                            href={`tel:${storeInfo.phone}`}
                            className="group relative px-8 py-4 bg-brand-orange text-white rounded-xl font-bold overflow-hidden shadow-[0_0_40px_rgba(255,87,34,0.4)] transition-all hover:shadow-[0_0_60px_rgba(255,87,34,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <Phone className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Call for Best Price</span>
                        </a>

                        <a
                            href={storeInfo.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                        >
                            <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                            <span>WhatsApp Us</span>
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 mt-8">
                        <div className="flex flex-col items-center lg:items-start gap-1">
                            <div className="flex text-yellow-500 mb-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <span className="text-sm text-gray-400 font-medium">5.0 Google Rating</span>
                        </div>
                        <div className="flex flex-col items-center lg:items-start gap-1">
                            <ShieldCheck className="w-5 h-5 text-brand-teal mb-1" />
                            <span className="text-sm text-gray-400 font-medium">100% Genuine</span>
                        </div>
                        <div className="flex flex-col items-center lg:items-start gap-1">
                            <Zap className="w-5 h-5 text-brand-orange mb-1" />
                            <span className="text-sm text-gray-400 font-medium">Fast Delivery</span>
                        </div>
                    </div>
                </div>

                {/* Visual Content - Floating Image */}
                <div className="relative hidden lg:block h-full min-h-[600px] perspective-1000">
                    <div className="absolute inset-0 flex items-center justify-center animate-float">
                        {/* Decorative background for image */}
                        <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-brand-orange/20 to-brand-teal/20 rounded-full blur-3xl -z-10"></div>

                        {/* Main Image Container */}
                        <div className="relative w-full aspect-square max-w-lg">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-pink-500 rounded-3xl transform rotate-6 opacity-50 blur-lg"></div>
                            <img
                                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
                                alt="Modern Home Appliances Showroom"
                                className="relative w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10 transform transition-transform duration-700 hover:rotate-2 hover:scale-105"
                            />

                            {/* Floating Glass Cards overlay */}
                            <div className="absolute -bottom-10 -left-10 glass-card p-4 rounded-2xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="bg-green-500/20 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="pr-4">
                                    <p className="text-xs text-brand-navy font-bold">Location</p>
                                    <a href={storeInfo.mapsLink} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-navy hover:text-brand-orange transition-colors">
                                        Ambattur, Chennai
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
        </section>
    );
};

export default Hero;
