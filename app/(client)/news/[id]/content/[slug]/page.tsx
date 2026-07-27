"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetContentById } from "@/app/core/services/Contents/useContents";
import { useParams } from "next/navigation";
import { DateIcon } from "@/app/components/imageSlider";

const FILE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function NewsDetails() {
  const { slug, id } = useParams();

  const { data, isLoading, error } = useGetContentById(String(slug));

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <span className="text-gray-500 font-medium">
                در حال بارگذاری...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                محتوا یافت نشد
              </h3>
              <p className="text-gray-500">
                متاسفانه محتوای درخواستی شما موجود نیست
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-3 mb-6 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-white/50">
          <Link
            href="/"
            className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
          >
            صفحه اصلی
          </Link>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link
            href={`/news/${id}`}
            className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
          >
            {data?.categoryName || "اخبار"}
          </Link>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-800 text-sm font-medium truncate">
            {data?.title}
          </span>
        </nav>

        <article className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <div className="relative h-72 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            {data?.featuredImage && (
              <Image
                src={`${FILE_BASE_URL}/uploads/${data?.featuredImage}`}
                alt={data?.title}
                fill
                className="object-cover opacity-90"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                  {data?.categoryName}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                  {data?.statusDisplay}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                {data?.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-1.5">
                  <DateIcon />
                  <span className="text-sm">{data?.publishDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-sm">{data?.viewCount || 0} بازدید</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {data?.summary && (
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100/50">
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    {data?.summary}
                  </p>
                </div>
              )}

              <div className="text-gray-700 leading-8 text-base space-y-4">
                {data?.body}
              </div>

              {data?.tags?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-gray-600">
                      برچسب‌ها:
                    </span>
                    {data?.tags?.map((tag: any, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100/50 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        #{tag?.name || tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data?.attachments?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-bold text-gray-700 mb-3">
                    فایل‌های پیوست
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {data?.attachments?.map(
                      (attachment: any, index: number) => (
                        <a
                          key={index}
                          href={`${FILE_BASE_URL}/uploads/${attachment?.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200/50 hover:border-blue-200 hover:shadow-md transition-all"
                        >
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate">
                              {attachment?.displayName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {attachment?.fileSizeDisplay}
                            </p>
                          </div>
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                href={`/news/${id}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                بازگشت به لیست اخبار
              </Link>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>کد مطلب: {data?.id}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
