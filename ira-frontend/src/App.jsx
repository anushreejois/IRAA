import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';   // Added .jsx explicitly
import Shop from './pages/Shop.jsx';   // Added .jsx explicitly
import Login from './pages/Login.jsx'; // Added .jsx explicitly
import Signup from './pages/Signup.jsx'; // Added .jsx explicitly
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
function App() {
  return (
    <Routes>
      {/* 1. Landing Page */}
      <Route path="/" element={<Home />} />

      {/* 2. Product Gallery */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} /> {/* New Route */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* 3. Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;