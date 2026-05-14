import React from "react";
import "./KnowUs.css";
import  Hero from "../../assets/hero1.jpg";
import AboutSection from "../../components/AboutSection/About"; 

export default function KnowUs() {
  return (
    <div className="knowus">

      {/* HERO */}
      <section className="knowus-hero">
        <h1>About OM MOTORS</h1>
        <p>Empowering farmers with modern tools & smart solutions</p>
      </section>
<AboutSection/>
      {/* ABOUT */}
      <section className="knowus-about">
        <div className="text">
          <h2>Who We Are</h2>
          <p>
            OM MOTORS is a modern agricultural solutions platform delivering
            high-quality tools and innovations. We aim to simplify farming and
            increase productivity through smart technology and reliable equipment.
          </p>

          <div className="stats">
            <div>
              <h3>150+</h3>
              <p>Products</p>
            </div>
            <div>
              <h3>500+</h3>
              <p>Customers</p>
            </div>
            <div>
              <h3>5★</h3>
              <p>Rating</p>
            </div>
          </div>
        </div>

        <div className="image">
          <img src={Hero} alt="about" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="knowus-features">
        <div className="card">
          <h3>🌱 Innovation</h3>
          <p>Modern solutions for agriculture growth.</p>
        </div>

        <div className="card">
          <h3>🚜 Quality Tools</h3>
          <p>Durable, high-performance equipment.</p>
        </div>

        <div className="card">
          <h3>📦 Fast Delivery</h3>
          <p>Quick delivery across India.</p>
        </div>

        <div className="card">
          <h3>💬 Support</h3>
          <p>24/7 customer assistance.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="knowus-cta">
        <h2>Ready to grow with us?</h2>
        <p>Explore our premium tools and boost your productivity today.</p>
        <button>Explore Products</button>
      </section>

    </div>
  );
}