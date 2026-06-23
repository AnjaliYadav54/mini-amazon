import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/CartPage.css";

export default function CartPage() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);

  function handleCheckout() {
    if (!user) { navigate("/login", { state: { from: "/cart" } }); return; }
    setOrdered(true);
    clearCart();
  }

  if (cartItems.length === 0 && !ordered) {
    return (
      <div className="cart-page">
        <div className="cart-container" style={{ gridTemplateColumns: "1fr" }}>
          <div className="cart-main">
            <h1>Shopping Cart</h1>
            <div className="cart-empty">
              <h2>Your Amazon Cart is empty</h2>
              <p>Shop today's deals</p>
              <button className="shop-btn" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-main">
          <h1>Shopping Cart</h1>
          {!ordered && (
            <p className="cart-price-header">Price</p>
          )}

          {ordered ? (
            <div className="checkout-success" style={{ padding: "40px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <h2 style={{ color: "#067D62", marginBottom: 8 }}>Order placed!</h2>
              <p style={{ marginBottom: 20 }}>Thank you for your order. You'll receive a confirmation shortly.</p>
              <button className="shop-btn" onClick={() => navigate("/orders")}>
                View Order History
              </button>
            </div>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}

          {!ordered && (
            <p style={{ textAlign: "right", fontSize: 18, fontWeight: 500, marginTop: 16 }}>
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):
              {" "}<strong style={{ color: "#0f1111" }}>₹{totalPrice.toFixed(2)}</strong>
            </p>
          )}
        </div>

        {!ordered && (
          <div className="cart-sidebar">
            <p className="cart-summary-total">
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):
              {" "}<strong>₹{totalPrice.toFixed(2)}</strong>
            </p>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear cart
            </button>

            <div className="cart-meta">
              🔒 Secure checkout
              <br />FREE Delivery on orders over ₹499
            </div>
          </div>
        )}
      </div>
    </div>
  );
}