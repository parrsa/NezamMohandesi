"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Image as ImageIcon } from "lucide-react";
import { useGetAllCategories } from "@/app/core/services/Categories/useCategories";
import { useGetAllContents } from "@/app/core/services/Contents/useContents";

const FILE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export function NewsTabs() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [selectCategoryId, setSelectCategoryId] = useState<string | null>(null);

  const { data: categoriesData, isLoading: isCategories } =
    useGetAllCategories();

  const { data: categoryContentData, isLoading: isContent } = useGetAllContents(
    1,
    4,
    true,
    selectCategoryId,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [linePosition, setLinePosition] = useState({ top: 16, height: 48 });

  useEffect(() => {
    if (categoriesData?.items?.length && activeTab === null) {
      const firstId = categoriesData.items[0].id;
      setActiveTab(firstId);
      setSelectCategoryId(String(firstId));
    }
  }, [categoriesData]);

  useEffect(() => {
    if (!categoriesData?.items) return;
    const activeIndex = categoriesData.items.findIndex(
      (t: any) => t.id === activeTab,
    );
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
  }, [activeTab, categoriesData]);

  const handleTabClick = (id: number) => {
    if (id === activeTab) return;
    setActiveTab(id);
    setSelectCategoryId(String(id));
  };

  const items = categoryContentData?.items || [];
  const featured = items[0];
  const list = items.slice(0, 3);

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
                  {categoriesData?.items.map((tab: any, index: number) => (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      onClick={() => handleTabClick(tab.id)}
                      className={`${activeTab === tab.id && "text-blue-500"}
                    relative px-4 py-3 text-right rounded-xl font-medium transition-all duration-300
                    flex items-center gap-3 w-full
                    `}
                    >
                      <span className="flex-1 text-right pr- text-sm md:text-base font-medium">
                        {tab?.name}
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
                {featured && (
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
                        src={`${FILE_BASE_URL}/uploads/${featured.featuredImage}`}
                        alt={featured.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute bottom-0 right-0 left-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-6">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                          {featured.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base line-clamp-3">
                          {featured.summary}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!featured && !isContent && (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  محتوایی یافت نشد
                </div>
              )}
            </div>
          </div>

          <div className="flex-[1.2]">
            <div className="flex justify-between h-full max-h-96 overflow-y-auto custom-scrollbar">
              <div className="space-y-4 w-full relative flex flex-col h-full">
                {list.map((news: any) => (
                  <motion.div
                    key={news.id}
                    className="group cursor-pointer rounded-xl bg-white p-3 relative overflow-hidden"
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0 relative">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shadow-md relative z-10">
                          {news.featuredImage ? (
                            <img
                              src={`${FILE_BASE_URL}/uploads/${news.featuredImage}`}
                              alt={news.title.slice(0, 5)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="absolute -right-8 -bottom-7 w-24 h-24 rounded-full bg-blue-200/70" />
                      </div>

                      <div className="flex-1 min-w-0 z-10">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-gray-500">
                            {new Date(news.publishDate).toLocaleDateString(
                              "fa-IR",
                            )}
                          </span>
                        </div>
                        <h4 className="text-gray-800 font-bold text-sm md:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {news.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                          {news.summary}
                        </p>
                      </div>
                    </div>

                    <div className="absolute -left-3 -top-7 w-18 h-18 rounded-full bg-blue-100/70" />
                    <div className="absolute -left-9 -top-1 w-18 h-18 rounded-full bg-blue-50/90" />
                  </motion.div>
                ))}

                {!isContent && list.length === 0 && (
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
