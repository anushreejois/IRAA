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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } }
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white overflow-x-hidden">
            <Navbar />

            <div className="px-12 py-24">
                <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-4 font-bold">Edition No. 01 — 2026</span>
                        <h1 className="font-serif text-[10vw] md:text-9xl italic tracking-tighter leading-[0.8] text-[#1A1A1A]">The Gallery.</h1>
                    </motion.div>
                    <div className="w-full md:w-72">
                        <input type="text" placeholder="SEARCH ARCHIVE..." className="w-full bg-transparent border-b border-black/10 pb-3 text-[10px] tracking-[0.4em] outline-none focus:border-black transition-all uppercase font-bold" onChange={handleSearch} />
                    </div>
                </header>

                <div className="flex flex-wrap justify-between items-center mb-24 border-b border-black/5 pb-10 gap-6">
                    <div className="flex flex-wrap gap-x-12 gap-y-4 text-[10px] font-bold uppercase tracking-[0.5em]">
                        {['All', 'Men', 'Women', 'Kids', 'Shoes', 'Accessories'].map((dept) => (
                            <button key={dept} onClick={() => { setDepartment(dept); setCurrentPage(0); }} className={`transition-all duration-700 relative pb-2 ${department === dept ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}>
                                {dept}
                                {department === dept && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="flex justify-center items-center h-[50vh] italic font-serif text-2xl">Curating selection...</motion.div>
                    ) : (
                        <motion.div key="grid" variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32">
                            {products.map((product) => {
                                // FINAL FIX: Check both possible property names from your JSON
                                const displayImage = product.image_url || product.imageUrl || "/landing page.png";

                                return (
                                    <motion.div key={product.id} variants={cardVariants} onClick={() => navigate(`/product/${product.id}`)} className="group cursor-pointer">
                                        <div className="aspect-[3/4] w-full overflow-hidden bg-[#EFEEEA] relative mb-12 shadow-sm border border-black/5">
                                            <img
                                                src={displayImage}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
                                                onError={(e) => { e.target.src = "/landing page.png"; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-1000" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                                                <div className="bg-white/90 backdrop-blur-sm text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] shadow-2xl border border-black/5 translate-y-4 group-hover:translate-y-0 transition-transform">
                                                    View Artifact
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col border-b border-black/10 pb-10">
                                            <span className="text-[9px] uppercase tracking-[0.6em] text-black font-bold mb-4 opacity-40">{product.department} / Archival Edition</span>
                                            <div className="flex justify-between items-baseline gap-8">
                                                <h3 className="font-serif text-4xl italic leading-[1.1] text-[#1A1A1A] group-hover:opacity-50 transition-opacity duration-500 tracking-tighter">{product.title}</h3>
                                                <div className="text-xl font-normal tabular-nums text-[#1A1A1A] opacity-80 tracking-tighter">₹{product.price?.toLocaleString('en-IN')}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                <div className="mt-48 flex justify-center items-center gap-16 border-t border-black/5 pt-16">
                    <button disabled={currentPage === 0} onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[10px] uppercase tracking-[0.5em] font-bold disabled:opacity-5 hover:tracking-[0.8em] transition-all">← Previous</button>
                    <span className="font-serif italic opacity-30 text-lg">{currentPage + 1}<span className="mx-4 text-xs opacity-20 font-sans not-italic">/</span>{totalPages}</span>
                    <button disabled={currentPage + 1 >= totalPages} onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[10px] uppercase tracking-[0.5em] font-bold disabled:opacity-5 hover:tracking-[0.8em] transition-all">Next →</button>
                </div>
            </div>
        </div>
    );
};

export default Shop;