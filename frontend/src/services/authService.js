import { apiPost } from "./api";

// Mock — replace with real API calls when backend is ready
export async function loginUser(email, password) {
  // return apiPost("/auth/login", { email, password });
  await new Promise((r) => setTimeout(r, 500));
  if (email === "test@test.com" && password === "123456") {
    return { token: "fake-jwt-token", user: { name: "Test User", email } };
  }
  throw new Error("Invalid credentials");
}

export async function registerUser(name, email, password) {
  // return apiPost("/auth/register", { name, email, password });
  await new Promise((r) => setTimeout(r, 500));
  return { token: "fake-jwt-token", user: { name, email } };
}