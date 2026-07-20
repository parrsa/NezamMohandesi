"use client";

import React from "react";
import { BorderIcon, DocumentIcon } from "../ratifications/page";
import Link from "next/link";
import { useGetAllSocieties } from "@/app/core/services/Societies/useSocieties";
import { ChevronLeftIcon } from "lucide-react";

export default function AssemblyPage() {
  const { data, isLoading, refetch } = useGetAllSocieties();

  return (
    <div className="">
      <div className="flex items-center py-6 gap-4 text-sm">
        <Link href="/" className="transition-colors flex items-center gap-1">
          <span className="text-gray-400">صفحه اصلی</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <Link
          href="/introduction"
          className="transition-colors flex items-center gap-1"
        >
          <span className="text-gray-400">معرفی سازمان</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <span className="font-medium text-gray-700">مجمع </span>
      </div>
      <div className="grid grid-cols-3 gap-6 bg-white rounded-2xl p-3 mt-5">
        {data &&
          data?.map((item: any, index: number) => {
            return (
              <div key={index} className="flex flex-col gap-5">
                <h2 className="text-[#334155] font-bold pr-2 text-xl flex items-center gap-1">
                  <BorderIcon />
                  {item.title}
                </h2>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-1">
                    <DocumentIcon />
                    <Link
                      href={`assembly/${item.id}`}
                      className="text-[#334155]"
                    >
                      نمایش مصوبات
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
