import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Categories = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchCategories = async () => {
            try {
                const { data, error } = await supabase.from('categories').select('*');
                if (error) throw error;
                
                if (isMounted) {
                    setCategories(data || []);
                }
            } catch (error) {
                console.error("Error fetching categories", error);
                if (isMounted) {
                    setCategories([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchCategories();

        const channel = supabase.channel('realtime_categories')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, (payload) => {
                fetchCategories();
            })
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    if (loading) return (
        <div className="py-24 flex justify-center items-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
        </div>
    );

    return (
        <section id="categories" className="py-20 md:py-28 bg-white relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-brand-orange font-bold tracking-wider uppercase text-sm mb-3">
                            <Sparkles className="w-4 h-4" /> Collections
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-navy mb-4 leading-tight">
                            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-pink-500">Category</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Explore our curated selection of premium home appliances designed to elevate your living space.
                        </p>
                    </div>
                    <button onClick={() => onSelectCategory && onSelectCategory({ title: 'All Products', isAll: true })} className="hidden md:flex items-center gap-2 group text-brand-navy font-semibold hover:text-brand-orange transition-colors">
                        View All Categories
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-6">
                    {categories.map((category) => (
                        <div key={category.id} onClick={() => onSelectCategory && onSelectCategory(category)} className="group cursor-pointer block relative h-[180px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-2xl md:rounded-3xl overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-500">
                            {/* Background Image */}
                            <img
                                src={category.image}
                                alt={category.title}
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-end">
                                <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-white mb-1 md:mb-2 leading-tight">{category.title}</h3>

                                    <div className="hidden sm:flex items-center gap-1.5 text-brand-teal opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 font-medium text-xs md:text-sm">
                                        <span>Explore Collection</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Corner Element */}
                            <div className="hidden md:flex absolute top-3 right-3 w-8 h-8 rounded-full glass-card items-center justify-center opacity-0 group-hover:opacity-100 transform rotate-[-45deg] group-hover:rotate-0 transition-all duration-500 delay-100">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={() => onSelectCategory && onSelectCategory({ title: 'All Products', isAll: true })} className="md:hidden mt-8 w-full py-4 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-2 text-brand-navy font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors">
                    View All Products
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
};

export default Categories;
