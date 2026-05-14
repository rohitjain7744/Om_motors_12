import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Contact.css";

const CONTACT_INFO = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Visit Us",
    value: "“Chhatrapati Sambhajinagar to Ahilyanagar Main Highway,",
    sub: "Trimurti HighSchool Near, Nevasa Phata 414603",
    link: "https://maps.google.com/?q=Nashik+Maharashtra",
    linkLabel: "Get directions →",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.78 16z"/>
      </svg>
    ),
    label: "Call Us",
    value: "+91123456789",
    sub: "Mon – Sat, 9 AM – 6 PM",
    link: "tel:+919876543210",
    linkLabel: "Call now →",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email Us",
    value: "ommotors1771@gmail.com",
    sub: "We reply within 24 hours",
    link: "mailto:ommotors1771@gmail.com",
    
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: "Business Hours",
    value: "Mon – Sat: 9:00 AM – 6:00 PM",
    sub: "Sunday: Closed",
    link: null,
  },
];

const SUBJECTS = [
  "Product Inquiry",
  "Bulk / Wholesale Order",
  "Technical Support",
  "Delivery & Shipping",
  "Partnership",
  "Other",
];

const INITIAL = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactUs({ cart = [] }) {
  const [form,    setForm]    = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState("idle"); // idle | sending | sent | error
  const formRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject)        e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Message too short";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");
    /* Simulate async send */
    setTimeout(() => {
      setStatus("sent");
      setForm(INITIAL);
      setErrors({});
    }, 1600);
  };

  const reset = () => setStatus("idle");

  return (
    <>
      

      <div className="contact-root">

        {/* ══ HERO BAND ══ */}
        <section className="contact-hero">
          <div className="contact-hero-bg" aria-hidden="true">
            <div className="chb-circle chb-1" />
            <div className="chb-circle chb-2" />
            <div className="chb-grid"        />
          </div>
          <div className="contact-hero-inner">
            <span className="contact-eyebrow">
              <span className="eyebrow-dot" />
              Get In Touch
            </span>
            <h1 className="contact-hero-title">
              Let's Grow<br />
              <em>Together</em>
            </h1>
            <p className="contact-hero-desc">
              Have a question about our products, need bulk pricing, or want to
              partner with Om Motors? Our team is ready to help you cultivate success.
            </p>
          </div>
        </section>

        {/* ══ INFO CARDS ══ */}
        <section className="contact-info-band">
          <div className="contact-info-grid">
            {CONTACT_INFO.map((c, i) => (
              <div className="cinfo-card" key={c.label} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="cinfo-icon">{c.icon}</div>
                <div className="cinfo-label">{c.label}</div>
                <div className="cinfo-value">{c.value}</div>
                <div className="cinfo-sub">{c.sub}</div>
              
              </div>
            ))}
          </div>
        </section>

        {/* ══ FORM + MAP ══ */}
        <section className="contact-body">
          <div className="contact-body-inner">

            {/* ── Form panel ── */}
            <div className="contact-form-panel">
              <div className="cfp-header">
                <h2 className="cfp-title">Send us a message</h2>
                <p  className="cfp-sub">Fill in the form and we'll get back to you within 24 hours.</p>
              </div>

              {status === "sent" ? (
                <div className="form-success">
                  <div className="success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will contact you shortly.</p>
                  <button className="btn-primary" onClick={reset}>Send Another</button>
                </div>
              ) : (
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>

                  {/* Row 1 */}
                  <div className="form-row">
                    <div className={`form-field ${errors.name ? "has-error" : ""}`}>
                      <label className="form-label" htmlFor="name">Full Name <span className="req">*</span></label>
                      <input
                        id="name" name="name" type="text"
                        className="form-input"
                        placeholder="Rajesh Kumar"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className={`form-field ${errors.email ? "has-error" : ""}`}>
                      <label className="form-label" htmlFor="email">Email Address <span className="req">*</span></label>
                      <input
                        id="email" name="email" type="email"
                        className="form-input"
                        placeholder="rajesh@example.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label" htmlFor="phone">Phone Number</label>
                      <input
                        id="phone" name="phone" type="tel"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>

                    <div className={`form-field ${errors.subject ? "has-error" : ""}`}>
                      <label className="form-label" htmlFor="subject">Subject <span className="req">*</span></label>
                      <div className="select-wrap">
                        <select
                          id="subject" name="subject"
                          className="form-select"
                          value={form.subject}
                          onChange={handleChange}
                        >
                          <option value="">Select a subject…</option>
                          {SUBJECTS.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <svg className="select-chevron" width="14" height="14" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                      {errors.subject && <span className="form-error">{errors.subject}</span>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`form-field ${errors.message ? "has-error" : ""}`}>
                    <label className="form-label" htmlFor="message">
                      Message <span className="req">*</span>
                      <span className="char-count">{form.message.length} / 500</span>
                    </label>
                    <textarea
                      id="message" name="message"
                      className="form-textarea"
                      placeholder="Tell us about your requirement, product query, or anything else…"
                      rows={5}
                      maxLength={500}
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className={`btn-primary btn-submit ${status === "sending" ? "btn-sending" : ""}`}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <><span className="spinner" /> Sending…</>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Map / Side panel ── */}
            <div className="contact-side">

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Om%20Motors%2C%20I%27m%20interested%20in%20your%20products."
                target="_blank" rel="noopener noreferrer"
                className="whatsapp-card"
              >
                <div className="wa-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.107.547 4.085 1.504 5.808L.057 23.97l6.306-1.504A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.511-5.165-1.399l-.371-.22-3.741.892.923-3.638-.242-.383A9.966 9.966 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </div>
                <div className="wa-text">
                  <div className="wa-title">Chat on WhatsApp</div>
                  <div className="wa-sub">Fastest response — usually within minutes</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="wa-arrow">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              {/* Map embed */}
              <div className="map-wrap">
                <div className="map-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Om Motors, Nashik
                </div>
                <iframe
                  title="Om Motors Location"
                  className="map-iframe"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60283.844!2d73.7898!3d20.0063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddc1e375e7b40f%3A0x68e8c5d8f1c5e7a!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                />
              </div>

              {/* Social links */}
              <div className="social-row">
                <span className="social-label">Follow us</span>
                {[
                  { name: "Facebook", href: "#", icon: "f" },
                  { name: "Instagram", href: "#", icon: "in" },
                  { name: "YouTube", href: "#", icon: "yt" },
                  { name: "LinkedIn", href: "#", icon: "li" },
                ].map(s => (
                  <a key={s.name} href={s.href} className="social-btn" title={s.name}
                    target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ FAQ STRIP ══ */}
        <section className="contact-faq">
          <div className="faq-inner">
            <h2 className="faq-title">Quick Answers</h2>
            <div className="faq-grid">
              {[
                { q: "Do you offer bulk pricing?", a: "Yes — for orders above ₹50,000 we offer tiered discounts. Reach out via the form or WhatsApp with your requirement." },
                { q: "What is your delivery timeline?", a: "Standard delivery is 3–7 business days across Maharashtra. Express same-day delivery available in Nashik city." },
                { q: "Can I visit your showroom?", a: "Absolutely. Our showroom is open Mon–Sat 9 AM to 6 PM at MIDC, Nashik. No appointment needed." },
                { q: "Do you provide after-sale service?", a: "Yes. All power tools and machinery come with a 1-year service warranty and free first service visit." },
              ].map(({ q, a }) => (
                <div className="faq-card" key={q}>
                  <div className="faq-q">
                    <span className="faq-dot" />
                    {q}
                  </div>
                  <div className="faq-a">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}