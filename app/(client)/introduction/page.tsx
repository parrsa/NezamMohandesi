"use client";
import { motion } from "framer-motion";
import {
  Building2,
  Award,
  Users,
  FileCheck,
  TrendingUp,
  ChevronLeft,
  ChevronLeft as ChevronLeftIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Moharami from "@/public/assets/Frame 14.png";

function Introduction() {
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
    { label: "بازرسان", href: "/introduction/inspectors" },
    { label: "مدیریت سازمان", href: "/introduction/management" },
    { label: "اعضای هیئت رئیسه", href: "/introduction/board" },
    { label: "دفتر ریاست", href: "/introduction/president-office" },
    { label: "شورای انتظامی", href: "/introduction/disciplinary-council" },
    { label: "چارت سازمان", href: "/introduction/organizational-chart" },
    { label: "مصوبات", href: "/introduction/ratifications" },
    { label: "معاونت‌ها", href: "/introduction/deputies" },
    { label: "مجمع سالیانه", href: "/introduction/annual-meeting" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center py-6 gap-2 text-sm">
        <Link href="/" className="transition-colors flex items-center gap-1">
          <span className="text-gray-400">صفحه اصلی</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-700">معرفی سازمان</span>
      </div>

      <div className="bg-blue-100 rounded-t-2xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 bg-white backdrop-blur-md rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              <Image src={Moharami} alt="icon" className="w-[60%] h-[60%]" />
              <p className="text-blue-500 text-sm mt-1">
                رئیس سازمان نظام مهندسی ساختمان استان تهران
              </p>
              <h3 className="text-lg md:text-xl text-blue-700 font-bold mt-2">
                مهندس مهدی محرمی شام اسبی
              </h3>
            </div>
          </div>

          <div className="lg:w-2/3 bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <div className="space-y-7 text-gray-700 leading-relaxed text-justify">
              <p>
                <span className="font-bold text-blue-600">
                  سازمان نظام مهندسی ساختمان استان تهران
                </span>{" "}
                به عنوان یکی از بزرگترین و تاثیرگذارترین نهادهای حرفه‌ای در صنعت
                ساختمان کشور، با هدف ساماندهی و ارتقای سطح کیفی ساخت و ساز،
                نظارت بر اجرای دقیق مقررات ملی و توانمندسازی مهندسان فعالیت
                می‌کند.
              </p>

              <p>
                اگر شما یک مهندس، طراح و یا فعال در صنعت ساختمان هستید، قطعاً با
                اهمیت نقش سازمان نظام مهندسی در ارائه خدمات تخصصی، صدور پروانه
                اشتغال و نظارت بر پروژه‌های ساختمانی آشنا هستید. این سازمان به
                عنوان متولی اصلی حرفه مهندسی در استان تهران، با بهره‌گیری از
                کادری مجرب و متخصص، همواره در تلاش است تا استانداردهای ساخت و
                ساز را در پایتخت ارتقا بخشد.
              </p>

              <p>
                طراحان و مهندسان هنگام طراحی یک پروژه ساختمانی معمولاً با این
                موضوع روبرو هستند که رعایت استانداردها و ضوابط فنی تا چه میزان
                اهمیت دارد. سازمان نظام مهندسی با ارائه مشاوره‌های تخصصی،
                برگزاری دوره‌های آموزشی و نظارت مستمر بر فرآیند ساخت، اطمینان
                خاطر را برای کارفرمایان و بهره‌برداران فراهم می‌آورد.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt- bg-white rounded-b-2xl p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            معرفی سازمان
          </h2>
          <div className=" h-0.5 bg-neutral-200 mt-2"></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {subMenuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md rounded-xl px-4 py-3 text-right transition-all duration-200"
              >
                <span className="text-gray-700 font-medium text-sm md:text-base">
                  {item.label}
                </span>
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Introduction;
