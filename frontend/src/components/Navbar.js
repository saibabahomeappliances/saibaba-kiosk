import React from 'react';
import { Activity, Package, shoppingCart } from 'lucide-react';

const Navbar = ({ currentPage, onNavigate }) => {
    return (
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                NeonTech
                            </span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <button
                                    onClick={() => onNavigate('home')}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'home'
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4" />
                                        Status
                                    </div>
                                </button>
                                <button
                                    onClick={() => onNavigate('products')}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'products' // Simplified for now, will map 'products' view
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        Products
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
