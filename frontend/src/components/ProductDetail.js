import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Info, Tag, CheckCircle } from 'lucide-react';
import { storeInfo } from '../data/storeData';
import ProductCard from './ProductCard';

const ProductDetail = ({ product, onBack, onSelectProduct }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (!product) return;

        const fetchRelated = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
                if (!res.ok) throw new Error('Failed to fetch related products');
                const data = await res.json();
                
                if (data) {
                    const related = data
                        .filter(p => p.category === product.category && p.id !== product.id)
                        .slice(0, 10);
                    setRelatedProducts(related);
                }
            } catch (err) {
                console.error("Error fetching related products", err);
            }
        };

        fetchRelated();

        // Scroll to top when view changes
        window.scrollTo(0, 0);
    }, [product]);

    if (!product) return null;

    const fallbackImage = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
    const image = product.image || fallbackImage;

    const handleEnquire = () => {
        const message = `Hi, I am interested in your product: *${product.title}*.\n\nPrice: ₹${product.price}${product.model_number ? `\nModel: ${product.model_number}` : ''}\n\nCould you provide more details?`;
        const whatsappUrl = `https://wa.me/${storeInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="font-sans text-brand-text min-h-[85vh] bg-brand-silver pt-20 md:pt-24 pb-12 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors font-semibold mb-6 group"
                >
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Products
                </button>

                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
                    {/* Image Gallery Area */}
                    <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-4 md:p-8 relative">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-200/50 to-transparent"></div>
                        <img
                            src={image}
                            alt={product.title}
                            className="w-full max-w-sm h-auto object-contain relative z-10 mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Product Info Area */}
                    <div className="md:w-1/2 p-5 md:p-8 lg:p-10 flex flex-col">
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                {product.category}
                            </span>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-heading text-brand-navy leading-tight mb-2">
                                {product.title}
                            </h1>
                            {product.model_number && (
                                <div className="text-gray-500 font-medium flex items-center gap-2">
                                    <Tag className="w-4 h-4" /> Model: {product.model_number}
                                </div>
                            )}
                        </div>

                        <div className="mt-2 mb-6 pb-6 border-b border-gray-100">
                            <div className="flex items-end gap-3 mb-1">
                                <span className="text-3xl md:text-4xl font-extrabold text-brand-navy">
                                    ₹{product.price}
                                </span>
                                <span className="text-lg text-gray-400 line-through mb-1">
                                    ₹{(product.price * 1.2).toFixed(2)}
                                </span>
                            </div>
                            <p className="text-green-600 font-semibold text-sm flex items-center gap-1.5 mt-2">
                                <CheckCircle className="w-4 h-4" /> In Stock & Available
                            </p>
                        </div>

                        <div className="mb-6 flex-grow">
                            <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Info className="w-4 h-4 text-brand-orange" /> Product Information
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {product.description || "No detailed description available for this product. Please send an enquiry for more specifications."}
                            </p>
                        </div>

                        <button
                            onClick={handleEnquire}
                            className="mt-auto w-full py-3 md:py-4 px-6 rounded-xl font-bold text-base text-white shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                            style={{ backgroundColor: '#25D366' }} // Official WhatsApp green
                        >
                            <MessageCircle className="w-5 h-5" />
                            Enquire on WhatsApp
                        </button>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12 md:mt-16">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
                                    Explore More <span className="text-brand-orange">Products</span>
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">More items from the {product.category} collection</p>
                            </div>
                        </div>

                        {/* Horizontal Scrolling Container */}
                        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide gap-4 snap-x snap-mandatory hide-scroll">
                            {relatedProducts.map(related => (
                                <div key={related.id} className="min-w-[240px] w-[240px] md:min-w-[280px] md:w-[280px] flex-shrink-0 snap-start">
                                    <ProductCard product={related} onClick={onSelectProduct} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
