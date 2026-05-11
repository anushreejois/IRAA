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
        <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white">
            <Navbar />

            <div className="px-12 py-24">
                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-4 font-bold">EDITION NO. 01 — 2026</span>
                        <h1 className="font-serif text-8xl italic tracking-tighter leading-[0.8] text-[#1A1A1A]">The Gallery.</h1>
                    </div>
                    <div className="w-full md:w-72">
                        <input
                            type="text"
                            placeholder="SEARCH ARCHIVE..."
                            className="w-full bg-transparent border-b border-black/10 pb-3 text-[10px] tracking-[0.4em] outline-none focus:border-black transition-all uppercase font-bold"
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
                        />
                    </div>
                </header>

                {/* --- FILTER BAR --- */}
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-[10px] font-bold uppercase tracking-[0.5em] mb-24 border-b border-black/5 pb-10">
                    {['All', 'Men', 'Women', 'Kids', 'Shoes', 'Accessories'].map((dept) => (
                        <button
                            key={dept}
                            onClick={() => { setDepartment(dept); setCurrentPage(0); }}
                            className={`transition-all duration-700 relative pb-2 ${department === dept ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
                        >
                            {dept}
                            {department === dept && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />}
                        </button>
                    ))}
                </div>

                {/* --- GRID --- */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="h-96 flex items-center justify-center italic font-serif text-2xl opacity-20">Curating selection...</div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32"
                        >
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="group cursor-pointer"
                                >
                                    {/* IMAGE CONTAINER - The "Proper" fix is object-contain + p-10 */}
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#EFEEEA] relative mb-10 shadow-sm border border-black/5">
                                        <img
                                            src={product.image_url || product.imageUrl}
                                            alt={product.title}
                                            className="w-full h-full object-contain p-10 transition-transform duration-[2000ms] group-hover:scale-105"
                                            onError={(e) => { e.target.src = "/landing page.png"; }}
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-40 group-hover:opacity-0 transition-opacity" />
                                    </div>

                                    {/* INFO */}
                                    <div className="flex flex-col border-b border-black/10 pb-8">
                                        <span className="text-[9px] uppercase tracking-[0.6em] text-black font-bold mb-4 opacity-40">{product.department} / ARCHIVAL</span>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-serif text-3xl italic text-[#1A1A1A] tracking-tighter">{product.title}</h3>
                                            <div className="text-lg font-normal tabular-nums text-[#1A1A1A] opacity-80">₹{product.price?.toLocaleString('en-IN')}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Shop;