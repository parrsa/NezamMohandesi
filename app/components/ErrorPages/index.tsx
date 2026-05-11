"use client";

import { RefreshCw } from "lucide-react";

export default function ErrorPage({ message, onRetry }: any) {
  return (
    <div className="flex flex-col items-center h-screen justify-center  p-8 bg-red-50 rounded-2xl">
      <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-red-100 mb-6">
        <span className="text-4xl text-red-600">⚠️</span>
      </div>
      <h3 className="text-xl md:text-2xl font-extrabold text-red-700 mb-3">
        خطا در دریافت اطلاعات
      </h3>
      <p className="text-red-600 text-base md:text-lg text-center max-w-md">
        {'خطای نامشخصی رخ داده است'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
