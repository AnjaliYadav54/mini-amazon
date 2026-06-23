import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const FAKE_USER = {
  email: "test@test.com",
  password: "123456",
  name: "Test User",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      const loggedIn = { name: FAKE_USER.name, email: FAKE_USER.email };
      setUser(loggedIn);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password." };
  }

  function register(name, email) {
    const newUser = { name, email };
    setUser(newUser);
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}