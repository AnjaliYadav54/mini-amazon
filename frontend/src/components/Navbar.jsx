import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

const CATEGORIES = ["Electronics", "Clothing", "Kitchen", "Home", "Outdoor", "Toys", "Footwear"];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/");
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">mini<span>Amazon</span></span>
          <span className="logo-sub">.in</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            🔍
          </button>
        </form>

        <div className="navbar-actions">
          {user ? (
            <>
              <button className="nav-btn" onClick={() => navigate("/orders")}>
                <span className="nav-btn-top">Returns &amp;</span>
                <span className="nav-btn-bottom">Orders</span>
              </button>
              <button className="nav-btn" onClick={handleLogout}>
                <span className="nav-btn-top">Hello, {user.name.split(" ")[0]}</span>
                <span className="nav-btn-bottom">Sign Out</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              <span style={{ fontSize: 11, color: "#ccc", display: "block" }}>Hello, sign in</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Account</span>
            </Link>
          )}

          <Link to="/cart" className="cart-link">
            <span className="cart-icon-wrap">
              <span className="cart-icon">🛒</span>
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </span>
            <span className="cart-label">Cart</span>
          </Link>
        </div>
      </div>

      <div className="navbar-bottom">
        <div className="navbar-bottom-inner">
          <Link to="/" className="nav-cat">☰ All</Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${encodeURIComponent(cat)}`}
              className="nav-cat"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}