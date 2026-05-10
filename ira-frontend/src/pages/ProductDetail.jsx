import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
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
        fetchProductById(id)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Artifact missing", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center italic opacity-40 uppercase text-[10px] tracking-widest">Identifying artifact...</div>;
    if (!product) return <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center italic opacity-40 uppercase text-[10px] tracking-widest">Artifact not found.</div>;

    return (
        <div className="min-h-screen bg-[#F9F7F2]">
            <Navbar />

            <main className="flex flex-col lg:flex-row min-h-[calc(100vh-104px)]">
                {/* LEFT: IMAGE AREA */}
                <div className="lg:w-3/5 h-[60vh] lg:h-auto overflow-hidden bg-[#F3F2EE]">
                    <img
                        src={product.imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"}
                        alt={product.title}
                        className="w-full h-full object-cover grayscale-[10%]"
                    />
                </div>

                {/* RIGHT: CONTENT AREA */}
                <div className="lg:w-2/5 px-8 py-12 lg:px-20 lg:py-24 flex flex-col justify-center">
                    <button
                        onClick={() => navigate('/shop')}
                        className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-16 hover:opacity-100 transition-opacity w-fit cursor-pointer"
                    >
                        ← Back to Gallery
                    </button>

                    <div className="max-w-md">
                        <span className="text-[10px] uppercase tracking-[0.5em] opacity-50 block mb-6 font-bold">
                            Archive Artifact — No. 00{product.id}
                        </span>

                        <h1 className="font-serif text-6xl italic leading-none mb-10 text-[#1A1A1A]">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-6 mb-12">
                            <span className="text-3xl font-light tabular-nums text-[#1A1A1A]">${product.price}</span>
                            <span className="h-[1px] w-8 bg-black/20"></span>
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40">
                                {product.stock > 0 ? `Inventory: ${product.stock}` : "Currently Unavailable"}
                            </span>
                        </div>

                        <p className="text-xs uppercase tracking-[0.2em] leading-loose opacity-60 mb-16 border-l border-black/10 pl-6">
                            {product.description || "A meticulously crafted artifact from the IRA heritage collection, emphasizing raw texture and minimal architecture."}
                        </p>

                        {/* SIZE SELECTION */}
                        <div className="mb-12">
                            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-5 font-bold">Select Size</span>
                            <div className="flex gap-3">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 text-[10px] border transition-all duration-300 font-bold cursor-pointer ${
                                            selectedSize === size
                                            ? 'border-black bg-black text-white'
                                            : 'border-black/10 hover:border-black/40 text-black/60'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="space-y-4">
                            <button
                                onClick={() => addToCart(product, selectedSize)}
                                className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all cursor-pointer active:scale-[0.98]"
                            >
                                Add to Bag — Size {selectedSize}
                            </button>

                            <button className="w-full border border-black/20 text-[#1A1A1A] py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all cursor-pointer">
                                Wishlist
                            </button>
                        </div>

                        <div className="mt-20 pt-8 border-t border-black/5 flex justify-between items-center opacity-30">
                            <span className="text-[8px] uppercase tracking-[0.4em]">Heritage Craft</span>
                            <span className="text-[8px] uppercase tracking-[0.4em]">Sustainably Sourced</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;