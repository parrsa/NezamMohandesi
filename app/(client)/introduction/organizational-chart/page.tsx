"use client";
import {
  Award,
  Users,
  FileCheck,
  TrendingUp,
  ChevronLeft as ChevronLeftIcon,
} from "lucide-react";
import Link from "next/link";
import Chart from "@/public/assets/image 5.png";
import Image from "next/image";
function AboutOrganization() {
  const stats = [
    { icon: Users, label: "اعضای سازمان", value: "۲۵,۰۰۰+", color: "blue" },
    { icon: Award, label: "پروژه‌های موفق", value: "۱۲,۵۰۰+", color: "green" },
    {
      icon: FileCheck,
      label: "گواهینامه‌های صادر شده",
      value: "۴۵,۰۰۰+",
      color: "purple",
    },
    { icon: TrendingUp, label: "سال تجربه", value: "۳۵+", color: "orange" },
  ];

  const subMenuItems = [
    "بازرسان",
    "مدیریت سازمان",
    "اعضای هیئت رئیسه",
    "دفتر ریاست",
    "شورای انتظامی",
    "چارت سازمان",
    "مصوبات",
    "معاونت‌ها",
    "مجمع سالیانه",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center py-6 gap-4 text-sm">
        <Link href="/" className="transition-colors flex items-center gap-1">
          <span className="text-gray-400">صفحه اصلی</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <Link href="/introduction" className="transition-colors flex items-center gap-1">
          <span className="text-gray-400">معرفی سازمان</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <span className="font-medium text-gray-700">چارت سازمانی</span>
      </div>

      <div className="rounded-2xl flex justify-center items-center p-6 md:p-8 ">
        <Image src={Chart} alt="ic" className="w-[70%] h-[70%]" />
      </div>
    </div>
  );
}

export default AboutOrganization;
