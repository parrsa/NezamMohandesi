import boardPic from "@/public/assets/board.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../assembly/[slug]/page";
import { ChevronLeftIcon } from "lucide-react";

const boardList = [
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
  {
    name: "بهمن مومنی مقدم",
    picture: boardPic,
    position: "نایب‌رییس اول و عضو اصلی هیئت‌مدیره",
  },
];

export default function BoardPage() {
  return (
    <div className="p-5">
      <div className="flex items-center py-6 gap-4 text-sm">
        <Link href="/" className="transition-colors flex items-center gap-1">
          <span className="text-gray-400">صفحه اصلی</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <Link
          href="/introduction"
          className="transition-colors flex items-center gap-1"
        >
          <span className="text-gray-400">معرفی سازمان</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <span className="font-medium text-gray-700">هیئت رئیسه</span>
      </div>
      <div className="grid grid-cols-4 gap-3 bg-white rounded-xl p-3 mt-5">
        {boardList.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border border-gray-200 rounded-xl p-2"
          >
            <Image
              width={50}
              height={50}
              src={item.picture}
              alt={item.name}
              quality={100}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-[#475569]">{item.name}</h3>
              <p className="text-sm text-blue-500">{item.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
