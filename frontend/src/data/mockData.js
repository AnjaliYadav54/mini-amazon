export const mockProducts = [
  {
    id: 1,
    title: "Apple AirPods Pro (2nd Generation)",
    description:
      "Active Noise Cancellation, Transparency Mode, Personalized Spatial Audio with dynamic head tracking. Up to 6 hours of listening time, 30 hours total with case. MagSafe charging case.",
    price: 189.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 32847,
    image: "https://images.unsplash.com/photo-1606741965509-717f24714eca?w=400&q=80",
  },
  {
    id: 2,
    title: 'Samsung 65" QLED 4K Smart TV',
    description:
      "Quantum Dot technology for vibrant colors. 4K UHD resolution with HDR10+. Built-in Alexa and Google Assistant. 120Hz refresh rate for smooth motion.",
    price: 897.99,
    category: "Electronics",
    rating: 4.6,
    reviews: 15203,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
  },
  {
    id: 3,
    title: "Nike Air Max 270 Running Shoes",
    description:
      "Engineered mesh upper for breathability. Max Air unit in the heel for all-day cushioning. Rubber outsole for durable traction. Available in multiple colorways.",
    price: 129.99,
    category: "Footwear",
    rating: 4.5,
    reviews: 8741,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  },
  {
    id: 4,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description:
      "7-in-1 multi-use programmable cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer. 6-quart capacity. 13 one-touch programs.",
    price: 69.99,
    category: "Kitchen",
    rating: 4.7,
    reviews: 98234,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80",
  },
  {
    id: 5,
    title: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Industry-leading noise cancellation with 8 microphones. 30-hour battery life. Multipoint connection to two devices simultaneously. Crystal clear hands-free calling.",
    price: 279.99,
    category: "Electronics",
    rating: 4.9,
    reviews: 21567,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    id: 6,
    title: "Levi's Men's 501 Original Fit Jeans",
    description:
      "The original blue jean since 1873. Straight leg with a regular fit through the seat and thigh. Button fly. 100% cotton denim. Machine washable.",
    price: 59.99,
    category: "Clothing",
    rating: 4.4,
    reviews: 44321,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
  },
  {
    id: 7,
    title: "Kindle Paperwhite (16 GB)",
    description:
      "300 ppi glare-free display. Adjustable warm light. Waterproof (IPX8). 6.8-inch display. 10 weeks of battery life. Stores thousands of books.",
    price: 139.99,
    category: "Electronics",
    rating: 4.7,
    reviews: 67890,
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=400&q=80",
  },
  {
    id: 8,
    title: "Dyson V15 Detect Cordless Vacuum",
    description:
      "Laser reveals microscopic dust on hard floors. LCD screen to show scientific proof of a deep clean. 60 minutes run time. HEPA filtration captures 99.97% of particles.",
    price: 649.99,
    category: "Home",
    rating: 4.6,
    reviews: 9832,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: 9,
    title: "The North Face Men's Thermoball Jacket",
    description:
      "Lightweight and compressible insulation. Water repellent finish. 550 fill down alternative. Stuffs into its own chest pocket. Ideal for layering.",
    price: 199.99,
    category: "Clothing",
    rating: 4.5,
    reviews: 12045,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80",
  },
  {
    id: 10,
    title: "Weber Spirit II E-310 Gas Grill",
    description:
      "3 stainless-steel burners with 30,000 BTU-per-hour input. 529 sq in of total cooking area. Porcelain-enameled, cast-iron cooking grates. Built-in thermometer.",
    price: 499.99,
    category: "Outdoor",
    rating: 4.8,
    reviews: 7621,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  },
  {
    id: 11,
    title: "LEGO Technic Bugatti Chiron 42083",
    description:
      "1:8 scale model with authentic details. 3,599 pieces. Working 8-speed gearbox. Detailed W16 engine with moving pistons. Includes two minifigures.",
    price: 349.99,
    category: "Toys",
    rating: 4.9,
    reviews: 5234,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
  },
  {
    id: 12,
    title: "Ninja Foodi 9-in-1 Air Fryer",
    description:
      "Air fry, roast, broil, bake, dehydrate, and more. 5.5-quart ceramic-coated nonstick basket. Up to 75% less fat than traditional frying. DualZone technology.",
    price: 119.99,
    category: "Kitchen",
    rating: 4.6,
    reviews: 34521,
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80",
  },
];

export const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-11-15",
    status: "Delivered",
    items: [
      { title: "Apple AirPods Pro (2nd Generation)", qty: 1, price: 189.99 },
      { title: "Kindle Paperwhite (16 GB)", qty: 1, price: 139.99 },
    ],
    total: 329.98,
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-02",
    status: "Shipped",
    items: [
      { title: "Nike Air Max 270 Running Shoes", qty: 1, price: 129.99 },
    ],
    total: 129.99,
  },
  {
    id: "ORD-2024-003",
    date: "2024-12-10",
    status: "Processing",
    items: [
      { title: "Sony WH-1000XM5 Wireless Headphones", qty: 1, price: 279.99 },
      { title: "Instant Pot Duo 7-in-1", qty: 1, price: 69.99 },
    ],
    total: 349.98,
  },
];