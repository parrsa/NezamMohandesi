// components/ToastProvider.tsx
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
