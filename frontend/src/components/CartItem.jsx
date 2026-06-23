import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/CartItem.css";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        className="cart-item-img"
        onClick={() => navigate(`/product/${item.id}`)}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/120x120?text=No+Image";
        }}
      />

      <div className="cart-item-info">
        <span
          className="cart-item-title"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.title}
        </span>
        <p className="cart-item-stock">In Stock</p>

        <div className="cart-item-actions">
          <div className="qty-controls">
            <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
            <span className="qty-num">{item.quantity}</span>
            <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
          </div>
          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="cart-item-price">
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}