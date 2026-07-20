"use client";

import React from "react";
import { useGetSocietiesNotices } from "@/app/core/services/Societies/useSocieties";
import Link from "next/link";
import { useParams } from "next/navigation";

const FILE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const ArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.0001 19.92L8.48009 13.4C7.71009 12.63 7.71009 11.37 8.48009 10.6L15.0001 4.07996"
      stroke="#58595D"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.33337 3.8335C5.06004 3.8335 4.83337 3.60683 4.83337 3.3335V1.3335C4.83337 1.06016 5.06004 0.833496 5.33337 0.833496C5.60671 0.833496 5.83337 1.06016 5.83337 1.3335V3.3335C5.83337 3.60683 5.60671 3.8335 5.33337 3.8335Z"
      fill="currentColor"
    />
    <path
      d="M10.6666 3.8335C10.3933 3.8335 10.1666 3.60683 10.1666 3.3335V1.3335C10.1666 1.06016 10.3933 0.833496 10.6666 0.833496C10.94 0.833496 11.1666 1.06016 11.1666 1.3335V3.3335C11.1666 3.60683 10.94 3.8335 10.6666 3.8335Z"
      fill="currentColor"
    />
    <path
      d="M13.6667 6.56006H2.33337C2.06004 6.56006 1.83337 6.33339 1.83337 6.06006C1.83337 5.78673 2.06004 5.56006 2.33337 5.56006H13.6667C13.94 5.56006 14.1667 5.78673 14.1667 6.06006C14.1667 6.33339 13.94 6.56006 13.6667 6.56006Z"
      fill="currentColor"
    />
    <path
      d="M10.6667 15.1668H5.33333C2.9 15.1668 1.5 13.7668 1.5 11.3335V5.66683C1.5 3.2335 2.9 1.8335 5.33333 1.8335H10.6667C13.1 1.8335 14.5 3.2335 14.5 5.66683V11.3335C14.5 13.7668 13.1 15.1668 10.6667 15.1668ZM5.33333 2.8335C3.42667 2.8335 2.5 3.76016 2.5 5.66683V11.3335C2.5 13.2402 3.42667 14.1668 5.33333 14.1668H10.6667C12.5733 14.1668 13.5 13.2402 13.5 11.3335V5.66683C13.5 3.76016 12.5733 2.8335 10.6667 2.8335H5.33333Z"
      fill="currentColor"
    />
  </svg>
);

const AttachmentIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function AssemblyDetailsPage() {
  const { id } = useParams();

  const { data, isLoading } = useGetSocietiesNotices(id);

  return (
    <div className="p-3">
      <div className="flex items-center gap-4 mb-5">
        <p className="text-gray-400 text-sm">صفحه اصلی</p>
        <ArrowIcon />
        <Link href={"/introduction/assembly"} className="text-gray-600 text-sm">
          مجمع عمومی
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 h-32 animate-pulse"
            />
          ))}

        {!isLoading && data?.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-400 text-sm">
            مصوبه‌ای یافت نشد
          </div>
        )}

        {data?.map((item: any) => {
          const expirationDate = new Date(
            item.expirationDate,
          ).toLocaleDateString("fa-IR");
          const attachmentUrl = item.attachmentPath
            ? `${FILE_BASE_URL}/uploads/${item.attachmentPath}`
            : null;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 flex flex-col gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <span className="w-fit text-[11px] font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {item.societyTitle}
                  </span>
                  <h2 className="text-base font-bold text-gray-800">
                    {item.title}
                  </h2>
                </div>

                <span
                  className={`text-[11px] font-medium px-3 py-1 rounded-full text-nowrap ${
                    item.isExpired
                      ? "bg-red-50 text-red-500"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {item.isExpired ? "منقضی شده" : "فعال"}
                </span>
              </div>

              <p className="text-[13px] text-gray-500 leading-8 whitespace-pre-line">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarIcon />
                  <p className="text-[12px]">تاریخ انقضا: {expirationDate}</p>
                </div>

                {attachmentUrl && (
                  <a
                    href={attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={item.attachmentFileName}
                    className="flex items-center gap-2 text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <AttachmentIcon />
                    دانلود پیوست
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
