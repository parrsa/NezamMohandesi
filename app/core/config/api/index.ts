import axios from "axios";
import { getCookie, setCookie } from "@/app/lib/cookie";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicRoutes: string[] = [];

api.interceptors.request.use(
  (config: any) => {
    const isPublic = publicRoutes.some((route) => config.url?.includes(route));

    const sessionId =
      getCookie("sessionId") ||
      (typeof window !== "undefined" ? localStorage.getItem("sessionId") : null);

    if (!isPublic && sessionId) {
      // config.headers["User-Session-ID"] = sessionId;
      config.headers["Authorization"] = `Bearer ${sessionId}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await getNewTokens();

        if (res?.accessToken) {
          setCookie("accessToken", res.accessToken, 30);
          setCookie("refreshToken", res.refreshToken, 360);

          originalRequest.headers["Authorization"] = `Bearer ${res.accessToken}`;
          return api(originalRequest);
        } else {
          // clearTokens();
        }
      } catch {
        // clearTokens();
      }
    }

    return Promise.reject(error?.response?.data || error.Message);
  }
);

export default api;



const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return {};

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}auth/refresh-token`, {
      refresh_token: refreshToken,
    });

    return res?.data || {};
  } catch {
    return {};
  }
};
