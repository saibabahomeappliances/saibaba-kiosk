import React from 'react';
import { features } from '../data/storeData';

const Features = () => {
    return (
        <section className="relative py-16 md:py-24 bg-brand-silver overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3 block">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-navy mb-4">
                        The Sai Baba <span className="text-brand-teal">Advantage</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg pt-2 text-balance">
                        We don't just sell appliances; we provide peace of mind. Here is why thousands of families in Ambattur trust us.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group glass-card p-6 md:p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-start h-full cursor-pointer relative overflow-hidden">
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 to-brand-teal/0 group-hover:from-brand-orange/5 group-hover:to-brand-teal/5 transition-colors duration-300"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white shadow-premium text-brand-navy mb-4 md:mb-6 group-hover:scale-110 group-hover:text-brand-orange transition-all duration-300 transform rotate-3 group-hover:rotate-0">
                                    <feature.icon className="w-6 h-6 md:w-10 md:h-10" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-base md:text-xl font-bold font-heading text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
