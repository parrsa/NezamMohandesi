// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Omran from "@/public/assets/مهندسی-عمران.jpg";
// import majma_tashakola from "@/public/assets/videos/majma_tashakola.jpg";
// import Danesh from "@/public/assets/videos/Smart-University.webp";
// import { Publication } from "@/app/(client)/publications/types";
// import PublicationCard from "@/app/(client)/publications/components/PublicationCard";
// import DownloadGuide from "@/app/(client)/publications/components/DownloadGuide";

// export const mockPublications: Publication[] = [
//   {
//     id: 1,
//     title: "نشریه فنی مهندسی عمران - شماره ۱۲",
//     description:
//       "برنامه و اهداف کمیسیون های دوره نهم در پیشبرد ساخت و ساز پایدار شهری نظام مهندسی",
//     field: "عمران",
//     version: "1.2",
//     date: "۱۴۰۴/۰۹/۱۵",
//     downloads: 1,
//     coverImage: Omran,
//     rating: 4.8,
//     views: 1,
//     fileSize: "51.5 MB",
//     pdfUrl: "./Pdf/1401-12-21 -.pdf",
//     tags: ["سازه", "زیرساخت", "بتن"],
//   },
//   {
//     id: 2,
//     title: "توسعه ارتباطات با اصناف و تشکل ها دانش بنیان",
//     description: "سازمان نظام مهندسی ساختمان استان تهران",
//     field: "ارتباطات",
//     version: "2.0",
//     date: "۱۴۰۴/۰۹/۱۰",
//     downloads: 1,
//     coverImage: majma_tashakola,
//     rating: 4.9,
//     views: 1,
//     fileSize: "41.2 MB",
//     pdfUrl: "./Pdf/mahname02-esfand_compressed.pdf",
//     tags: ["سازه", "هوشمند", "الکترونیک"],
//   },
//   {
//     id: 3,
//     title: "افزایش دانش مهندسی با تکیه بر آموزش کار آمد و حرفه ای",
//     description: "سازمان نظام مهندسی ساختمان استان تهران",
//     field: "دانش",
//     version: "1.5",
//     date: "۱۴۰۴/۰۹/۰۵",
//     downloads: 1,
//     coverImage: Danesh,
//     rating: 4.7,
//     views: 1,
//     fileSize: "51.1 MB",
//     pdfUrl: "./Pdf/mahname-3-doble- (1).pdf",
//     tags: ["دانش", "شهرسازی", "پایداری", "هوشمند"],
//   },
//   {
//     id: 4,
//     title: "نشریه فنی مهندسی عمران - شماره ۱۲",
//     description:
//       "برنامه و اهداف کمیسیون های دوره نهم در پیشبرد ساخت و ساز پایدار شهری نظام مهندسی",
//     field: "عمران",
//     version: "1.2",
//     date: "۱۴۰۴/۰۹/۱۵",
//     downloads: 1,
//     coverImage: Omran,
//     rating: 4.8,
//     views: 1,
//     fileSize: "51.5 MB",
//     pdfUrl: "./Pdf/1401-12-21 -.pdf",
//     tags: ["سازه", "زیرساخت", "بتن"],
//   },
//   {
//     id: 5,
//     title: "نشریه فنی مهندسی عمران - شماره ۱۲",
//     description:
//       "برنامه و اهداف کمیسیون های دوره نهم در پیشبرد ساخت و ساز پایدار شهری نظام مهندسی",
//     field: "عمران",
//     version: "1.2",
//     date: "۱۴۰۴/۰۹/۱۵",
//     downloads: 1,
//     coverImage: Omran,
//     rating: 4.8,
//     views: 1,
//     fileSize: "51.5 MB",
//     pdfUrl: "./Pdf/1401-12-21 -.pdf",
//     tags: ["سازه", "زیرساخت", "بتن"],
//   },
//   {
//     id: 6,
//     title: "نشریه فنی مهندسی عمران - شماره ۱۲",
//     description:
//       "برنامه و اهداف کمیسیون های دوره نهم در پیشبرد ساخت و ساز پایدار شهری نظام مهندسی",
//     field: "عمران",
//     version: "1.2",
//     date: "۱۴۰۴/۰۹/۱۵",
//     downloads: 1,
//     coverImage: Omran,
//     rating: 4.8,
//     views: 1,
//     fileSize: "51.5 MB",
//     pdfUrl: "./Pdf/1401-12-21 -.pdf",
//     tags: ["سازه", "زیرساخت", "بتن"],
//   },
//   {
//     id: 7,
//     title: "نشریه فنی مهندسی عمران - شماره ۱۲",
//     description:
//       "برنامه و اهداف کمیسیون های دوره نهم در پیشبرد ساخت و ساز پایدار شهری نظام مهندسی",
//     field: "عمران",
//     version: "1.2",
//     date: "۱۴۰۴/۰۹/۱۵",
//     downloads: 1,
//     coverImage: Omran,
//     rating: 4.8,
//     views: 1,
//     fileSize: "51.5 MB",
//     pdfUrl: "./Pdf/1401-12-21 -.pdf",
//     tags: ["سازه", "زیرساخت", "بتن"],
//   },
// ];

// export const fieldColors: Record<string, string> = {
//   عمران: "from-blue-500 to-blue-600",
//   برق: "from-yellow-500 to-orange-600",
//   معماری: "from-purple-500 to-purple-600",
//   صنایع: "from-green-500 to-green-600",
//   مکانیک: "from-red-500 to-red-600",
//   کامپیوتر: "from-cyan-500 to-cyan-600",
// };

// export function PublicationList() {
//   const [selectedField, setSelectedField] = useState<string>("همه");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [sortBy, setSortBy] = useState<"downloads" | "date" | "rating">(
//     "downloads"
//   );

//   const filteredPublications = mockPublications
//     .filter((pub) => {
//       const matchesField =
//         selectedField === "همه" || pub.field === selectedField;
//       const matchesSearch =
//         searchQuery === "" ||
//         pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         pub.tags.some((tag) =>
//           tag.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//       return matchesField && matchesSearch;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "downloads":
//           return b.downloads - a.downloads;
//         case "date":
//           return b.id - a.id;
//         case "rating":
//           return b.rating - a.rating;
//         default:
//           return 0;
//       }
//     });

//   return (
//     <div className="">
//       <div className="w-full ">
//         {filteredPublications.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-20 bg-white rounded-2xl shadow-lg"
//           >
//             <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
//               <svg
//                 className="w-full h-full"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.5"
//                   d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.801 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.801 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               نشریه‌ای یافت نشد
//             </h3>
//             <p className="text-gray-500">
//               لطفاً عبارت جستجو یا دسته‌بندی را تغییر دهید.
//             </p>
//           </motion.div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredPublications.slice(0, 3).map((publication, index) => (
//               <React.Fragment key={index}>
//                 <PublicationCard publication={publication} index={index} />
//               </React.Fragment>
//             ))}
//           </div>
//         )}

//         <DownloadGuide />
//       </div>
//     </div>
//   );
// }

// export default function PublicationsPage() {
//   return <PublicationList />;
// }
