import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Create a configured instance — never use raw axios.get() directly in components
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, // 10 seconds — fail fast instead of hanging forever
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR — runs BEFORE every request is sent

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Auto-attach JWT token to every outgoing request
    const token = localStorage.getItem("authToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Useful for debugging in dev
    console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`);

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR — runs AFTER every response is received

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    // Centralized error handling — every component benefits automatically

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          console.error("🔒 Unauthorized — token expired or invalid");
          localStorage.removeItem("authToken");
          window.location.href = "/login"; // force redirect to login
          break;
        case 403:
          console.error("🚫 Forbidden — insufficient permissions");
          break;
        case 404:
          console.error("🔍 Not Found — resource does not exist");
          break;
        case 500:
          console.error("💥 Server Error — something went wrong on backend");
          break;
        default:
          console.error(`Unexpected error: ${status}`);
      }
    } else if (error.request) {
      // Request was made but no response received (network down, server unreachable)
      console.error("📡 Network error — no response from server");
    } else {
      console.error("⚠️ Error setting up request:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
