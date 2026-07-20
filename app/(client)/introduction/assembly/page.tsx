"use client";

import React from "react";
import { BorderIcon, DocumentIcon } from "../ratifications/page";
import Link from "next/link";
import { useGetAllSocieties } from "@/app/core/services/Societies/useSocieties";

const approvalsListItem = [
  {
    id: 1,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 1,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 1,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 1,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 11,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 21,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "مجمع عمومی عادی سالیانه سال 1402",
    list: [
      {
        id: 31,
        title: "مصوبات صد و سی و هشتمين",
        creationDate: "1403/08/19",
      },
    ],
  },
];

export default function AssemblyPage() {
  const { data, isLoading, refetch } = useGetAllSocieties();

  return (
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
                  <Link href={`assembly/${item.id}`} className="text-[#334155]">
                    نمایش مصوبات
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
