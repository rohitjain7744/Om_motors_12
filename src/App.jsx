import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🚀 EAGER IMPORTS
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// 📦 LAZY IMPORTS
const Hero = lazy(() => import("./components/Hero/Hero"));
const ShopCategory = lazy(() => import("./components/Shop/Shop"));
const Testimonials = lazy(() => import("./components/Testimonials/Testimonials"));
const Contact = lazy(() => import("./Page/Contact/Contact"));
const AboutSection = lazy(() => import("./components/AboutSection/About"));
const Category = lazy(() => import("./components/Category/Category"));

const Catalog = lazy(() => import("./Page/Catalog/Catalog"));
const Product = lazy(() => import("./Demo.jsx"));

// ✅ FIXED HERE
const Products = lazy(() => import("./components/Product/ProductPage.jsx"));

const Cart = lazy(() => import("./Page/Cart/Cart.jsx"));
const KnowUs = lazy(() => import("./Page/KnowUs/KnowUs.jsx"));

// 🏠 HOME PAGE
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
const getInitialCart = () => {
  try {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error);
    return [];
  }
};

// 🌀 LOADING SPINNER
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    <h3>Loading...</h3>
  </div>
);

export default function App() {
  const [cart, setCart] = useState(getInitialCart);

  // 💾 SAVE CART
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  // ➕ ADD TO CART
  const addToCart = useCallback((updateFn) => {
    setCart((prevCart) => updateFn(prevCart));
  }, []);

  // 🔢 CART COUNT
  const cartCount = cart.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <main style={{ minHeight: "80vh" }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<KnowUs />} />
            <Route path="/contact" element={<Contact />} />

            <Route
              path="/products"
              element={
                <Products cart={cart} addToCart={addToCart} />
              }
            />

            <Route
              path="/products/:category"
              element={
                <Products cart={cart} addToCart={addToCart} />
              }
            />

            <Route
              path="/product/:id"
              element={<Product addToCart={addToCart} />}
            />

            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />

            <Route path="/catalog" element={<Catalog />} />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div
                  style={{
                    textAlign: "center",
                    padding: "100px 20px",
                  }}
                >
                  <h2>404 - Page Not Found</h2>
                  <p>
                    The page you are looking for does not exist.
                  </p>
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