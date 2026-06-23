import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

function StarRating({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s}>{s <= Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = cartItems.some((item) => item.id === product.id);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-card-img-wrap">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
      </div>
      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <p className="product-card-title">{product.title}</p>
        <div className="product-card-rating">
          <StarRating rating={product.rating} />
          <span className="review-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="product-card-footer">
          <p className="product-card-price">
            <span>₹</span>{product.price.toFixed(2)}
          </p>
          <button
            className={`add-to-cart-btn ${justAdded || inCart ? "added-btn" : ""}`}
            onClick={handleAddToCart}
          >
            {justAdded ? "✓ Added!" : inCart ? "In Cart" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}