"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft } from "lucide-react";

const tabs = [
  { id: "news", label: "اخبار" },
  { id: "announcements", label: "اطلاعیه‌ها" },
  { id: "events", label: "رویدادها" },
  { id: "conferences", label: "همایش‌ها" },
];

// محتوای متفاوت برای هر تب
const tabContent = {
  news: {
    featured: {
      title: "بازید از پروژه نهضت ملی مسکن",
      description:
        "مهندس مهدی محرمی شام‌اسبی رییس سازمان نظام مهندسی ساختمان استان تهران به همراه مهندس عبدالرضا غفوری معاون مسکن و ساختمان اداره‌کل راه و شهرسازی استان تهران از پروژه ۲۷۰۰ واحدی نهضت ملی مسکن عدل‌آباد اسلامشهر بازدید کردند.",
      image: "/api/placeholder/600/400",
    },
    list: [
      {
        id: 1,
        date: "1404/10/2",
        title: "نشست تخصصی فناوری‌های دیجیتال و هوش مصنوعی",
        description:
          "سازمان نظام مهندسی ساختمان استان تهران، در راستای توسعه فناوری‌های نوین، هوشمندسازی صنعت ساختمان و بهره‌گیری هدفمند از ظرفیت‌های هوش مصنوعی، میزبان جلسه‌ای تخصصی...",
      },
      {
        id: 2,
        date: "1404/10/2",
        title:
          "نشست مشترک سازمان نظام مهندسی ساختمان استان تهران و مرکز بازرسی و مبارزه با فرار مالیاتی و پول‌شویی",
        description:
          "چهارشنبه 19 آذر 1404 نشستی تخصصی با حضور مهندس مهدی محرمی شام‌اسبی رییس سازمان نظام مهندسی ساختمان استان تهران و همچنین دکتر شاهین مستوفی...",
      },
      {
        id: 3,
        date: "1404/10/2",
        title:
          "گزارش جلسه هماهنگی پروژه ساختمان در حال احداث سازمان (مهستان ۲ «ارغوان»)",
        description:
          "جلسه هماهنگی میان کارفرما، مشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمی شام اسبی...",
      },
    ],
  },
  announcements: {
    featured: {
      title: "اطلاعیه مهم سازمان نظام مهندسی",
      description:
        "اطلاعیه شماره ۱۴۰۴ - زمان بندی ثبت نام آزمون‌های نظام مهندسی",
      image: "/api/placeholder/600/400",
    },
    list: [
      {
        id: 1,
        date: "1404/10/1",
        title: "اطلاعیه ثبت نام آزمون ورود به حرفه",
        description: "زمان ثبت نام از ۱۵ دی ماه لغایت ۳۰ دی ماه می‌باشد...",
      },
    ],
  },
  events: {
    featured: {
      title: "رویداد بزرگ فناوری ساختمان",
      description: "اولین همایش تخصصی فناوری‌های نوین در صنعت ساختمان",
      image: "/api/placeholder/600/400",
    },
    list: [],
  },
  conferences: {
    featured: {
      title: "همایش بین‌المللی معماری",
      description: "با حضور اساتید برجسته داخلی و خارجی",
      image: "/api/placeholder/600/400",
    },
    list: [],
  },
};

export function NewsTabs() {
  const [activeTab, setActiveTab] = useState("news");
  const currentContent = tabContent[activeTab as keyof typeof tabContent];

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* سمت راست: تب‌ها */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gray-200 rounded-full" />

                <motion.div
                  className="absolute right-0 w-0.5 bg-blue-600 rounded-full shadow-lg shadow-blue-300"
                  layoutId="activeLineBackground"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  style={{
                    height: 44,
                    top: `${tabs.findIndex((t) => t.id === activeTab) * 52}px`,
                  }}
                />

                <div className="flex flex-row lg:flex-col gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative px-4 py-2.5 text-right rounded-lg font-medium transition-all duration-300
                        flex items-center gap-3 w-full
                        ${
                          activeTab === tab.id
                            ? "text-blue-700 bg-blue-50"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeDot"
                          className="absolute right-[-7px] w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-md"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="flex-1 text-right pr-4 text-sm md:text-base">
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* وسط: عکس اصلی - با ارتفاع ثابت */}
          <div className="flex-1 lg:flex-[2]">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 md:h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-700">
                    <img
                      src={currentContent.featured.image}
                      alt={currentContent.featured.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                        {currentContent.featured.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base line-clamp-3">
                        {currentContent.featured.description}
                      </p>
                      <button className="mt-4 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors">
                        <span>بیشتر بخوانید</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* سمت چپ: لیست اخبار - با ارتفاع ثابت */}
          <div className="flex-1 lg:flex-[2]">
            <div className="bg-white rounded-2xl shadow-lg p-5 h-[500px] md:h-[550px] flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4 flex-shrink-0">
                آخرین {tabs.find((t) => t.id === activeTab)?.label}
              </h3>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-5">
                  {currentContent.list.map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-14 text-center">
                          <div className="bg-blue-50 rounded-lg p-1.5">
                            <Calendar className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                            <span className="text-xs font-medium text-gray-700">
                              {news.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-800 font-bold text-sm md:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {news.title}
                          </h4>
                          <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">
                            {news.description}
                          </p>
                          <button className="mt-2 text-blue-600 text-xs font-medium hover:underline">
                            مطالعه بیشتر
                          </button>
                        </div>
                      </div>
                      {index < currentContent.list.length - 1 && (
                        <div className="border-b border-gray-100 mt-3 pt-3"></div>
                      )}
                    </motion.div>
                  ))}

                  {currentContent.list.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p>هیچ موردی یافت نشد</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
