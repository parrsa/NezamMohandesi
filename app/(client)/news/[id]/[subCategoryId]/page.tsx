"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "@/app/(client)/introduction/assembly/[id]/page";
import { DateIcon } from "../page";
import { useGetContentById } from "@/app/core/services/Contents/useContents";
import { useParams } from "next/navigation";

const FILE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function NewsDetails() {
  const { subCategoryId, id } = useParams();

  const { data, isLoading, error } = useGetContentById(String(subCategoryId));

  if (isLoading) {
    return (
      <div className="p-3">
        <div className="p-4 bg-white rounded-xl text-center text-gray-500 py-12">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-3">
        <div className="p-4 bg-white rounded-xl text-center text-red-500 py-12">
          محتوا یافت نشد
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex items-center gap-4 mb-3">
        <p className="text-gray-400 text-sm">صفحه اصلی</p>
        <ArrowIcon />
        <Link href={`/news/${id}`} className="text-gray-600 text-sm">
          {data.categoryName || "اخبار"}
        </Link>
      </div>
      <div className="p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <p className="text-gray-800 text-sm">
            {data.categoryName || "اخبار"}
          </p>
          <Link href={`/news/${id}`}>
            <ArrowIcon />
          </Link>
        </div>
        <div className="py-3 px-6 flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Image
              src={`${FILE_BASE_URL}/uploads/${data.featuredImage}`}
              alt={data.title}
              width={250}
              height={200}
              className="rounded-xl object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-blue-800">{data.title}</p>
              <p className="text-sm font-bold text-gray-800">{data.summary}</p>
              <div className="flex items-center gap-1">
                <DateIcon />
                <p className="text-[13px] text-gray-600">
                  {new Date(data.publishDate).toLocaleDateString("fa-IR")}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-800 leading-7">
            {data.body}
          </p>
          {data.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {data.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {data.attachments?.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.attachments.map((attachment: any) => (
                <a
                  key={attachment.id}
                  href={`${FILE_BASE_URL}/uploads/${attachment.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  {attachment.displayName} ({attachment.fileSizeDisplay})
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
