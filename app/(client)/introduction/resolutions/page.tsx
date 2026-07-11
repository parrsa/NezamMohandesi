import React from "react";
import { BorderIcon, DocumentIcon } from "../ratifications/page";

const approvalsListItem = [
  {
    id: 1,
    name: "معاونت امور دفاتر و نمایندگی",
    list: [
      {
        id: 11,
        title: "ارزیابی و نظارت بر دفاتر",
        creationDate: "1403/08/19",
      },
      {
        id: 12,
        title: "هماهنگی امور دفاتر",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 2,
    name: "معاونت برنامه ریزی و سیستم‌ها",
    list: [
      {
        id: 21,
        title: "فناروی اطلاعات",
        creationDate: "1403/08/19",
      },
      {
        id: 22,
        title: "سیستم‌ها و روش‌ها",
        creationDate: "1403/08/19",
      },
      {
        id: 23,
        title: "برنامه بودجه",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "معاونت توسعه منابع مهندسی",
    list: [
      {
        id: 31,
        title: "امور رفاهی و خدمات حقوقی اعضا",
        creationDate: "1403/08/19",
      },
      {
        id: 32,
        title: "امور تشکل‌های مهندسی حرفه‌ای",
        creationDate: "1403/08/19",
      },
      {
        id: 33,
        title: "امور عضویت",
        creationDate: "1403/08/19",
      },
      {
        id: 34,
        title: "آموزش، پرورش و ترویج",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 3,
    name: "معاونت خدمات مهندسی",
    list: [
      {
        id: 31,
        title: "کنترل نقشه، مطالعات ژئوتکنیک",
        creationDate: "1403/08/19",
      },
      {
        id: 32,
        title: "ارجاع کار نظارت و حق الزحمه",
        creationDate: "1403/08/19",
      },
      {
        id: 33,
        title: "امور کارشناسی و داوری",
        creationDate: "1403/08/19",
      },
      {
        id: 34,
        title: "بازرسی و کنترل ساختمان",
        creationDate: "1403/08/19",
      },
    ],
  },
  {
    id: 1,
    name: "معاونت مالی و پیشتیبانی",
    list: [
      {
        id: 11,
        title: "امور قراردادها",
        creationDate: "1403/08/19",
      },
      {
        id: 12,
        title: "امور پشتیبانی",
        creationDate: "1403/08/19",
      },
      {
        id: 13,
        title: "امور مالی",
        creationDate: "1403/08/19",
      },
      {
        id: 14,
        title: "منابع انسانی",
        creationDate: "1403/08/19",
      },
    ],
  },
];

export default function ResolutionsPage() {
  return (
    <div className="grid grid-cols-3 gap-6 bg-white rounded-2xl p-3 mt-5">
      {approvalsListItem.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-5">
            <h2 className="text-[#334155] font-bold pr-2 text-xl flex items-center gap-1">
              <BorderIcon />
              {item.name}
            </h2>
            <div className="flex flex-col gap-5">
              {item.list.map((child, childIndex) => (
                <div key={childIndex} className="flex items-center gap-1">
                  <p className="text-[#334155]">{child.title}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
