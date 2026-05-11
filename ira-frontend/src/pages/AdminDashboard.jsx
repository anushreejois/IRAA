import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Expanded state to include Category and Stock properly
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        imageUrl: '',
        stock: 10,
        category: { id: 1 } // Default category
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [prodRes, catRes] = await Promise.all([
                API.get('/products?size=100'),
                API.get('/categories')
            ]);
            setProducts(prodRes.data.content || []);
            setCategories(catRes.data || []);
        } catch (err) {
            console.error("Management fetch failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await API.post('/admin/products', newProduct);
            alert("Artifact successfully published to the archive.");
            // Reset form
            setNewProduct({ title: '', price: '', imageUrl: '', stock: 10, category: { id: 1 } });
            fetchInitialData();
        } catch (err) {
            alert("Unauthorized: Curator access required.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this artifact?")) {
            try {
                await API.delete(`/admin/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert("Error removing artifact.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] p-10 md:p-20 font-sans selection:bg-black selection:text-white">
            <header className="mb-16 border-b border-black/10 pb-10">
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold block mb-4">Internal System</span>
                <h1 className="text-6xl font-serif italic text-[#1A1A1A]">Curator's Desk.</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                {/* SECTION: ADD NEW ARTIFACT */}
                <div className="lg:col-span-4 bg-white p-10 border border-black/5 shadow-sm h-fit sticky top-10">
                    <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 opacity-40">Entry Form</h2>
                    <form onSubmit={handleAddProduct} className="space-y-8">
                        <div>
                            <label className="text-[9px] uppercase tracking-widest opacity-40 block mb-2">Title</label>
                            <input required type="text" className="w-full border-b border-black/10 py-2 outline-none focus:border-black transition-colors bg-transparent"
                                value={newProduct.title}
                                onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-[9px] uppercase tracking-widest opacity-40 block mb-2">Price ($)</label>
                                <input required type="number" className="w-full border-b border-black/10 py-2 outline-none focus:border-black transition-colors bg-transparent"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[9px] uppercase tracking-widest opacity-40 block mb-2">Stock</label>
                                <input required type="number" className="w-full border-b border-black/10 py-2 outline-none focus:border-black transition-colors bg-transparent"
                                    value={newProduct.stock}
                                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] uppercase tracking-widest opacity-40 block mb-2">Category</label>
                            <select
                                className="w-full border-b border-black/10 py-2 outline-none bg-transparent text-xs uppercase tracking-widest"
                                onChange={e => setNewProduct({...newProduct, category: { id: e.target.value }})}
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-[9px] uppercase tracking-widest opacity-40 block mb-2">Image URL</label>
                            <input required type="text" className="w-full border-b border-black/10 py-2 outline-none focus:border-black transition-colors bg-transparent"
                                value={newProduct.imageUrl}
                                onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
                        </div>

                        <button className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all">
                            Publish to Archive
                        </button>
                    </form>
                </div>

                {/* SECTION: INVENTORY TABLE */}
                <div className="lg:col-span-8">
                    <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 opacity-40">Live Inventory</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[9px] uppercase tracking-widest opacity-40 border-b border-black/10">
                                    <th className="pb-6">ID</th>
                                    <th className="pb-6">Artifact Name</th>
                                    <th className="pb-6">Price</th>
                                    <th className="pb-6">Stock</th>
                                    <th className="pb-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px] font-medium">
                                {products.map(p => (
                                    <tr key={p.id} className="border-b border-black/5 group hover:bg-black/5 transition-colors">
                                        <td className="py-6 opacity-30 tabular-nums">#00{p.id}</td>
                                        <td className="py-6 font-serif italic text-lg">{p.title}</td>
                                        <td className="py-6 opacity-60 tabular-nums">${p.price}</td>
                                        <td className="py-6 opacity-60 tabular-nums">{p.stock}</td>
                                        <td className="py-6 text-right">
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="text-[9px] uppercase tracking-widest text-red-400 hover:text-red-600 font-bold transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;