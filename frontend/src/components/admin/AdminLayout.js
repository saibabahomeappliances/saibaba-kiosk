import React, { useState } from 'react';
import { LayoutDashboard, Package, Grid, Home, LogOut, Menu, X, ChevronDown, User, Settings } from 'lucide-react';

const AdminLayout = ({ activeTab, onTabChange, children, onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleTabClick = (tab) => {
        onTabChange(tab);
        setIsSidebarOpen(false); // Auto-close on mobile
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-50 transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0`}
            >
                <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-brand-orange">Admin Panel</h2>
                        <p className="text-xs text-gray-400 mt-1">Sai Baba Appliances</p>
                    </div>
                    <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button
                        onClick={() => handleTabClick('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'dashboard' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>

                    <button
                        onClick={() => handleTabClick('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'products' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <Package className="w-5 h-5" />
                        Products
                    </button>

                    <button
                        onClick={() => handleTabClick('categories')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'categories' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <Grid className="w-5 h-5" />
                        Categories
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200 font-medium mt-8 border border-gray-800"
                    >
                        <Home className="w-5 h-5" />
                        Back to Store
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                    <div className="flex items-center gap-3 px-2 py-2">
                         <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange font-bold text-lg border border-brand-orange/30">
                             A
                         </div>
                         <div className="flex-1 min-w-0">
                             <p className="text-sm font-medium text-white truncate">Admin User</p>
                             <p className="text-xs text-gray-400 truncate">admin@saibaba</p>
                         </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 shrink-0 shadow-sm relative">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">{activeTab}</h1>
                    </div>

                    {/* Top Right Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-200 relative z-50"
                        >
                            <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                A
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-gray-50 sm:hidden">
                                     <p className="text-sm text-gray-900 font-medium">Admin User</p>
                                     <p className="text-xs text-gray-500 truncate">admin@saibaba</p>
                                </div>
                                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                    <User className="w-4 h-4 text-gray-400" /> Profile
                                </button>
                                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                    <Settings className="w-4 h-4 text-gray-400" /> Settings
                                </button>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <button 
                                    onClick={() => { setIsProfileOpen(false); onLogout(); }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium"
                                >
                                    <LogOut className="w-4 h-4 text-red-500" /> Logout
                                </button>
                            </div>
                        )}
                        
                        {/* Auto-close dropdown when clicking outside */}
                        {isProfileOpen && (
                            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto pb-12">
                        <h1 className="text-2xl font-bold text-gray-800 capitalize sm:hidden mb-6 px-2">{activeTab}</h1>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
