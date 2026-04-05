import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ProductList = ({ category, onSelectProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase.from('products').select('*');
                if (error) throw error;
                
                let fetchedProducts = data || [];

                // Local filtering since backend doesn't support query params string
                // If a specific category is selected, filter at data level
                if (category && !category.isAll) {
                    fetchedProducts = fetchedProducts.filter(p => p.category === category.title);
                }

                if (isMounted) {
                    setProducts(fetchedProducts);
                }
            } catch (err) {
                console.error("Error fetching products", err);
                if (isMounted) {
                    setProducts([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        const channel = supabase.channel('realtime_products')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
                fetchProducts();
            })
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, [category]); // Re-fetch or re-filter when category changes

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] bg-brand-silver">
                <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Curating products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500 bg-brand-silver">
                <AlertCircle className="w-12 h-12 mb-4" />
                <p className="font-medium">{error}</p>
            </div>
        );
    }

    return (
        <section id="products" className="bg-brand-silver pb-12 md:pb-20 pt-4 md:pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-brand-orange font-bold tracking-wider uppercase text-xs md:text-sm mb-2">
                            <ShoppingBag className="w-4 h-4" /> {category && !category.isAll ? 'Collection' : 'All Products'}
                        </div>
                        <h2 className="text-2xl md:text-5xl font-extrabold font-heading text-brand-navy">
                            {category && !category.isAll ? (
                                <><span className="text-brand-teal">{category.title}</span> Products</>
                            ) : (
                                <>All <span className="text-brand-teal">Products</span></>
                            )}
                        </h2>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12 md:py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            {category && !category.isAll
                                ? `No products found in the ${category.title} category right now.`
                                : "No products available right now."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} onClick={onSelectProduct} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductList;
