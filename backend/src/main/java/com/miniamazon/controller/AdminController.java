package com.miniamazon.controller;

import com.miniamazon.dto.request.ProductRequest;
import com.miniamazon.dto.response.*;
import com.miniamazon.repository.UserRepository;
import com.miniamazon.service.*;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final UserRepository userRepository;

    // ── Product Management ──────────────────────────────────

    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // ── Order Management ────────────────────────────────────

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    // ── Dashboard ───────────────────────────────────────────

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard() {
        long totalUsers    = userRepository.count();
        long totalProducts = productService.getAllProducts().size();
        long totalOrders   = orderService.getAllOrders().size();

        return ResponseEntity.ok(new java.util.HashMap<String, Object>() {{
            put("totalUsers",    totalUsers);
            put("totalProducts", totalProducts);
            put("totalOrders",   totalOrders);
        }});
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
                .map(u -> new java.util.HashMap<String, Object>() {{
                    put("id",    u.getId());
                    put("name",  u.getName());
                    put("email", u.getEmail());
                    put("role",  u.getRole().name());
                }})
                .toList());
    }
}