import React from "react";
import "./cart.css";

export default function Cart({ cart = [], setCart }) {

  // ➕➖ Quantity change
  const updateQty = (id, change) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, (item.qty || 1) + change);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // ❌ Remove item
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 💰 Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // 💬 WhatsApp checkout (FIXED ENCODING)
  const handleWhatsApp = () => {
    if (cart.length === 0) return;

    let message = "🛒 New Order\n\n";

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} x ${item.qty} = ₹${
        item.price * item.qty
      }\n`;
    });

    message += `\n💰 Total: ₹${total}`;

    const url = `https://wa.me/917744919256?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cart-page">

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>🛒 Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => {
              const qty = item.qty || 1;
              const subtotal = item.price * qty;

              return (
                <div className="cart-item" key={item.id}>

                  <img src={item.image} alt={item.name} />

                  <div className="info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                    <div className="qty">
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>

                  <div className="right">
                    <p>₹{subtotal}</p>
                    <button onClick={() => removeItem(item.id)}>❌</button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* 💰 Total Section */}
          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>

            <button className="checkout" onClick={handleWhatsApp}>
              Order on WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}