import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockOrders } from "../data/mockData";
import "../styles/OrderHistoryPage.css";

function statusClass(status) {
  return {
    Delivered: "status-delivered",
    Shipped: "status-shipped",
    Processing: "status-processing",
    Cancelled: "status-cancelled",
  }[status] || "status-processing";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-empty">
            <h2>Please sign in to view your orders</h2>
            <button className="shop-btn" style={{ background: "#FFD814", border: "1px solid #FFA41C", borderRadius: 20, padding: "10px 24px", cursor: "pointer", fontSize: 14 }} onClick={() => navigate("/login")}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>Your Orders</h1>

        {mockOrders.length === 0 ? (
          <div className="orders-empty">
            <h2>You haven't placed any orders yet</h2>
            <p>Start shopping to see your orders here.</p>
            <button className="shop-btn" style={{ background: "#FFD814", border: "1px solid #FFA41C", borderRadius: 20, padding: "10px 24px", cursor: "pointer", fontSize: 14 }} onClick={() => navigate("/")}>
              Shop Now
            </button>
          </div>
        ) : (
          mockOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-header-col">
                  <span className="order-header-label">Order placed</span>
                  <span className="order-header-value">{formatDate(order.date)}</span>
                </div>
                <div className="order-header-col">
                  <span className="order-header-label">Total</span>
                  <span className="order-header-value">₹{order.total.toFixed(2)}</span>
                </div>
                <div className="order-header-col">
                  <span className="order-header-label">Ship to</span>
                  <span className="order-header-value">{user.name}</span>
                </div>
                <div className="order-id">
                  <span className="order-header-label">Order ID</span>
                  <br />
                  <span style={{ color: "#007185", fontSize: 13 }}>{order.id}</span>
                </div>
              </div>

              <div className="order-card-body">
                <div className={`order-status-badge ${statusClass(order.status)}`}>
                  {order.status === "Delivered" ? "✓ " : ""}
                  {order.status}
                </div>

                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <span className="order-item-name">{item.title}</span>
                    <span className="order-item-qty">Qty: {item.qty}</span>
                    <span className="order-item-price">₹{item.price.toFixed(2)}</span>
                  </div>
                ))}

                <div className="order-total-row">
                  <span>Order total:</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}