"use client";
import {
  Award,
  Users,
  FileCheck,
  TrendingUp,
  ChevronLeft as ChevronLeftIcon,
} from "lucide-react";
import Link from "next/link";
import Chart from "@/public/assets/image 5.png";
import Image from "next/image";
function AboutOrganization() {
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
    "بازرسان",
    "مدیریت سازمان",
    "اعضای هیئت رئیسه",
    "دفتر ریاست",
    "شورای انتظامی",
    "چارت سازمان",
    "مصوبات",
    "معاونت‌ها",
    "مجمع سالیانه",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center py-6 gap-4 text-sm">
        <Link href="/" className="transition-colors flex items-center gap-1">
          <span className="text-gray-400">صفحه اصلی</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <Link href="/introduction" className="transition-colors flex items-center gap-1">
          <span className="text-gray-400">معرفی سازمان</span>
        </Link>
        <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

        <span className="font-medium text-gray-700">چارت سازمانی</span>
      </div>

      <div className="rounded-2xl flex justify-center items-center p-6 md:p-8 ">
        <Image src={Chart} alt="ic" className="w-[70%] h-[70%]" />
      </div>
    </div>
  );
}

export default AboutOrganization;


// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'فروردین', فروش: 4200, سود: 2400 },
//   { name: 'اردیبهشت', فروش: 3800, سود: 1398 },
//   { name: 'خرداد', فروش: 6800, سود: 4800 },
//   { name: 'تیر', فروش: 5200, سود: 3800 },
//   { name: 'مرداد', فروش: 7100, سود: 4300 },
// ];

// export default function ChartPage() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">نمودار فروش و سود</h1>
      
//       <div className="w-full h-[500px] bg-gray-900 rounded-2xl p-6 shadow-2xl">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//             <XAxis dataKey="name" stroke="#9CA3AF" />
//             <YAxis stroke="#9CA3AF" />
//             <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
//             <Legend />
//             <Line type="monotone" dataKey="فروش" stroke="#10B981" strokeWidth={4} dot={{ r: 6 }} />
//             <Line type="monotone" dataKey="سود" stroke="#3B82F6" strokeWidth={4} dot={{ r: 6 }} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


// "use client";
// import {
//   Award,
//   Users,
//   FileCheck,
//   TrendingUp,
//   ChevronLeft as ChevronLeftIcon,
//   Target,
//   Lightbulb,
//   Shield,
//   Clock,
// } from "lucide-react";
// import Link from "next/link";

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

//   // کارت‌های فلوچارت
//   const flowchartCards = {
//     top: {
//       title: "مدیریت سازمان",
//       icon: Shield,
//       description: "هیئت مدیره و مدیرعامل",
//       color: "from-blue-500 to-indigo-600",
//     },
//     bottomLeft: [
//       {
//         title: "معاونت فنی",
//         icon: Target,
//         description: "نظارت بر پروژه‌ها",
//         color: "from-green-500 to-emerald-600",
//       },
//       {
//         title: "معاونت مالی",
//         icon: TrendingUp,
//         description: "بودجه و حسابداری",
//         color: "from-yellow-500 to-amber-600",
//       },
//     ],
//     bottomRight: [
//       {
//         title: "معاونت بازرسی",
//         icon: FileCheck,
//         description: "بازرسی و نظارت",
//         color: "from-purple-500 to-violet-600",
//       },
//       {
//         title: "دبیرخانه",
//         icon: Clock,
//         description: "امور اداری و پشتیبانی",
//         color: "from-rose-500 to-pink-600",
//       },
//     ],
//   };

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
//     <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* مسیر یابی */}
//       <div className="container mx-auto px-4 pt-6">
//         <div className="flex items-center py-6 gap-4 text-sm flex-wrap">
//           <Link href="/" className="transition-colors flex items-center gap-1">
//             <span className="text-gray-400 hover:text-gray-600">صفحه اصلی</span>
//           </Link>
//           <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

//           <Link
//             href="/introduction"
//             className="transition-colors flex items-center gap-1"
//           >
//             <span className="text-gray-400 hover:text-gray-600">معرفی سازمان</span>
//           </Link>
//           <ChevronLeftIcon className="w-4 h-4 text-gray-400" />

//           <span className="font-medium text-gray-700">چارت سازمانی</span>
//         </div>
//       </div>

//       {/* عنوان صفحه */}
//       <div className="container mx-auto px-4 mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 text-right">
//           چارت سازمانی
//         </h1>
//         <p className="text-gray-500 text-right mt-2">
//           ساختار مدیریتی و سازمانی مجموعه
//         </p>
//       </div>

//       {/* فلوچارت */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="relative flex flex-col items-center justify-center">
//           {/* خطوط اتصال عمودی */}
//           <div className="hidden lg:block absolute top-[180px] left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-400 z-0"></div>

//           {/* خطوط اتصال افقی سمت چپ */}
//           <div className="hidden lg:block absolute top-[260px] left-1/4 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 z-0"></div>

//           {/* خطوط اتصال افقی سمت راست */}
//           <div className="hidden lg:block absolute top-[260px] right-1/4 transform translate-x-1/2 w-32 h-0.5 bg-gradient-to-l from-gray-300 to-gray-400 z-0"></div>

//           {/* کارت بالایی (وسط) */}
//           <div className="relative z-10 mb-16 w-full max-w-md">
//             <div className="relative group">
//               <div
//                 className={`absolute inset-0 bg-gradient-to-r ${flowchartCards.top.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-300`}
//               ></div>
//               <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1 text-right">
//                     <h3 className="text-xl font-bold text-gray-800 mb-2">
//                       {flowchartCards.top.title}
//                     </h3>
//                     <p className="text-gray-500 text-sm">
//                       {flowchartCards.top.description}
//                     </p>
//                   </div>
//                   <div
//                     className={`w-14 h-14 rounded-xl bg-gradient-to-r ${flowchartCards.top.color} flex items-center justify-center ml-4 shadow-lg`}
//                   >
//                     <flowchartCards.top.icon className="w-7 h-7 text-white" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* کارت‌های پایین (دو تا چپ - دو تا راست) */}
//           <div className="flex flex-col lg:flex-row justify-center items-start gap-8 w-full max-w-5xl">
//             {/* سمت چپ */}
//             <div className="flex-1 w-full">
//               <div className="space-y-6">
//                 {flowchartCards.bottomLeft.map((card, index) => (
//                   <div key={index} className="relative group">
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-300`}
//                     ></div>
//                     <div className="relative bg-white rounded-2xl shadow-xl p-5 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1 text-right">
//                           <h3 className="text-lg font-bold text-gray-800 mb-1">
//                             {card.title}
//                           </h3>
//                           <p className="text-gray-500 text-xs">
//                             {card.description}
//                           </p>
//                         </div>
//                         <div
//                           className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center ml-3 shadow-lg`}
//                         >
//                           <card.icon className="w-6 h-6 text-white" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* فلتر مرکزی */}
//             <div className="hidden lg:flex items-center justify-center px-4">
//               <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//                 <span className="text-gray-500 text-sm">←→</span>
//               </div>
//             </div>

//             {/* سمت راست */}
//             <div className="flex-1 w-full">
//               <div className="space-y-6">
//                 {flowchartCards.bottomRight.map((card, index) => (
//                   <div key={index} className="relative group">
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-300`}
//                     ></div>
//                     <div className="relative bg-white rounded-2xl shadow-xl p-5 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//                       <div className="flex items-center justify-between">
//                         <div className="flex-1 text-right">
//                           <h3 className="text-lg font-bold text-gray-800 mb-1">
//                             {card.title}
//                           </h3>
//                           <p className="text-gray-500 text-xs">
//                             {card.description}
//                           </p>
//                         </div>
//                         <div
//                           className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center ml-3 shadow-lg`}
//                         >
//                           <card.icon className="w-6 h-6 text-white" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* نمایش آمار در پایین */}
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold text-gray-800 text-right mb-8">
//             آمار سازمان
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               const colorClasses = {
//                 blue: "from-blue-500 to-blue-600",
//                 green: "from-green-500 to-green-600",
//                 purple: "from-purple-500 to-purple-600",
//                 orange: "from-orange-500 to-orange-600",
//               };
//               return (
//                 <div
//                   key={index}
//                   className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   <div
//                     className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorClasses[stat.color]} flex items-center justify-center mx-auto mb-4 shadow-md`}
//                   >
//                     <Icon className="w-7 h-7 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-1">
//                     {stat.value}
//                   </h3>
//                   <p className="text-gray-500 text-sm">{stat.label}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* منوی زیرین */}
//         <div className="mt-16 pt-8 border-t border-gray-200">
//           <div className="flex flex-wrap justify-center gap-3">
//             {subMenuItems.map((item, index) => (
//               <button
//                 key={index}
//                 className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 text-sm transition-all duration-200 hover:scale-105"
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutOrganization;