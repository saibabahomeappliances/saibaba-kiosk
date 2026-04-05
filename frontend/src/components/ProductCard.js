import React from 'react';
import { ShoppingCart, Heart, Zap } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
    // Fallback image if none provided
    const image = product.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';

    return (
        <div
            onClick={() => onClick && onClick(product)}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full cursor-pointer"
        >
            {/* Image Container */}
            <div className="relative h-56 md:h-64 overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                {/* Sale/New Badge (Mock for design) */}
                <div className="absolute top-4 left-4 z-10 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" /> Fast Moving
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all">
                    <Heart className="w-5 h-5" />
                </button>

                <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-contain filter mix-blend-multiply transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Category & Title */}
                <div className="mb-2">
                    <p className="text-xs text-brand-teal font-bold uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="text-lg font-bold font-heading text-brand-navy leading-tight line-clamp-2 min-h-[3rem]">
                        {product.title}
                    </h3>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                {/* Price & Action */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">₹{(product.price * 1.2).toFixed(2)}</span>
                        <span className="text-xl font-extrabold text-brand-navy">
                            ₹{product.price}
                        </span>
                    </div>

                    <button className="bg-brand-silver hover:bg-brand-orange text-brand-navy hover:text-white p-3 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-neon-orange group-hover:-translate-y-1 transform">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
