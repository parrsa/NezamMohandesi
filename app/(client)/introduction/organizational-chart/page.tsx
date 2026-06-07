// "use client";
// import {
//   Award,
//   Users,
//   FileCheck,
//   TrendingUp,
//   ChevronLeft as ChevronLeftIcon,
// } from "lucide-react";
// import Link from "next/link";
// import Chart from "@/public/assets/image 5.png";
// import Image from "next/image";
// function AboutOrganization() {
//   const stats = [
//     { icon: Users, label: "اعضای سازمان", value: "۲۵,۰۰۰+", color: "blue" },
//     { icon: Award, label: "پروژه‌های موفق", value: "۱۲,۵۰۰+", color: "green" },
//     {
//       icon: FileCheck,
//       label: "گواهینامه‌های صادر شده",
//       value: "۴۵,۰۰۰+",
//       color: "purple",
//     },
//     { icon: TrendingUp, label: "سال تجربه", value: "۳۵+", color: "orange" },
//   ];

//   const subMenuItems = [
//     "بازرسان",
//     "مدیریت سازمان",
//     "اعضای هیئت رئیسه",
//     "دفتر ریاست",
//     "شورای انتظامی",
//     "چارت سازمان",
//     "مصوبات",
//     "معاونت‌ها",
//     "مجمع سالیانه",
//   ];

//   return (
//     <div className="w-full">
//       <div className="flex items-center py-6 gap-4 text-sm">
//         <Link href="/" className="transition-colors flex items-center gap-1">
//           <span className="text-gray-400">صفحه اصلی</span>
//         </Link>
//         <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

//         <Link href="/introduction" className="transition-colors flex items-center gap-1">
//           <span className="text-gray-400">معرفی سازمان</span>
//         </Link>
//         <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

//         <span className="font-medium text-gray-700">چارت سازمانی</span>
//       </div>

//       <div className="rounded-2xl flex justify-center items-center p-6 md:p-8 ">
//         <Image src={Chart} alt="ic" className="w-[70%] h-[70%]" />
//       </div>
//     </div>
//   );
// }

// export default AboutOrganization;


// app/chart/page.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'فروردین', فروش: 4200, سود: 2400 },
  { name: 'اردیبهشت', فروش: 3800, سود: 1398 },
  { name: 'خرداد', فروش: 6800, سود: 4800 },
  { name: 'تیر', فروش: 5200, سود: 3800 },
  { name: 'مرداد', فروش: 7100, سود: 4300 },
];

export default function ChartPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">نمودار فروش و سود</h1>
      
      <div className="w-full h-[500px] bg-gray-900 rounded-2xl p-6 shadow-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="فروش" stroke="#10B981" strokeWidth={4} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="سود" stroke="#3B82F6" strokeWidth={4} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}