"use client";

import React, { useState } from "react";
import ImagesSlider from "@/app/components/imageSlider";
import Image from "next/image";
import Pic from "@/public/assets/News/Gashnvare.jpg";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetSubCategory } from "@/app/core/services/Categories/useCategories";
import { useGetAllContents } from "@/app/core/services/Contents/useContents";

const FILE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const DateIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  ></svg>
);

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
      icon: `${FILE_BASE_URL}/${item.featuredImage}`,
      iconClasses: "-translate-y-7 w-40",
    })) || [];

  return (
    <div className="p-5">
      <div className="flex flex-col p-3">
        <div className="flex items-start justify-center p-3 gap-8 bg-blue-100 rounded-t-2xl">
          <div className="bg-white rounded-2xl w-64 h-48 p-3">
            <Image src={Pic} alt="pic" className="h-full" />
          </div>
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
            {subCategoryContent?.items?.map((item: any, itemIndex: number) => (
              <Link
                href={`/news/${id}/content/${item.title}`}
                key={itemIndex}
                className="flex items-center gap-3 p-3 border border-gray-200 shadow-md rounded-xl"
              >
                <Image
                  src={`${FILE_BASE_URL}/uploads/${item?.featuredImage}`}
                  alt={item.title}
                  width={150}
                  quality={100}
                  height={100}
                  className="rounded-xl shadow-lg h-full"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <DateIcon />
                    <p className="text-[13px] text-gray-600">
                      {item.publishDate}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 leading-7">
                    {item.summary}
                  </p>
                </div>
              </Link>
            ))}

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
