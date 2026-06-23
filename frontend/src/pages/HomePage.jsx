import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/productService";
import "../styles/HomePage.css";

const CATEGORIES = ["All", "Electronics", "Clothing", "Kitchen", "Home", "Outdoor", "Toys", "Footwear"];

function SkeletonGrid() {
  return (
    <div className="loading-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton-body">
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroQuery, setHeroQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const urlSearch = params.get("search") || "";
  const urlCategory = params.get("category") || "";

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...products];
    const cat = urlCategory || activeCategory;
    if (cat && cat !== "All") {
      result = result.filter((p) => p.category === cat);
    }
    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
    if (urlCategory) setActiveCategory(urlCategory);
  }, [products, urlSearch, urlCategory, activeCategory]);

  function handleHeroSearch(e) {
    e.preventDefault();
    if (heroQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(heroQuery.trim())}`);
    } else {
      navigate("/");
    }
  }

  function handleCategory(cat) {
    setActiveCategory(cat);
    navigate(cat === "All" ? "/" : `/?category=${encodeURIComponent(cat)}`);
  }

  const heading = urlSearch
    ? `Results for "${urlSearch}"`
    : activeCategory !== "All"
    ? activeCategory
    : "Today's Deals";

  return (
    <div className="home-page">
      {!urlSearch && !urlCategory && (
        <div className="hero-banner">
          <h1>Welcome to <span>mini</span>Amazon</h1>
          <p>Find everything you need, delivered to your door.</p>
          <form className="hero-search" onSubmit={handleHeroSearch}>
            <input
              type="text"
              placeholder="Search products, brands, categories…"
              value={heroQuery}
              onChange={(e) => setHeroQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}

      <div className="home-content">
        <div className="category-chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat && !urlSearch ? "active" : ""}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="section-header">
          <h2>{heading}</h2>
          {filtered.length > 0 && (
            <span className="see-all">{filtered.length} products</span>
          )}
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}