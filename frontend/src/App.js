import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Categories from './components/Categories';
import Features from './components/Features';
import StoreDetails from './components/StoreDetails';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { ArrowLeft, Lock, X, Package, Grid, Mail } from 'lucide-react';
import { supabase } from './supabaseClient';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import ProductManager from './components/admin/ProductManager';
import CategoryManager from './components/admin/CategoryManager';

function App() {
    const [currentPage, setCurrentPage] = useState('home'); // home, admin
    const [adminTab, setAdminTab] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [stats, setStats] = useState({ products: 0, categories: 0, enquiries: 0 });
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [adminError, setAdminError] = useState('');

    const handleAdminClick = () => {
        setShowAdminLogin(true);
        setAdminPassword('');
        setAdminError('');
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (adminPassword === "admin@saibaba#9841859710") {
            setCurrentPage('admin');
            setShowAdminLogin(false);
            setAdminPassword('');
            setAdminError('');
        } else {
            setAdminError("Incorrect password. Access denied.");
        }
    };

    React.useEffect(() => {
        let isMounted = true;

        const fetchStats = async () => {
            try {
                const [prodRes, catRes, enqRes] = await Promise.all([
                    supabase.from('products').select('*', { count: 'exact', head: true }),
                    supabase.from('categories').select('*', { count: 'exact', head: true }),
                    supabase.from('enquiries').select('*', { count: 'exact', head: true })
                ]);

                if (isMounted) {
                    setStats({
                        products: prodRes.count || 0,
                        categories: catRes.count || 0,
                        enquiries: enqRes.count || 0
                    });
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
        
        // Listen to all changes across products, categories, and enquiries on public schema
        const channel = supabase.channel('admin_stats_channel')
            .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
                fetchStats();
            })
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    const adminLoginModal = showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                    <button onClick={() => setShowAdminLogin(false)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-8 pb-8 text-center">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-orange/20 shadow-inner">
                        <Lock className="w-7 h-7 text-brand-orange" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-brand-navy mb-2">Admin Access</h2>
                    <p className="text-gray-500 text-sm mb-6">Enter the administrator password to unlock the dashboard.</p>
                    
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                            <input 
                                type="password" 
                                value={adminPassword}
                                onChange={(e) => {
                                    setAdminPassword(e.target.value);
                                    if(adminError) setAdminError('');
                                }}
                                placeholder="Enter password..."
                                className={`w-full px-4 py-3 rounded-xl border ${adminError ? 'border-red-500 bg-red-50 text-red-700 focus:ring-red-500' : 'border-gray-300 bg-white text-black focus:ring-brand-orange'} focus:outline-none focus:ring-2 transition-all text-center font-bold tracking-[0.3em]`}
                                autoFocus
                            />
                            {adminError && <p className="text-red-500 text-xs mt-2 font-medium">{adminError}</p>}
                        </div>
                        <button type="submit" className="w-full bg-brand-navy text-white font-bold py-3 rounded-xl hover:bg-brand-orange transition-colors shadow-lg shadow-brand-navy/20 flex items-center justify-center gap-2">
                            Secure Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

    const renderAdminContent = () => {
        switch (adminTab) {
            case 'products': return <ProductManager />;
            case 'categories': return <CategoryManager />;
            default: return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all group relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-blue-400"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Products</h3>
                                <p className="text-4xl font-black text-gray-900">{stats.products}</p>
                            </div>
                            <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                                <Package className="w-7 h-7" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all group relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-orange-400"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Categories</h3>
                                <p className="text-4xl font-black text-gray-900">{stats.categories}</p>
                            </div>
                            <div className="w-14 h-14 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                                <Grid className="w-7 h-7" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all group relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Active Enquiries</h3>
                                <p className="text-4xl font-black text-gray-900">{stats.enquiries}</p>
                            </div>
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                <Mail className="w-7 h-7" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    if (currentPage === 'admin') {
        return (
            <AdminLayout
                activeTab={adminTab}
                onTabChange={setAdminTab}
                onLogout={() => setCurrentPage('home')}
            >
                {renderAdminContent()}
            </AdminLayout>
        );
    }

    if (selectedProduct) {
        return (
            <div className="font-sans text-brand-text">
                <Header />
                <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} onSelectProduct={setSelectedProduct} />
                <Footer onAdminClick={handleAdminClick} />
                <FloatingButtons />
                {adminLoginModal}
            </div>
        );
    }

    if (selectedCategory) {
        return (
            <div className="font-sans text-brand-text">
                <Header />
                <main className="pt-24 bg-brand-silver">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors font-semibold"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back to Home
                        </button>
                    </div>
                    <ProductList category={selectedCategory} onSelectProduct={setSelectedProduct} />
                </main>
                <Footer onAdminClick={handleAdminClick} />
                <FloatingButtons />
                {adminLoginModal}
            </div>
        );
    }

    return (
        <div className="font-sans text-brand-text">
            <Header />
            <main>
                <Hero />
                <TrustBar />
                <Categories onSelectCategory={setSelectedCategory} />
                <Features />
                <StoreDetails />
                <ContactForm />
            </main>
            <Footer onAdminClick={handleAdminClick} />
            <FloatingButtons />
            {adminLoginModal}
        </div>
    );
}

export default App;
