import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Size State: Default to Medium
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Artifact missing", err);
            } finally {
                setTimeout(() => setLoading(false), 400);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center italic opacity-40 uppercase text-[10px] tracking-widest">
            Identifying artifact...
        </div>
    );

    if (!product) return (
        <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center italic opacity-40 uppercase text-[10px] tracking-widest">
            Artifact not found.
        </div>
    );

    // PROPER FIX: Use the underscore property from your database & JSON
    const displayImage = product.image_url || product.imageUrl || "/landing page.png";

    return (
        <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white">
            <Navbar />

            <main className="flex flex-col lg:flex-row min-h-[calc(100vh-104px)]">
                {/* LEFT: IMAGE AREA */}
                <div className="lg:w-3/5 h-[70vh] lg:h-auto overflow-hidden bg-[#EFEEEA] relative group">
                    <img
                        src={displayImage}
                        alt={product.title}
                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-[2000ms] ease-out"
                        onError={(e) => { e.target.src = "/landing page.png"; }}
                    />
                    {/* Archival Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-40 pointer-events-none" />
                </div>

                {/* RIGHT: CONTENT AREA */}
                <div className="lg:w-2/5 px-8 py-16 lg:px-24 lg:py-32 flex flex-col justify-center bg-[#F9F7F2]">
                    <button
                        onClick={() => navigate('/shop')}
                        className="text-[10px] uppercase tracking-[0.5em] opacity-30 mb-20 hover:opacity-100 transition-opacity w-fit cursor-pointer border-b border-transparent hover:border-black/20 pb-1"
                    >
                        ← Back to Gallery
                    </button>

                    <div className="max-w-md">
                        <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 block mb-6 font-bold">
                            Archive Artifact — No. 00{product.id}
                        </span>

                        <h1 className="font-serif text-7xl lg:text-8xl italic leading-[1.1] mb-12 text-[#1A1A1A] tracking-tighter">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-8 mb-16">
                            {/* PROPER FIX: RUPEE PRICING */}
                            <span className="text-4xl font-normal tabular-nums text-[#1A1A1A]">
                                ₹{product.price?.toLocaleString('en-IN')}
                            </span>
                            <span className="h-[1px] w-12 bg-black/10"></span>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">
                                {product.stock > 0 ? `Inventory: ${product.stock}` : "Out of Archive"}
                            </span>
                        </div>

                        <p className="text-[11px] uppercase tracking-[0.2em] leading-[2.2] opacity-60 mb-20 border-l-2 border-black/5 pl-8 font-medium">
                            {product.description || "A meticulously crafted artifact from the IRA heritage collection, emphasizing raw texture and minimal architecture."}
                        </p>

                        {/* SIZE SELECTION */}
                        <div className="mb-16">
                            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-6 font-bold">Select Size</span>
                            <div className="flex gap-4">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 text-[10px] border transition-all duration-500 font-bold cursor-pointer ${
                                            selectedSize === size
                                            ? 'border-black bg-black text-white shadow-xl'
                                            : 'border-black/10 hover:border-black text-black/60'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="space-y-6">
                            <button
                                onClick={() => addToCart(product, selectedSize)}
                                className="w-full bg-[#1A1A1A] text-white py-7 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-black transition-all cursor-pointer shadow-2xl active:scale-[0.99]"
                            >
                                Add to Bag — Artifact No. 00{product.id}
                            </button>

                            <button className="w-full border border-black/10 text-[#1A1A1A] py-7 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:border-black transition-all cursor-pointer">
                                Add to Wishlist
                            </button>
                        </div>

                        <div className="mt-24 pt-10 border-t border-black/5 flex justify-between items-center opacity-20">
                            <span className="text-[8px] uppercase tracking-[0.5em] font-bold">Heritage Craft</span>
                            <span className="text-[8px] uppercase tracking-[0.5em] font-bold">Sustainably Sourced</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;