# Mini Amazon — Full Stack Architecture
## React + Spring Boot + MySQL

---

## 1. SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│                                                                 │
│   React.js (Port 3000)                                          │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│   │ AuthCtx  │ │ CartCtx  │ │ Pages    │ │ Components       │ │
│   └──────────┘ └──────────┘ └──────────┘ └──────────────────┘ │
│                      │ Axios HTTP Requests                      │
│                      │ + JWT Bearer Token Header                │
└──────────────────────┼──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SPRING BOOT (Port 8080)                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  Security Layer                          │   │
│  │  CorsFilter → JwtAuthFilter → UsernamePasswordFilter    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│  ┌────────────────────────▼────────────────────────────────┐   │
│  │               Controller Layer (@RestController)         │   │
│  │  AuthController  ProductController  CartController       │   │
│  │  OrderController  AdminController                        │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │ calls                               │
│  ┌────────────────────────▼────────────────────────────────┐   │
│  │               Service Layer (@Service)                   │   │
│  │  AuthService  ProductService  CartService                │   │
│  │  OrderService  AdminService                              │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │ uses                                │
│  ┌────────────────────────▼────────────────────────────────┐   │
│  │             Repository Layer (JpaRepository)             │   │
│  │  UserRepo  ProductRepo  CartRepo  OrderRepo              │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │ JPA / Hibernate                     │
└──────────────────────────-┼─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MySQL Database (Port 3306)                  │
│                                                                 │
│   users  products  cart  cart_items  orders  order_items        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. ENTITY RELATIONSHIP DIAGRAM (ERD)

```
┌──────────────┐         ┌──────────────┐
│    users     │         │   products   │
├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │
│ name         │         │ title        │
│ email (UNIQ) │         │ description  │
│ password     │         │ price        │
│ role         │         │ image_url    │
│ created_at   │         │ category     │
└──────┬───────┘         │ stock        │
       │                 │ rating       │
       │ 1               │ reviews      │
       │                 │ created_at   │
       ▼ N               └──────┬───────┘
┌──────────────┐                │ N
│    cart      │                │
├──────────────┤         ┌──────▼───────┐
│ id (PK)      │         │  cart_items  │
│ user_id (FK) │◄────────┤──────────────┤
│ created_at   │ 1     N │ id (PK)      │
└──────────────┘         │ cart_id (FK) │
                         │ product_id(FK│
                         │ quantity     │
                         └─────────────-┘
┌──────────────┐
│    orders    │         ┌──────────────┐
├──────────────┤         │ order_items  │
│ id (PK)      │◄────────┤──────────────┤
│ user_id (FK) │ 1     N │ id (PK)      │
│ total_price  │         │ order_id (FK)│
│ status       │         │ product_id(FK│
│ address      │         │ quantity     │
│ created_at   │         │ price        │
└──────────────┘         └──────────────┘
```

---

## 3. SPRING BOOT FOLDER STRUCTURE

```
backend/
└── src/
    └── main/
        ├── java/com/miniamazon/
        │   ├── MiniAmazonApplication.java
        │   ├── config/
        │   │   ├── SecurityConfig.java
        │   │   ├── CorsConfig.java
        │   │   └── ApplicationConfig.java
        │   ├── controller/
        │   │   ├── AuthController.java
        │   │   ├── ProductController.java
        │   │   ├── CartController.java
        │   │   ├── OrderController.java
        │   │   └── AdminController.java
        │   ├── service/
        │   │   ├── AuthService.java
        │   │   ├── ProductService.java
        │   │   ├── CartService.java
        │   │   ├── OrderService.java
        │   │   └── CustomUserDetailsService.java
        │   ├── repository/
        │   │   ├── UserRepository.java
        │   │   ├── ProductRepository.java
        │   │   ├── CartRepository.java
        │   │   ├── CartItemRepository.java
        │   │   ├── OrderRepository.java
        │   │   └── OrderItemRepository.java
        │   ├── entity/
        │   │   ├── User.java
        │   │   ├── Product.java
        │   │   ├── Cart.java
        │   │   ├── CartItem.java
        │   │   ├── Order.java
        │   │   └── OrderItem.java
        │   ├── dto/
        │   │   ├── request/
        │   │   │   ├── LoginRequest.java
        │   │   │   ├── RegisterRequest.java
        │   │   │   ├── ProductRequest.java
        │   │   │   ├── CartItemRequest.java
        │   │   │   └── OrderRequest.java
        │   │   └── response/
        │   │       ├── AuthResponse.java
        │   │       ├── ProductResponse.java
        │   │       ├── CartResponse.java
        │   │       └── OrderResponse.java
        │   ├── security/
        │   │   ├── JwtUtil.java
        │   │   ├── JwtAuthFilter.java
        │   │   └── UserPrincipal.java
        │   ├── exception/
        │   │   ├── GlobalExceptionHandler.java
        │   │   ├── ResourceNotFoundException.java
        │   │   ├── UnauthorizedException.java
        │   │   └── ApiError.java
        │   └── enums/
        │       ├── Role.java
        │       └── OrderStatus.java
        └── resources/
            ├── application.properties
            └── data.sql
```

---

## 4. API ENDPOINTS

### Auth
| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| POST   | /api/auth/register    | Public   | Register new user   |
| POST   | /api/auth/login       | Public   | Login, returns JWT  |
| GET    | /api/auth/me          | USER     | Get current user    |

### Products
| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| GET    | /api/products         | Public   | Get all products    |
| GET    | /api/products/{id}    | Public   | Get product by ID   |
| GET    | /api/products/search  | Public   | Search ?q=keyword   |
| GET    | /api/products/category| Public   | Filter by category  |
| POST   | /api/admin/products   | ADMIN    | Create product      |
| PUT    | /api/admin/products/{id}| ADMIN  | Update product      |
| DELETE | /api/admin/products/{id}| ADMIN  | Delete product      |

### Cart
| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| GET    | /api/cart             | USER     | Get user's cart     |
| POST   | /api/cart/add         | USER     | Add item to cart    |
| PUT    | /api/cart/update/{id} | USER     | Update quantity     |
| DELETE | /api/cart/remove/{id} | USER     | Remove item         |
| DELETE | /api/cart/clear       | USER     | Clear entire cart   |

### Orders
| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| POST   | /api/orders/checkout  | USER     | Place order         |
| GET    | /api/orders           | USER     | Get user's orders   |
| GET    | /api/orders/{id}      | USER     | Get order details   |

### Admin
| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| GET    | /api/admin/orders     | ADMIN    | Get all orders      |
| PUT    | /api/admin/orders/{id}| ADMIN    | Update order status |
| GET    | /api/admin/users      | ADMIN    | Get all users       |
| GET    | /api/admin/dashboard  | ADMIN    | Stats overview      |

---

## 5. JWT AUTHENTICATION FLOW

```
REGISTER:
Client → POST /api/auth/register {name, email, password}
       ← 201 {token, user}

LOGIN:
Client → POST /api/auth/login {email, password}
       ← 200 {token, user}

PROTECTED REQUEST:
Client → GET /api/cart
         Header: Authorization: Bearer <jwt_token>
       ← JwtAuthFilter extracts token
       ← Validates signature + expiry
       ← Loads UserDetails from DB
       ← Sets SecurityContext
       ← Controller executes
       ← 200 {cart data}

TOKEN STRUCTURE:
Header:  { "alg": "HS256", "typ": "JWT" }
Payload: { "sub": "user@email.com",
           "role": "ROLE_USER",
           "iat": 1700000000,
           "exp": 1700086400 }
Secret:  application.properties → jwt.secret
```