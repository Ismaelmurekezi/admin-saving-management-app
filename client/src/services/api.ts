import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const authData = localStorage.getItem("admin-auth");
  if (authData) {
    const parsed = JSON.parse(authData);
    if (parsed.state?.token) {
      config.headers.Authorization = `Bearer ${parsed.state.token}`;
    }
  }
  return config;
});

export const adminAPI = {
  login: (email: string, password: string) =>
    api.post("/api/admin/login", { email, password }),

  getUsers: () => api.get("/api/admin/users"),

  verifyDevice: (deviceId: string, status: "verified" | "rejected") =>
    api.patch(`/api/admin/verify-device/${deviceId}`, { status }),

  getTransactions: () => api.get("/api/admin/transactions"),

  getDashboardStats: () => api.get("/api/admin/dashboard-stats"),
};

export default api;
