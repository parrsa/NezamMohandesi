import React from "react";
import ImagesSlider from "@/app/components/imageSlider";
import Image from "next/image";
import Pic from "@/public/assets/News/Gashnvare.jpg";

const banners = [
  {
    id: 1,
    title: "تحلیل های هوش مصنوعی!",
    subTitle:
      "۷ خرداد، روز نقشه‌برداری، فرصتی ارزشمند برای پاسداشت جایگاه والای مهندسان نقشه‌بردار و نقش بنیادین آنان در توسعه، ایمنی، مدیریت شهری و تصمیم‌سازی‌های کلان کشور است.",
    titleClasses: "text-white text-center",
    subTitleClasses: "text-white text-center",
    iconClasses: "-translate-y-7 w-40",
    date: "1404/10/2 ",
  },
  {
    id: 2,
    title: "هوش مصنوعی!",
    subTitle:
      "۷ خرداد، روز نقشه‌برداری، فرصتی ارزشمند برای پاسداشت جایگاه والای مهندسان نقشه‌بردار و نقش بنیادین آنان در توسعه، ایمنی، مدیریت شهری و تصمیم‌سازی‌های کلان کشور است.",
    titleClasses: "text-white text-center",
    subTitleClasses: "text-white text-center",
    iconClasses: "-translate-y-7 w-40",
    date: "1404/10/2 ",
  },
  {
    id: 3,
    title: "تحلیل های هوش مصنوعی!",
    subTitle:
      "۷ خرداد، روز نقشه‌برداری، فرصتی ارزشمند برای پاسداشت جایگاه والای مهندسان نقشه‌بردار و نقش بنیادین آنان در توسعه، ایمنی، مدیریت شهری و تصمیم‌سازی‌های کلان کشور است.",
    titleClasses: "text-white text-center",
    subTitleClasses: "text-white text-center",
    iconClasses: "-translate-y-7 w-40",
    date: "1404/10/2 ",
  },
];

export default function NewsPage() {
  return (
    <div className="p-5">
      <div className="flex flex-col p-3">
        <div className="flex items-start justify-center p-3 gap-8 bg-blue-100 rounded-t-2xl">
          <div className="bg-white rounded-2xl w-64 h-48 p-3">
            <Image src={Pic} alt="pic" className="h-full" />
          </div>
          <div className="max-w-4xl">
            <ImagesSlider banners={banners} autoPlay />
          </div>
        </div>
        <div className="bg-white flex flex-col gap-3 p-3 rounded-b-2xl">1</div>
      </div>
    </div>
  );
}
