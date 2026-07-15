-- ============================================================
--  Mini Amazon — MySQL Database Schema
--  Run this file: mysql -u root -p miniamazon < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS miniamazon;
USE miniamazon;

-- ── 1. USERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(150)  NOT NULL UNIQUE,
    password   VARCHAR(255)  NOT NULL,  -- BCrypt hash
    role       ENUM('ROLE_USER','ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_USER',
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── 2. PRODUCTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)   NOT NULL,
    description TEXT           NOT NULL,
    price       DECIMAL(10,2)  NOT NULL,
    image_url   VARCHAR(500),
    category    VARCHAR(100)   NOT NULL,
    stock       INT            NOT NULL DEFAULT 100,
    rating      DECIMAL(2,1)   NOT NULL DEFAULT 4.0,
    reviews     INT            NOT NULL DEFAULT 0,
    created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── 3. CART ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cart (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT    NOT NULL UNIQUE,  -- one cart per user
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── 4. CART_ITEMS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cart_items (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id    BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity   INT    NOT NULL DEFAULT 1,
    CONSTRAINT fk_cartitem_cart    FOREIGN KEY (cart_id)    REFERENCES cart(id)     ON DELETE CASCADE,
    CONSTRAINT fk_cartitem_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT uq_cart_product UNIQUE (cart_id, product_id)
);

-- ── 5. ORDERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT          NOT NULL,
    total_price DECIMAL(10,2)   NOT NULL,
    status      ENUM('PROCESSING','SHIPPED','DELIVERED','CANCELLED')
                                NOT NULL DEFAULT 'PROCESSING',
    address     VARCHAR(500)    NOT NULL DEFAULT 'Default Address',
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ── 6. ORDER_ITEMS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
    id         BIGINT        AUTO_INCREMENT PRIMARY KEY,
    order_id   BIGINT        NOT NULL,
    product_id BIGINT        NOT NULL,
    quantity   INT           NOT NULL,
    price      DECIMAL(10,2) NOT NULL,  -- price at time of order
    CONSTRAINT fk_orderitem_order   FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
    CONSTRAINT fk_orderitem_product FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ── SEED DATA ──────────────────────────────────────────────
-- Admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@miniamazon.com',
 '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6', 'ROLE_ADMIN');

-- Sample products
INSERT INTO products (title, description, price, image_url, category, stock, rating, reviews) VALUES
('Apple AirPods Pro (2nd Gen)',
 'Active Noise Cancellation, Transparency Mode, Personalized Spatial Audio. Up to 6 hours listening time.',
 18999.00,
 'https://images.unsplash.com/photo-1606741965509-717f24714eca?w=400&q=80',
 'Electronics', 150, 4.8, 32847),

('Samsung 65" QLED 4K Smart TV',
 'Quantum Dot technology for vibrant colors. 4K UHD resolution with HDR10+. Built-in Alexa.',
 89700.00,
 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
 'Electronics', 40, 4.6, 15203),

('Nike Air Max 270 Running Shoes',
 'Engineered mesh upper for breathability. Max Air unit in the heel for all-day cushioning.',
 12999.00,
 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
 'Footwear', 200, 4.5, 8741),

('Instant Pot Duo 7-in-1 Pressure Cooker',
 '7-in-1 multi-use programmable cooker: pressure cooker, slow cooker, rice cooker, steamer.',
 6999.00,
 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80',
 'Kitchen', 300, 4.7, 98234),

('Sony WH-1000XM5 Wireless Headphones',
 'Industry-leading noise cancellation with 8 microphones. 30-hour battery life.',
 27990.00,
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
 'Electronics', 120, 4.9, 21567),

('Levi''s Men''s 501 Original Fit Jeans',
 'The original blue jean since 1873. Straight leg with a regular fit. 100% cotton denim.',
 5999.00,
 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
 'Clothing', 500, 4.4, 44321),

('Kindle Paperwhite 16 GB',
 '300 ppi glare-free display. Adjustable warm light. Waterproof IPX8. 10 weeks battery.',
 13999.00,
 'https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=400&q=80',
 'Electronics', 250, 4.7, 67890),

('Dyson V15 Detect Cordless Vacuum',
 'Laser reveals microscopic dust on hard floors. LCD screen. 60 minutes run time.',
 64990.00,
 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
 'Home', 60, 4.6, 9832),

('The North Face Thermoball Jacket',
 'Lightweight compressible insulation. Water repellent. Stuffs into its own pocket.',
 19999.00,
 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80',
 'Clothing', 180, 4.5, 12045),

('Ninja Foodi 9-in-1 Air Fryer',
 'Air fry, roast, broil, bake, dehydrate, and more. 5.5-quart ceramic nonstick basket.',
 11990.00,
 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80',
 'Kitchen', 220, 4.6, 34521),

('LEGO Technic Bugatti Chiron 42083',
 '1:8 scale model with 3599 pieces. Working 8-speed gearbox. Detailed W16 engine.',
 34999.00,
 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80',
 'Toys', 80, 4.9, 5234),

('Weber Spirit II E-310 Gas Grill',
 '3 stainless-steel burners. 529 sq in cooking area. Porcelain-enameled cast-iron grates.',
 49999.00,
 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
 'Outdoor', 35, 4.8, 7621);