"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Image as ImageIcon } from "lucide-react";

const tabs = [
  { id: "news", label: "اخبار" },
  { id: "announcements", label: "اطلاعیه‌ها" },
  { id: "events", label: "رویدادها" },
  { id: "conferences", label: "همایش‌ها" },
];

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
          "سازمان نظام مهندسی ساختمان استان تهران، در راستای توسعه فناوری‌های نوین، هوشمندسازی صنعت ساختمان و بهره‌گیری هدفمند ازمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمی ظرفیت‌های هوش مصنوعی، میزبان جلسه‌ای تخصصی...",
        image: "/api/placeholder/80/80",
      },
      {
        id: 2,
        date: "1404/10/2",
        title:
          "نشست مشترک سازمان نظام مهندسی ساختمان استان تهران و مرکز بازرسی و مبارزه با فرار ",
        description:
          "چهارشنبه 19 آذر 1404 نشستی تخصصی با حضور مهندس مهدی محرمی شام‌اسبی رییس سازمان نظام مهندسی ساختمامشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمین استان تهران و همچنین دکتر شاهین مستوفی...",
        image: "/api/placeholder/80/80",
      },
      {
        id: 3,
        date: "1404/10/2",
        title:
          "گزارش جلسه هماهنگی پروژه ساختمان در حال احداث سازمان (مهستان ۲ «ارغوان»)",
        description:
          "جلسه هماهنگی میان کارفرما، مشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمیمشاور و پیمانکاران پروژه ساختمان در حال احداث سازمان (مهستان دو «ارغوان») با حضور مهندس مهدی محرمی شام اسبی...",
        image: "/api/placeholder/80/80",
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
        image: "/api/placeholder/80/80",
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

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [linePosition, setLinePosition] = useState({ top: 16, height: 48 });

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === activeTab);
    const activeButton = buttonRefs.current[activeIndex];
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setLinePosition({
        top: buttonRect.top - containerRect.top,
        height: buttonRect.height,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full bg-neutral-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="shrink-0">
            <div className="sticky top-24 h-full">
              <div ref={containerRef} className="relative h-full">
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-full" />

                <motion.div
                  className="absolute right-0 w-1 bg-blue-500 rounded-full shadow-lg shadow-blue-300"
                  layoutId="activeLineBackground"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  style={{
                    height: linePosition.height,
                    top: linePosition.top,
                  }}
                />

                <div className="flex flex-col gap-2 h-full justify-between">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      onClick={() => setActiveTab(tab.id)}
                      className={` ${activeTab === tab.id && "text-blue-500"}
                    relative px-4 py-3 text-right rounded-xl font-medium transition-all duration-300
                    flex items-center gap-3 w-full
                    `}
                    >
                      <span className="flex-1 text-right pr- text-sm md:text-base font-medium">
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[1.2]">
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
                  <div className="w-full h-full bg-linear-to-r from-blue-900 to-blue-700">
                    <img
                      src={currentContent.featured.image}
                      alt={currentContent.featured.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute bottom-0 right-0 left-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                        {currentContent.featured.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base line-clamp-3">
                        {currentContent.featured.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-[1.2]">
            <div className=" flex justify-between h-full max-h-96 overflow-y- custom-scrollbar">
              <div className=" space-y-4 w-full relative flex flex-col justify-between h-full">
                {currentContent.list.map((news, index) => (
                  <motion.div
                    key={news.id}
                    className="group cursor-pointer rounded-xl bg-white p-3 relative overflow-hidden"
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0 relative">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shadow-md relative z-10">
                          {news.image ? (
                            <img
                              src={news.image}
                              alt={news.title.slice(0, 5)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-6 rounded-b-full bg-blue-500 shadow-md" /> */}
                        <div className="absolute  -right-8 -bottom-7 w-24 h-24 rounded-full bg-blue-200/70" />
                      </div>

                      <div className="flex-1 min-w-0 z-10">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-gray-500">
                            {news.date}
                          </span>
                        </div>
                        <h4 className="text-gray-800 font-bold text-sm md:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {news.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                          {news.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute  -left-3 -top-7 w-18 h-18 rounded-full bg-blue-100/70" />

                    <div className="absolute  -left-9 -top-1 w-18 h-18 rounded-full  bg-blue-50/90" />
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
  );
}
