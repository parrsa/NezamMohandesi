import React from "react";
import Link from "next/link";
import Image from "next/image";
import Pic from "@/public/assets/News/Gashnvare.jpg";
import { ArrowIcon } from "@/app/(client)/introduction/assembly/[id]/page";
import { DateIcon } from "../page";

export default function NewsDetails() {
  return (
    <div className="p-3">
      <div className="flex items-center gap-4 mb-3">
        <p className="text-gray-400 text-sm">صفحه اصلی</p>
        <ArrowIcon />
        <Link href={"/news"} className="text-gray-600 text-sm">
          اخبار
        </Link>
      </div>
      <div className="p-4 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <p className="text-gray-800 text-sm">اخبار</p>
          <Link href={"/news"}>
            <ArrowIcon />
          </Link>
        </div>
        <div className="py-3 px-6 flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Image
              src={Pic}
              alt="pic"
              width={250}
              height={200}
              className="rounded-xl"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-blue-800">
                پیام تبریک به مناسبت ۷ خرداد، روز نقشه‌برداری
              </p>
              <p className="text-sm font-bold text-gray-800">
                ۷ خرداد، روز نقشه‌برداری، فرصتی ارزشمند برای پاسداشت جایگاه
                والای مهندسان نقشه‌بردار و نقش بنیادین آنان در توسعه، ایمنی،
                مدیریت شهری و تصمیم‌سازی‌های کلان کشور است.
              </p>
              <div className="flex items-center gap-1">
                <DateIcon />
                <p className="text-[13px] text-gray-600">1404/10/2 </p>
              </div>
            </div>
          </div>
          <p className="text-sm font-bold text-gray-800 leading-7">
            امروزه اهمیت اطلاعات مکانی و فناوری‌های ژئوماتیکی در تصمیم‌گیری،
            برنامه‌ریزی شهری، مدیریت زیرساخت‌ها، پایش منابع، توزیع کارآمد انرژی
            و تحقق حکمرانی هوشمند بیش از گذشته آشکار شده است. مهندسان نقشه‌بردار
            با تولید، تحلیل و مدیریت داده‌های مکانی دقیق، نقشی مؤثر در توسعه
            پایدار، کاهش اتلاف منابع، افزایش تاب‌آوری زیرساخت‌ها و تصمیم‌سازی
            علمی ایفا می‌کنند.در حوزه ساخت‌وساز و شهرسازی نیز نقش مهندسان
            نقشه‌بردار، نقشی زیربنایی و تعیین‌کننده است. از مرحله شناسایی و
            برداشت وضع موجود زمین، تعیین حدود و موقعیت ملک، جانمایی صحیح
            ساختمان، کنترل ترازها و ابعاد، پایش گودبرداری، انطباق عملیات اجرایی
            با نقشه‌های مصوب و پروانه ساختمانی، تا تهیه نقشه‌های تفکیکی و
            مستندات دقیق ملکی، حضور مهندس نقشه‌بردار موجب افزایش دقت، کاهش
            خطاهای اجرایی، پیشگیری از اختلافات حقوقی، جلوگیری از مغایرت‌های
            ساختمانی و ارتقای کیفیت ساخت‌وساز می‌شود.علم ژئوماتیک، به‌عنوان یکی
            از ارکان اصلی فناوری‌های نوین مکانی، نقشی تعیین‌کننده در سامانه‌های
            آفندی و پدافندی، مدیریت بحران، ارزیابی و تخمین خسارت، امدادرسانی،
            نجات مجروحان و آسیب‌دیدگان و کاهش آثار حوادث طبیعی و غیرطبیعی دارد.
            بهره‌گیری صحیح از داده‌های مکانی می‌تواند در لحظات حساس، مسیر
            تصمیم‌گیری را روشن‌تر کرده و زمینه‌ساز واکنش سریع‌تر، دقیق‌تر و
            مؤثرتر دستگاه‌های مسئول باشد.سازمان نظام مهندسی ساختمان استان تهران،
            ضمن گرامی‌داشت ۷ خرداد، روز نقشه‌برداری، این روز را به تمامی مهندسان
            نقشه‌بردار، تبریک عرض نموده و برای آنان سربلندی و توفیق روزافزون
            آرزومند است.از طرف مهندس مهدی محرمی شام‌اسبی رییسو مهندس بهمن مومنی
            مقدم نایب‌رییس اولسازمان نظام مهندسی ساختمان استان تهران
          </p>
        </div>
      </div>
    </div>
  );
}
