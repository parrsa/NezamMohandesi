"use client";

import React, { useState } from "react";
import ImagesSlider, { DateIcon } from "@/app/components/imageSlider";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetSubCategory } from "@/app/core/services/Categories/useCategories";
import { useGetAllContents } from "@/app/core/services/Contents/useContents";

const FILE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function NewsPage() {
  const { id } = useParams();

  const [selectedCategory, setSelectedCategory] = useState<
    string | number | null
  >(null);

  const { data: subCategories, isLoading: isSubCategories } = useGetSubCategory(
    String(id),
  );

  const effectiveSelectedCategory =
    selectedCategory ?? subCategories?.[0]?.id ?? null;

  const { data: mainContent } = useGetAllContents(1, 20, true, String(id));

  const { data: subCategoryContent, isLoading: isSubCategoryContent } =
    useGetAllContents(
      1,
      20,
      true,
      effectiveSelectedCategory ? String(effectiveSelectedCategory) : "",
    );

  const bannerItems =
    mainContent?.items?.map((item: any) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      date: new Date(item.publishDate).toLocaleDateString("fa-IR"),
      icon: `${FILE_BASE_URL}/uploads/${item.featuredImage}`,
      iconClasses: "-translate-y-7 w-40",
    })) || [];

  return (
    <div className="p-5">
      <div className="flex flex-col p-3">
        <div className="flex items-start justify-center p-3 gap-8 bg-blue-100 rounded-t-2xl">
          <div className="max-w-4xl">
            <ImagesSlider banners={bannerItems} autoPlay />
          </div>
        </div>
        <div className="bg-white flex flex-col gap-3 p-3 rounded-b-2xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            {subCategories?.map((category: any) => (
              <div
                onClick={() => setSelectedCategory(category.id)}
                key={category.id}
                className={`w-28 p-1 rounded-full text-center cursor-pointer ${
                  effectiveSelectedCategory === category.id
                    ? "bg-[#2563EB1A] text-gray-800"
                    : "bg-white text-gray-800 border border-gray-800"
                }`}
              >
                <p className="text-gray-800 text-[12px] font-bold text-nowrap">
                  {category.name}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {subCategoryContent?.items?.map((item: any, index: number) => {
              const gradients = [
                "from-blue-400/20  ring-blue-400/50",
                "from-blue-400/20  ring-blue-400/50",
              ];
              const gradient = gradients[index % 2];

              return (
                <Link
                  href={`/news/${id}/content/${item?.id}`}
                  key={index}
                  className={`group relative bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 hover:border-white/80`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-5 flex gap-5">
                    <div className="relative min-w-[180px] h-[140px] rounded-xl overflow-hidden shadow-xl ring-2 ring-white/50 group-hover:ring-blue-400/50 transition-all duration-300">
                      <Image
                        src={`${FILE_BASE_URL}uploads/${item?.featuredImage}`}
                        alt={item?.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />{" "}
                    </div>

                    <div className="flex flex-col gap-2 flex-1 justify-between py-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                            <DateIcon />
                          </div>
                          <p className="text-xs text-gray-600 font-medium">
                            {item?.publishDate}
                          </p>
                        </div>
                        <h3 className="text-base font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-relaxed">
                          {item?.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-6 line-clamp-2 mt-1.5 opacity-90">
                          {item?.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2.5 border-t border-white/60">
                        <div className="flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-3">
                          <span className="text-xs font-bold">
                            مشاهده بیشتر
                          </span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <svg
                            className="w-3 h-3"
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
                          <span>{item.viewCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            {!isSubCategoryContent &&
              (subCategoryContent?.items?.length ?? 0) === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  محتوایی یافت نشد
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
