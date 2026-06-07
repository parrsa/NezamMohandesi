// "use client";

// import { useRouter } from "next/navigation";
// import {
//   BookOpen,
//   Download,
//   Newspaper,
//   Star,
//   TrendingUp,
//   Video,
// } from "lucide-react";
// import LineChart from "../components/Charts/LineChart";
// import { ChartDataPoint } from "../components/Charts/types";
// import PieCharts from "../components/Charts/PieChart";
// import { JSX } from "react";

// const lastPublicationsList = [
//   {
//     title: "مجله مهندسی عمران",
//     trackingCode: "145",
//     domain: "عمران",
//     download: "1,234",
//     score: "4.8",
//     status: "published",
//   },
//   {
//     title: "مجله مهندسی برق",
//     trackingCode: "105",
//     domain: "برق",
//     download: "1,234",
//     score: "4.8",
//     status: "pending",
//   },
//   {
//     title: "مجله مهندسی معماری",
//     trackingCode: "140",
//     domain: "معماری",
//     download: "1,234",
//     score: "4.8",
//     status: "pending",
//   },
// ];

// export default function AdminPage() {
//   const router = useRouter();

//   const features = [
//     {
//       icon: TrendingUp,
//       title: "کل نشریات",
//       value: "3",
//       description: "+12.5% از ماه قبل",
//       page: "/admin/advertising",
//       linear: "from-blue-500 to-purple-600",
//     },
//     {
//       icon: Newspaper,
//       title: "کل اخبار",
//       value: "2",
//       description: "+8.3% از ماه قبل",
//       page: "/admin/news",
//       linear: "from-purple-500 to-pink-600",
//     },
//     {
//       icon: Video,
//       title: "کل ویدیوها",
//       value: "2",
//       description: "+15.7% از ماه قبل",
//       page: "/admin/videos",
//       linear: "from-orange-500 to-red-600",
//     },
//     {
//       icon: BookOpen,
//       title: "درآمد تبلیغات",
//       value: "542M",
//       description: "+22.1% از ماه قبل",
//       page: "/admin/publications",
//       linear: "from-green-500 to-emerald-600",
//     },
//   ];

//   const lineChartData: number[] = [300, 400, 350, 500, 450, 600, 550];

//   const pieChartData: ChartDataPoint[] = [
//     { label: "اقتصادی", value: 35, color: "rgba(59, 130, 246, 0.8)" },
//     { label: "فرهنگی", value: 25, color: "rgba(139, 92, 246, 0.8)" },
//     { label: "سیاسی", value: 20, color: "rgba(16, 185, 129, 0.8)" },
//   ];

//   const handleCardClick = (page: string): void => {
//     router.push(page);
//   };

//   return (
//     <div className="p-7">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {features.map((feature, index) => {
//           const Icon = feature.icon;
//           return (
//             <div
//               onClick={() => handleCardClick(feature.page)}
//               key={index}
//               className="cursor-pointer transition-all group transform hover:-translate-y-2"
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   handleCardClick(feature.page);
//                 }
//               }}
//             >
//               <div className="relative bg-white rounded-2xl p-4 border h-fit flex flex-col gap-1 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
//                 <div
//                   className={`absolute inset-0 bg-linear-to-r ${feature.linear} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
//                   aria-hidden="true"
//                 />

//                 <h3 className="text-gray-500 text-sm font-medium">
//                   {feature.title}
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <p className="text-3xl font-bold text-gray-900">
//                     {feature.value}
//                   </p>
//                   <div
//                     className={`w-14 h-14 bg-linear-to-r ${feature.linear} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <Icon className="w-7 h-7 text-white" aria-hidden="true" />
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <TrendingUp
//                     size={15}
//                     className="text-green-600 text-sm mb-1"
//                     aria-hidden="true"
//                   />
//                   <p className="text-green-600 text-sm font-medium">
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
//         <LineChart data={lineChartData} title="روند عملکرد 6 ماه اخیر" />
//         <PieCharts
//           data={pieChartData}
//           title="توزیع نشریات بر اساس حوزه"
//           showLegend={true}
//         />
//       </div>
//       <div className="max-h-[75vh] overflow-scroll scrollbar-hide rounded-xl no-scrollbar">
//         <table className="border-collapse text-sm text-right lg:w-full md:w-full w-[1700px] rounded-xl">
//           <thead className="bg-blue-500 text-white h-10 sticky top-0 z-10">
//             <tr className="divide-x divide-gray-200">
//               <th className="px-4 py-2 font-light text-center">ردیف</th>
//               <th className="px-4 py-2 font-light text-center">عنوان</th>
//               <th className="px-4 py-2 font-light text-center">حوزه</th>
//               <th className="px-4 py-2 font-light text-center">دانلود</th>
//               <th className="px-4 py-2 font-light text-center">امتیاز</th>
//               <th className="px-4 py-2 font-light text-center">وضعیت</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {lastPublicationsList.map((item, index) => {
//               let badge: JSX.Element;

//               switch (item?.status) {
//                 case "published":
//                   badge = (
//                     <div className="w-fit rounded-full text-[10px] bg-green-100 border border-green-600 text-green-600 px-2 py-1 grid place-items-center mx-auto">
//                       منتشر شده
//                     </div>
//                   );
//                   break;

//                 case "rejected":
//                   badge = (
//                     <div className="w-fit rounded-full text-[10px] bg-red-100 border border-red-600 text-red-600 px-2 py-1 grid place-items-center mx-auto">
//                       رد شده
//                     </div>
//                   );
//                   break;
//                 case "pending":
//                   badge = (
//                     <div className="w-fit rounded-full text-[10px] bg-yellow-100 border border-yellow-600 text-yellow-600 px-2 py-1 grid place-items-center mx-auto">
//                       در حال بررسی
//                     </div>
//                   );
//                   break;
//                 default:
//                   badge = <div>--</div>;
//               }

//               return (
//                 <tr
//                   key={item?.trackingCode}
//                   className={`transition-colors divide-x bg-white divide-gray-200`}
//                 >
//                   <td className="px-4 py-3 font-medium text-gray-700 text-center">
//                     {index + 1}
//                   </td>
//                   <td className="px-4 py-3 text-gray-700 text-center">
//                     {item?.title}
//                     <div className="text-gray-400">
//                       شماره {item?.trackingCode}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-gray-700 text-center">
//                     <div className="w-fit rounded-full text-[10px] bg-blue-100 border border-blue-600 text-blue-600 px-2 py-1 grid place-items-center mx-auto">
//                       {item?.domain ?? "--"}
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-gray-700 text-center">
//                     <div className="flex items-center justify-center gap-2">
//                       <Download color="gray" className="mb-1" size={18} />
//                       <span>{item?.download ?? "--"}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-gray-700 text-center">
//                     <div className="flex items-center justify-center gap-2">
//                       <Star color="gold" size={18} className="mb-1" />
//                       <span>{item?.score ?? "--"}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-gray-700">{badge}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import {
  Newspaper,
  FileText,
  FolderTree,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Calendar,
  Star,
  BookOpen,
} from "lucide-react";
import LineChart from "../components/Charts/LineChart";
import { ChartDataPoint } from "../components/Charts/types";
import PieCharts from "../components/Charts/PieChart";
import { JSX, useEffect } from "react";
import { useHeaderAction } from "../core/provider/HeaderActionProvider/HeaderAction";

const latestPostsList = [
  {
    title: "ابلاغ بخشنامه جدید دیوان عالی کشور",
    trackingCode: "1402-125",
    category: "اخبار",
    view: "1,234",
    score: "4.8",
    status: "published",
    type: "news",
  },
  {
    title: "بررسی حقوقی جرایم سایبری در نظام قضایی",
    trackingCode: "1402-089",
    category: "مقالات",
    view: "987",
    score: "4.5",
    status: "pending",
    type: "article",
  },
  {
    title: "دستورالعمل جدید دادرسی الکترونیک ابلاغ شد",
    trackingCode: "1402-213",
    category: "اخبار",
    view: "2,456",
    score: "4.9",
    status: "published",
    type: "news",
  },
  {
    title: "تحلیلی بر قانون جدید مجازات اسلامی",
    trackingCode: "1402-056",
    category: "مقالات",
    view: "567",
    score: "4.2",
    status: "pending",
    type: "article",
  },
  {
    title: "آخرین تصمیمات شورای عالی قضایی",
    trackingCode: "1402-178",
    category: "اخبار",
    view: "3,211",
    score: "4.7",
    status: "published",
    type: "news",
  },
];



const topAuthors = [
  { name: "دکتر علی رضایی", posts: 45, avatar: "ع", color: "bg-blue-500" },
  { name: "مهدی کریمی", posts: 32, avatar: "م", color: "bg-emerald-500" },
  { name: "سارا حسینی", posts: 28, avatar: "س", color: "bg-amber-500" },
  { name: "رضا محمدی", posts: 21, avatar: "ر", color: "bg-purple-500" },
];

function AdminPage() {
  const router = useRouter();
  const { setAction } = useHeaderAction();

  useEffect(() => {
    setAction(
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-800">پیشخوان</h1>
        <span className="text-sm text-slate-400">|</span>
        <p className="text-sm text-slate-500">سامانه جامع نظام مهندسی</p>
      </div>
    );
  }, [setAction]);

  const statsCards = [
    {
      icon: Newspaper,
      title: "کل اخبار",
      value: "248",
      change: "+12.5%",
      page: "/admin/news",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: FileText,
      title: "کل مقالات",
      value: "186",
      change: "+8.3%",
      page: "/admin/articles",
      color: "from-emerald-600 to-emerald-700",
    },
    {
      icon: FolderTree,
      title: "دسته‌بندی‌ها",
      value: "15",
      change: "+2 جدید",
      page: "/admin/categories",
      color: "from-amber-600 to-amber-700",
    },
    {
      icon: Eye,
      title: "بازدید کل",
      value: "125K",
      change: "+22.1%",
      page: "/admin/statistics",
      color: "from-purple-600 to-purple-700",
    },
  ];

  const lineChartData: number[] = [1250, 1480, 1320, 1650, 1820, 2100];

  const pieChartData: ChartDataPoint[] = [
    { label: "اخبار و اطلاعیه‌ها", value: 40, color: "rgba(59, 130, 246, 0.8)" },
    { label: "مقالات تخصصی حقوقی", value: 35, color: "rgba(16, 185, 129, 0.8)" },
    { label: "آرای قضایی", value: 15, color: "rgba(245, 158, 11, 0.8)" },
    { label: "قوانین و آیین‌نامه‌ها", value: 10, color: "rgba(139, 92, 246, 0.8)" },
  ];

  const handleCardClick = (page: string): void => {
    router.push(page);
  };

  const getStatusBadge = (status: string): JSX.Element => {
    switch (status) {
      case "published":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium w-fit mx-auto">
            <CheckCircle size={12} />
            <span>منتشر شده</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-medium w-fit mx-auto">
            <XCircle size={12} />
            <span>رد شده</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium w-fit mx-auto">
            <Clock size={12} />
            <span>در حال بررسی</span>
          </div>
        );
      default:
        return <div className="text-gray-400 text-xs">--</div>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "news":
        return <Newspaper size={14} className="text-blue-500" />;
      case "article":
        return <FileText size={14} className="text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              onClick={() => handleCardClick(card.page)}
              key={index}
              className="group cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(card.page);
                }
              }}
            >
              <div className="relative bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-800 mt-2">
                      {card.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={12} className="text-emerald-600" />
                      <span className="text-emerald-600 text-xs font-medium">
                        {card.change}
                      </span>
                      <span className="text-slate-400 text-xs">از ماه قبل</span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 bg-linear-to-br ${card.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                آمار بازدید ماهانه
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                روند بازدید از اخبار و مقالات
              </p>
            </div>
            <span className="text-xs text-slate-400">سال 1402</span>
          </div>
          <LineChart
            data={lineChartData}
            title=""
          />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                توزیع محتوا بر اساس دسته‌بندی
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                نسبت درصدی هر دسته
              </p>
            </div>
            <span className="text-xs text-slate-400">کل محتواها</span>
          </div>
          <PieCharts data={pieChartData} title="" showLegend={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">
                آخرین اخبار و مقالات
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                جدیدترین محتوای منتشر شده
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/posts")}
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              مشاهده همه ←
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">
                    ردیف
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">
                    عنوان
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">
                    دسته
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">
                    بازدید
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">
                    وضعیت
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {latestPostsList.slice(0, 4).map((item, index) => {
                  return (
                    <tr
                      key={item.trackingCode}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/admin/posts/${item.trackingCode}`)}
                    >
                      <td className="px-4 py-3 text-slate-500 text-sm">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <div>
                            <p className="font-medium text-slate-800 text-sm">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              کد: {item.trackingCode}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-md text-xs ${item.category === "اخبار"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-emerald-50 text-emerald-600"
                            }`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Eye size={14} className="text-slate-400" />
                          <span>{item.view}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(item.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">نویسندگان برتر</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                بیشترین محتوای منتشر شده
              </p>
            </div>
            <Users size={18} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {topAuthors.map((author, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 ${author.color} rounded-full flex items-center justify-center text-white text-sm font-medium`}
                  >
                    {author.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {author.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {author.posts} مطلب
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-500" />
                  <span className="text-xs text-slate-500">
                    +{Math.floor(Math.random() * 20) + 5}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">انتشار امروز</p>
                <p className="text-lg font-bold text-slate-800">۸ مطلب</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">در انتظار بررسی</p>
                <p className="text-lg font-bold text-amber-600">۳ مطلب</p>
              </div>
              <Calendar size={20} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;