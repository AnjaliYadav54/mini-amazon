import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productService";
import "../styles/ProductDetailPage.css";

function StarRating({ rating }) {
  return (
    <span className="detail-stars">
      {[1,2,3,4,5].map((s) => (
        <span key={s}>{s <= Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const inCart = cartItems.some((item) => item.id === product?.id);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => { setProduct(data); setLoading(false); })
      .catch(() => { setError("Product not found."); setLoading(false); });
  }, [id]);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  if (loading) return <div className="detail-loading"><p>Loading product…</p></div>;
  if (error) return (
    <div className="detail-error">
      <h2>Product Not Found</h2>
      <p>{error}</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#007185" }}>Home</span>
          <span>›</span>
          <span onClick={() => navigate(`/?category=${product.category}`)} style={{ cursor: "pointer", color: "#007185" }}>
            {product.category}
          </span>
          <span>›</span>
          <span style={{ color: "#555" }}>{product.title.substring(0, 40)}…</span>
        </div>

        <div className="detail-layout">
          {/* Image */}
          <div className="detail-image-wrap">
            <img
              src={product.image}
              alt={product.title}
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image"; }}
            />
          </div>

          {/* Info */}
          <div className="detail-info">
            <p className="detail-category">{product.category}</p>
            <h1 className="detail-title">{product.title}</h1>

            <div className="detail-rating">
              <StarRating rating={product.rating} />
              <span className="detail-rating-num">{product.rating}</span>
              <span className="detail-reviews">{product.reviews.toLocaleString()} ratings</span>
            </div>

            <div className="detail-price-wrap">
              <p className="detail-price-label">Price:</p>
              <p className="detail-price">
                <span className="currency">₹</span>
                {product.price.toFixed(2)}
              </p>
            </div>

            <p className="detail-desc-head">About this item</p>
            <p className="detail-desc">{product.description}</p>
          </div>

          {/* Buy Box */}
          <div className="detail-buy-box">
            <p className="buy-box-price">₹{product.price.toFixed(2)}</p>
            <p className="buy-box-delivery">✓ FREE Delivery by Tomorrow</p>
            <p className="buy-box-stock">In Stock</p>

            <div className="qty-select-row">
              <label>Qty:</label>
              <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                {[1,2,3,4,5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <button
              className={`buy-btn add-cart-btn ${inCart || justAdded ? "in-cart" : ""}`}
              onClick={handleAddToCart}
            >
              {justAdded ? "✓ Added to Cart!" : inCart ? "✓ In Your Cart" : "Add to Cart"}
            </button>

            <button
              className="buy-btn buy-now-btn"
              onClick={() => { addToCart(product); navigate("/cart"); }}
            >
              Buy Now
            </button>

            <div style={{ marginTop: 14, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
              <p>🔒 Secure transaction</p>
              <p>Ships from: <strong>miniAmazon</strong></p>
              <p>Sold by: <strong>miniAmazon</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}