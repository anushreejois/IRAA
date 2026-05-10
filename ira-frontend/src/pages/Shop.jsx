import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import Navbar from '../components/Navbar';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts()
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : (res.data?.content || []);
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Archive connection failed:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let results = products;
        if (searchTerm) {
            results = results.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (activeCategory !== 'All') {
            results = results.filter(p => p.category?.name === activeCategory);
        }
        setFilteredProducts(results);
    }, [searchTerm, activeCategory, products]);

    const categories = ['All', ...new Set(products.map(p => p.category?.name).filter(Boolean))];

    return (
        <div className="min-h-screen bg-ira-cream">
            <Navbar />

            <div className="px-12 py-16">
                {/* Cleaned Up Header */}
                <header className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-black/5 pb-10 gap-8">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-3 font-bold">
                            Collection No. 01 — 2026
                        </span>
                        <h1 className="font-serif text-8xl italic tracking-tighter text-[#1A1A1A]">The Gallery.</h1>
                    </div>

                    <div className="w-full md:w-64">
                        <input
                            type="text"
                            placeholder="SEARCH ARCHIVE..."
                            className="w-full bg-transparent border-b border-black/10 pb-2 text-[9px] tracking-[0.3em] outline-none focus:border-black transition-all uppercase font-bold"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                {/* Filters */}
                <div className="flex gap-10 mb-20 overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-all cursor-pointer pb-2 ${
                                activeCategory === cat ? 'opacity-100 border-b-2 border-black' : 'opacity-20 hover:opacity-50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid with Image Fallback */}
                {loading ? (
                    <div className="flex justify-center items-center h-96 italic font-serif opacity-30 text-xl">
                        Curating...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[3/4] w-full overflow-hidden bg-[#EFEEEA] relative mb-8">
                                    <img
                                        src={product.imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"}
                                        alt={product.title}
                                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                        // THIS FIXES THE BROKEN IMAGE IN YOUR SCREENSHOT
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                        <button className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                            Acquire — ${product.price}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start pt-2 px-1">
                                    <div>
                                        <h3 className="font-serif text-2xl italic leading-none text-ira-dark">{product.title}</h3>
                                        <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold block mt-3">
                                            {product.category?.name || "Artifact"} — No. 00{product.id}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium tabular-nums opacity-70">${product.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;