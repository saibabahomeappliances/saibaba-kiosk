import React from 'react';

const TrustBar = () => {
    return (
        <section className="bg-brand-silver py-8 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl font-bold text-brand-orange">5.0 ⭐</span>
                        <span className="text-sm font-medium text-gray-600">Google Rating</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl font-bold text-brand-blue">Local</span>
                        <span className="text-sm font-medium text-gray-600">Serving Ambattur</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl font-bold text-brand-blue">Fast</span>
                        <span className="text-sm font-medium text-gray-600">Delivery Available</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl font-bold text-brand-blue">Trust</span>
                        <span className="text-sm font-medium text-gray-600">Since 2010</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
