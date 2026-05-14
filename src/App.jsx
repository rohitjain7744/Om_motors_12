import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🚀 EAGER IMPORTS
// Core layout components that must render instantly (above the fold)
import Navbar from "./components/Navbar/Navbar"; // Adjusted to lowercase 'components'
import Footer from "./components/Footer/Footer";

// 📦 LAZY IMPORTS (Code Splitting)
// These are only downloaded when the user visits their specific route.
// This reduces your initial JavaScript bundle size significantly.
const Hero = lazy(() => import("./components/Hero/Hero"));
const ShopCategory = lazy(() => import("./components/Shop/Shop"));
const Testimonials = lazy(() => import("./components/Testimonials/Testimonials"));
const Contact = lazy(() => import("./Page/Contact/Contact"));
const AboutSection = lazy(() => import("./components/AboutSection/About"));
const Category = lazy(() => import("./components/Category/Category"));

const Catalog = lazy(() => import("./Page/Catalog/Catalog"));
const Product = lazy(() => import("./Page/Product/product")); 
const Products = lazy(() => import("./Page/Product/product")); // Adjusted to match your file structure
const Cart = lazy(() => import("./Page/cart/cart"));
const KnowUs = lazy(() => import("./Page/KnowUs/KnowUs"));

// 🏠 HOME PAGE (Composed of lazy-loaded sections)
const Home = () => (
  <>
    <Hero />
    <AboutSection />
    <Category />
    <ShopCategory />
    <Testimonials />
    <Contact />
  </>
);

// 🛒 CART INITIALIZATION
// Safely parses localStorage to prevent app crashes on malformed data
const getInitialCart = () => {
  try {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error);
    return [];
  }
};

// 🌀 LOADING SPINNER (Fallback for Suspense)
const PageLoader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
    <h3>Loading...</h3> {/* Consider replacing with a CSS spinner/skeleton loader */}
  </div>
);

export default function App() {
  const [cart, setCart] = useState(getInitialCart);

  // 💾 SYNC CART TO LOCALSTORAGE
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // ➕ ADD TO CART HANDLER
  // Memoized to prevent unnecessary re-renders in deep child components
  const addToCart = useCallback((updateFn) => {
    setCart((prevCart) => updateFn(prevCart));
  }, []);

  // 🔢 CART COUNT CALCULATOR
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <BrowserRouter>
      {/* Navbar is outside Suspense so it always renders instantly */}
      <Navbar cartCount={cartCount} />

      {/* main tag improves accessibility and minHeight prevents footer from jumping up */}
      <main style={{ minHeight: "80vh" }}> 
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<KnowUs />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/products" element={<Products cart={cart} addToCart={addToCart} />} />
            <Route path="/products/:category" element={<Products cart={cart} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
            
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/catalog" element={<Catalog />} />

            {/* 404 PAGE */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: "center", padding: "100px 20px" }}>
                  <h2>404 - Page Not Found</h2>
                  <p>The page you are looking for does not exist or has been moved.</p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </BrowserRouter>
  );
}