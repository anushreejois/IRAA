import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import CartDrawer from './components/CartDrawer.jsx';

function App() {
  return (
    <>
      {/* The CartDrawer sits here, outside the Routes.
        This allows it to be controlled globally and overlay
        any page without being unmounted during navigation.
      */}
      <CartDrawer />

      <Routes>
        {/* 1. Landing Page */}
        <Route path="/" element={<Home />} />

        {/* 2. Product Gallery */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* We keep these routes for direct access, but the Drawer will be the primary UX */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* 3. Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;