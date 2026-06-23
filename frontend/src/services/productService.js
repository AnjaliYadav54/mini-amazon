import { mockProducts } from "../data/mockData";
// import { apiGet } from "./api";

export async function getAllProducts() {
  // return apiGet("/products");
  await new Promise((r) => setTimeout(r, 200));
  return mockProducts;
}

export async function getProductById(id) {
  // return apiGet(`/products/${id}`);
  await new Promise((r) => setTimeout(r, 100));
  const product = mockProducts.find((p) => p.id === Number(id));
  if (!product) throw new Error("Product not found");
  return product;
}

export async function searchProducts(query) {
  await new Promise((r) => setTimeout(r, 100));
  const q = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}