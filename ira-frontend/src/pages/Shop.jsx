import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../services/api';
import Navbar from '../components/Navbar';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [department, setDepartment] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 12;
    const navigate = useNavigate();

    // Staggered load for cards
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const res = await API.get('/products', {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        search: searchTerm || null,
                        department: department !== 'All' ? department : null
                    }
                });
                setProducts(res.data.content || []);
                setTotalPages(res.data.totalPages || 0);
            } catch (err) {
                console.error("Archive connection failed:", err);
            } finally {
                setTimeout(() => setLoading(false), 300);
            }
        };
        loadProducts();
    }, [currentPage, searchTerm, department]);

    return (
        <div className="min-h-screen bg-[#F4F1EA] selection:bg-[#B3541E] selection:text-white">
            <Navbar />

            <div className="px-6 md:px-12 py-16 max-w-[1400px] mx-auto">
                {/* --- CENTERED BOUTIQUE HEADER --- */}
                <header className="flex flex-col items-center text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl text-[#2D2D2D] mb-6 tracking-tight">
                        {department === 'All' ? "The Archive" : `${department}'s Archive`}
                    </h1>

                    <div className="w-full max-w-md relative">
                        <input
                            type="text"
                            placeholder="SEARCH COLLECTION..."
                            className="w-full bg-white border border-[#E5E1DA] rounded-full px-6 py-3 text-[10px] tracking-[0.3em] outline-none focus:border-[#B3541E] transition-all uppercase font-bold text-[#2D2D2D] shadow-sm"
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
                        />
                    </div>
                </header>

                {/* --- BOUTIQUE FILTER BAR --- */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-[0.4em] mb-16">
                    {['All', 'Men', 'Women', 'Kids', 'Shoes', 'Accessories'].map((dept) => (
                        <button
                            key={dept}
                            onClick={() => { setDepartment(dept); setCurrentPage(0); }}
                            className={`transition-all duration-500 pb-2 border-b-2 ${
                                department === dept
                                ? 'border-[#B3541E] text-[#B3541E]'
                                : 'border-transparent opacity-40 hover:opacity-100 hover:text-[#2D2D2D]'
                            }`}
                        >
                            {dept}
                        </button>
                    ))}
                </div>

                {/* --- BOUTIQUE GRID --- */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="h-96 flex items-center justify-center italic font-serif text-xl opacity-20">Accessing Vault...</div>
                    ) : (
                        <motion.div
                            key="grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={cardVariants}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="group cursor-pointer bg-white border border-[#E5E1DA] rounded-sm overflow-hidden flex flex-col h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-500"
                                >
                                    {/* 1. IMAGE AREA */}
                                    <div className="aspect-square w-full bg-white p-8 relative flex items-center justify-center overflow-hidden">
                                        <img
                                            src={product.image_url || product.imageUrl}
                                            alt={product.title}
                                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => { e.target.src = "/landing page.png"; }}
                                        />
                                        <span className="absolute top-4 left-4 text-[8px] font-bold uppercase tracking-widest text-[#B3541E] bg-[#F4F1EA]/80 px-2 py-1 rounded-sm">
                                            {product.department}
                                        </span>
                                    </div>

                                    {/* 2. BOUTIQUE INFO FOOTER */}
                                    <div className="bg-[#FAF9F6] p-6 text-center border-t border-[#E5E1DA] flex-1 flex flex-col justify-center">
                                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-30 font-bold block mb-2">
                                            Ref. {product.id.toString().padStart(3, '0')}
                                        </span>

                                        <h3 className="font-serif text-lg text-[#2D2D2D] mb-3 group-hover:text-[#B3541E] transition-colors leading-tight">
                                            {product.title}
                                        </h3>

                                        <div className="text-[#B3541E] font-bold text-base tabular-nums">
                                            ₹{product.price?.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- PAGINATION --- */}
                <div className="mt-20 flex justify-center items-center gap-10">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[9px] uppercase tracking-[0.4em] font-bold disabled:opacity-10 hover:text-[#B3541E] transition-all"
                    >
                        Prev
                    </button>
                    <span className="font-serif italic opacity-40">{currentPage + 1} / {totalPages}</span>
                    <button
                        disabled={currentPage + 1 >= totalPages}
                        onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[9px] uppercase tracking-[0.4em] font-bold disabled:opacity-10 hover:text-[#B3541E] transition-all"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shop;