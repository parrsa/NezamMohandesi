import boardPic from "@/public/assets/board.png";
import Image from "next/image";

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
    <div className="grid grid-cols-4 gap-3 bg-white p-5">
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
  );
}
