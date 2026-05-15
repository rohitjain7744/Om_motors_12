import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";

import v1 from "../../assets/hero1.jpg";
import v2 from "../../assets/hero2.jpg";
import v3 from "../../assets/hero3.jpg";

const slides = [
  {
    video: v1,
    tag: "Precision Farming",
    title: "Grow Smarter,",
    titleAccent: "Farm Greener",
    subtitle: "Smart agriculture with advanced machinery and AI-powered field intelligence.",
  },
  {
    video: v2,
    tag: "Efficient Harvest",
    title: "Maximize Yield,",
    titleAccent: "Minimize Waste",
    subtitle: "Maximize yield with modern technology and data-driven harvest strategies.",
  },
  {
    video: v3,
    tag: "Future of Agriculture",
    title: "Sustainable &",
    titleAccent: "Data-Driven",
    subtitle: "Sustainable and data-driven farming for the next generation of agriculture.",
  },
];

const chips = [
  { icon: "🌱", value: "98.4%", label: "Organic Yield", top: "18%", left: "2%" },
  { icon: "💧", value: "−42%", label: "Water Usage",   top: "62%", left: "1%" },
  { icon: "🛰️", value: "14K+", label: "Acres Live",    top: "18%", right: "2%" },
  { icon: "🌍", value: "Net 0", label: "Carbon",        top: "62%", right: "2%" },
];

export default function Hero() {
  const [index, setIndex]         = useState(0);
  const [animating, setAnimating] = useState(false);
  const [tilt, setTilt]           = useState({ x: 0, y: 0 });
  const sectionRef                = useRef(null);
  const timerRef                  = useRef(null);

  const advance = (next) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex(next);
      setAnimating(false);
    }, 500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((p) => {
        const next = (p + 1) % slides.length;
        advance(next);
        return p;
      });
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    advance(i);
  };

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const x    = ((e.clientY - cy) / (rect.height / 2)) * 6;
    const y    = ((e.clientX - cx) / (rect.width  / 2)) * 6;
    setTilt({ x: -x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const current = slides[index];

  return (
    <section
      className="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background video ── */}
      <div className={`video-wrapper ${animating ? "fade-out" : "fade-in"}`}>
        <video
          key={current.video}
          autoPlay
          muted
          loop
          playsInline
          className="bg-video"
        >
          <source src={current.video} type="video/mp4" />
        </video>
      </div>

      {/* ── Layered overlays ── */}
      <div className="overlay overlay-dark"   />
      <div className="overlay overlay-vignette" />
      <div className="overlay overlay-tint"   />

      {/* ── 3D scene wrapper (mouse-tilt) ── */}
      <div
        className="scene"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* Floating stat chips */}
        {chips.map((c, i) => (
          <div
            key={i}
            className="chip"
            style={{
              top:   c.top,
              left:  c.left   ?? "auto",
              right: c.right  ?? "auto",
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <div className="chip-icon">{c.icon}</div>
            <div>
              <div className="chip-val">{c.value}</div>
              <div className="chip-lbl">{c.label}</div>
            </div>
          </div>
        ))}

        {/* ── Hero content ── */}
        <div className={`hero-content ${animating ? "content-out" : "content-in"}`}>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {current.tag}
          </span>

          <h1 className="hero-title">
            {current.title}
            <br />
            <span className="title-accent">{current.titleAccent}</span>
          </h1>

          <p className="hero-sub">{current.subtitle}</p>

          <div className="hero-actions">
            <button className="btn-primary" href="/catalog">
              Book Harvester
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-ghost" href="/products">
              Our Product
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "dot-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll cue ── */}
      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}