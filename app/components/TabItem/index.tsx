"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Laptop from "@/public/assets/Laptop.png";
import Image from "next/image";
interface TabItem {
  id: string;
  label: string;
  content: {
    title: string;
    description: string;
  };
}

const tabs: TabItem[] = [
  {
    id: "integrated",
    label: "سامانه یکپارچه",
    content: {
      title: "سامانه یکپارچه نظام مهندسی",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    },
  },
  {
    id: "engineering",
    label: "سامانه خدمات مهندسی",
    content: {
      title: "سامانه خدمات مهندسی",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.",
    },
  },
  {
    id: "correspondence",
    label: "سامانه مکاتبات گیشه",
    content: {
      title: "سامانه مکاتبات گیشه",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.",
    },
  },
  {
    id: "membership",
    label: "سامانه عضویت",
    content: {
      title: "سامانه عضویت",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت.",
    },
  },
];

export function ServiceTabs() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full bg-blue-900 py-6 p-4 ">
      <div className="mx-auto ">
        <div className="mb-2">
          <h1 className="text-center font-medium text-white text-2xl">
            خدمات الکترونیک
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="text-right col-span-3">
            <div className="relative">
              <div className="flex flex-wrap gap-1 border-b border-white/20">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-3 text-base md:text-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-white/60 hover:text-white/80"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabLine"
                        className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-400 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-white/80 leading-relaxed text-justify">
                    {activeTabContent?.description}
                  </p>
                  <button className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    ورود به سامانه
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex col-span-2 justify-center items-center">
            <div className="w-full h-[300px]  rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <div className="text-center text-white/50">
                <Image src={Laptop} alt={"sda"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
