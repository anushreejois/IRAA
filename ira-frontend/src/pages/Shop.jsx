import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Added motion
import API from '../services/api';
import Navbar from '../components/Navbar';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 12;

    const navigate = useNavigate();

    // Framer Motion Variants for the Staggered Grid
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Delay between each product card
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1] // Luxury cubic-bezier easing
            }
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                let url = `/products?page=${currentPage}&size=${pageSize}`;
                if (searchTerm) {
                    url = `/products/search?query=${searchTerm}&page=${currentPage}&size=${pageSize}`;
                }
                const res = await API.get(url);
                setProducts(res.data.content || []);
                setTotalPages(res.data.totalPages || 0);
            } catch (err) {
                console.error("Archive connection failed:", err);
            } finally {
                // Short timeout to ensure the "Curating..." state feels intentional
                setTimeout(() => setLoading(false), 400);
            }
        };
        loadProducts();
    }, [currentPage, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white overflow-x-hidden">
            <Navbar />

            <div className="px-12 py-16">
                <header className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-black/5 pb-10 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-xl"
                    >
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-3 font-bold">
                            Collection No. 01 — 2026
                        </span>
                        <h1 className="font-serif text-8xl italic tracking-tighter text-[#1A1A1A]">The Gallery.</h1>
                    </motion.div>

                    <div className="w-full md:w-64">
                        <input
                            type="text"
                            placeholder="SEARCH ARCHIVE..."
                            className="w-full bg-transparent border-b border-black/10 pb-2 text-[9px] tracking-[0.3em] outline-none focus:border-black transition-all uppercase font-bold"
                            onChange={handleSearch}
                        />
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center h-96 italic font-serif text-xl"
                        >
                            Curating...
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
                        >
                            {products.map(product => (
                                <motion.div
                                    key={product.id}
                                    variants={cardVariants}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#EFEEEA] relative mb-8">
                                        <img
                                            src={product.imageUrl || "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"}
                                            alt={product.title}
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-[2500ms] ease-in-out"
                                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"; }}
                                        />

                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                                            <div className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-700 text-center">
                                                Acquire Artifact
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start pt-2 px-1">
                                        <div>
                                            <h3 className="font-serif text-2xl italic leading-none text-[#1A1A1A] group-hover:opacity-60 transition-opacity duration-500">
                                                {product.title}
                                            </h3>
                                            <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold block mt-3">
                                                {product.category?.name || "Artifact"} — No. 00{product.id}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium tabular-nums opacity-70 italic font-serif">
                                            ${product.price}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 flex justify-center items-center gap-12 border-t border-black/5 pt-12"
                >
                    <button
                        disabled={currentPage === 0}
                        onClick={() => {
                            setCurrentPage(prev => prev - 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-[9px] uppercase tracking-[0.4em] font-bold disabled:opacity-5 hover:tracking-[0.6em] transition-all"
                    >
                        ← Previous
                    </button>

                    <span className="font-serif italic opacity-40 text-sm">
                        {currentPage + 1} <span className="mx-2 text-xs opacity-20">/</span> {totalPages}
                    </span>

                    <button
                        disabled={currentPage + 1 >= totalPages}
                        onClick={() => {
                            setCurrentPage(prev => prev + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-[9px] uppercase tracking-[0.4em] font-bold disabled:opacity-5 hover:tracking-[0.6em] transition-all"
                    >
                        Next →
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Shop;