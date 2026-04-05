import React from 'react';
import { storeInfo, paymentMethods } from '../data/storeData';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

const StoreDetails = () => {
    return (
        <section id="about" className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-silver/50 -skew-x-12 transform origin-top-right z-0 hidden lg:block"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    {/* Text Content */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-3 block">Store Location</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-navy mb-6 leading-tight">
                                Visit Our <br className="hidden md:block" />
                                <span className="text-brand-teal">Showroom</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Experience our premium appliances firsthand. Our knowledgeable staff in Ambattur is ready to help you find the perfect fit for your home.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-silver/50 transition-colors">
                                <div className="bg-brand-orange text-white p-3 rounded-xl shadow-lg shadow-brand-orange/30">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="mt-1">
                                    <h4 className="font-bold text-gray-900 text-lg">Address</h4>
                                    <a href={storeInfo.mapsLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-orange transition-colors mt-1 block leading-relaxed">{storeInfo.address}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-silver/50 transition-colors">
                                <div className="bg-brand-teal text-brand-navy p-3 rounded-xl shadow-lg shadow-brand-teal/30">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="mt-1">
                                    <h4 className="font-bold text-gray-900 text-lg">Store Hours</h4>
                                    <p className="text-gray-600 mt-1">{storeInfo.hours}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-silver/50 transition-colors">
                                <div className="bg-gray-100 text-brand-navy p-3 rounded-xl border border-gray-200">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="mt-1">
                                    <h4 className="font-bold text-gray-900 text-lg">Contact Us</h4>
                                    <a href={`tel:${storeInfo.phone}`} className="text-gray-600 hover:text-brand-orange mt-1 block">{storeInfo.phone}</a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide text-gray-500">Payment Methods</h4>
                            <div className="flex flex-wrap gap-2">
                                {paymentMethods.map((method, index) => (
                                    <span key={index} className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium border border-gray-200 shadow-sm">
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map Embed - Overlapping layout */}
                    <div className="lg:col-span-7 relative mt-8 lg:mt-0">
                        <div className="absolute -inset-4 bg-gradient-to-r from-brand-orange to-pink-500 rounded-[2.5rem] opacity-20 blur-xl"></div>
                        <div className="h-[300px] sm:h-[400px] md:h-[600px] bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border border-white/50">
                            <iframe
                                title="Store Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.657386762145!2d80.1557783!3d13.1119561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263ca7c4587c3%3A0x6b8b0e6e0e6e0e6e!2sAmbattur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709876543210!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>

                            {/* Floating Action CTA */}
                            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-11/12 max-w-sm z-20 pointer-events-auto">
                                <a
                                    href={storeInfo.mapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-brand-navy/95 backdrop-blur-md text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold shadow-2xl hover:bg-brand-navy transition-all hover:scale-105 border border-white/10"
                                >
                                    <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal" />
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoreDetails;

