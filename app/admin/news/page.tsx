// 'use client';

// import { useState, useEffect } from 'react';
// import { generatePageNumbers } from '@/app/lib/generatePageNumbers';
// import useTruncateText from '@/app/lib/useTruncateText';
// import { Edit, Plus, Eye, Star, Pin, Loader2 } from 'lucide-react';
// import { useHeaderAction } from '@/app/core/provider/HeaderActionProvider/HeaderAction';
// import { Button } from '@/app/components/button/Button';
// import { useCreateNews, useGetAllNews, useUpdateNews } from '@/app/core/services/News/useNews';
// import { toastify } from '@/app/components/Toasts';
// import Pagination from '@/app/components/Pagination';
// import { News, NewsWithImage } from '@/app/core/services/News/type';
// import { useQuery } from '@tanstack/react-query';
// import AddNews from './components/AddNews';
// import EditNews from './components/EditNews';
// interface NewsCardProps {
//     item: News;
//     onEdit: (item: News, imageSrc: string | null) => void;
// }

// const NewsCard = ({ item, onEdit }: NewsCardProps) => {
//     const [imageSrc, setImageSrc] = useState<string | null>(null);
//     const leadParagraph = useTruncateText(item.leadParagraph, 120);
//     const body = useTruncateText(item.body, 200);

//     const { data: imageData, isLoading: isImageLoading } = useQuery({
//         queryKey: ['newsImage', item.newsFileId],
//         queryFn: async () => {
//             if (!item.newsFileId) return null;
//             try {
//                 const response = await fetch(`http://10.0.1.141:8082/Api/File/DownloadFileById?fileId=${item.newsFileId}`, {
//                     method: "POST"
//                 });
//                 if (!response.ok) throw new Error('Failed to load image');
//                 return URL.createObjectURL(await response.blob());
//             } catch {
//                 return null;
//             }
//         },
//         enabled: !!item.newsFileId,
//     });

//     useEffect(() => {
//         if (imageData) {
//             setImageSrc(imageData);
//         }
//         return () => {
//             if (imageData) {
//                 URL.revokeObjectURL(imageData);
//             }
//         };
//     }, [imageData]);

//     const formatDate = (timestamp: number) => {
//         if (!timestamp) return 'نامشخص';
//         const date = new Date(timestamp);
//         return date.toLocaleDateString('fa-IR');
//     };

//     return (
//         <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] h-[480px] flex flex-col">
//             <div className="relative h-48 overflow-hidden rounded-t-2xl">
//                 {isImageLoading ? (
//                     <div className="w-full h-full bg-linear-to-r from-gray-100 to-gray-200 flex items-center justify-center">
//                         <Loader2 size={24} className="text-gray-400 animate-spin" />
//                     </div>
//                 ) : imageSrc ? (
//                     <img
//                         src={imageSrc}
//                         alt={item.headline}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                 ) : (
//                     <div className="w-full h-full bg-linear-to-r from-blue-50 to-purple-50 flex items-center justify-center">
//                         <Eye size={32} className="text-gray-400" />
//                     </div>
//                 )}

//                 <div className="absolute top-3 left-3 flex flex-col gap-2">
//                     {item.isExclusive && (
//                         <span className="bg-linear-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
//                             <Star size={12} className="inline ml-1" />
//                             انحصاری
//                         </span>
//                     )}
//                     {item.isSticky && (
//                         <span className="bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
//                             <Pin size={12} className="inline ml-1" />
//                             مهم
//                         </span>
//                     )}
//                 </div>

//                 <button
//                     onClick={() => onEdit(item, imageSrc)}
//                     className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg backdrop-blur-sm"
//                     title="ویرایش خبر"
//                 >
//                     <Edit size={18} />
//                 </button>

//                 <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
//                     👁️ {item.viewCount.toLocaleString('fa-IR')} بازدید
//                 </div>
//             </div>

//             <div className="flex-1 p-5 flex flex-col">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                     {item.headline || item.shortTitle}
//                 </h3>

//                 {item.credit && (
//                     <p className="text-sm text-gray-500 mb-3">
//                         ✍️ نویسنده: {item.credit}
//                     </p>
//                 )}

//                 <div className="mb-4 flex-1">
//                     <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
//                         {leadParagraph}
//                     </p>
//                 </div>

//                 <div className="mt-auto pt-4 border-t border-gray-100">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <div className="flex items-center gap-2">
//                                 <div className="flex items-center gap-1">
//                                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                                     <span className="text-xs text-gray-600">👍 {item.likes}</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                     <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                                     <span className="text-xs text-gray-600">👎 {item.disLikes}</span>
//                                 </div>
//                             </div>

//                             {item.publishDate > 0 && (
//                                 <div className="text-xs text-gray-500">
//                                     📅 {formatDate(item.publishDate)}
//                                 </div>
//                             )}
//                         </div>

//                         <div className="text-xs text-gray-400">
//                             کد: {item.code}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
//         </div>
//     );
// };

// export default function NewsFeed() {
//     const [currentPage, setCurrentPage] = useState(0);
//     const { setAction } = useHeaderAction();
//     const { data: newsData, isLoading, refetch } = useGetAllNews(currentPage, 12);
//     const totalPages = newsData ? Math.ceil(newsData.totalRecord / newsData.pageSize) : 1;
//     const pageNumbers = generatePageNumbers(totalPages, currentPage);

//     const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedNews, setSelectedNews] = useState<NewsWithImage | null>(null);

//     const { mutate: createNews, isPending: isCreating } = useCreateNews();
//     const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();

//     useEffect(() => {
//         setAction(
//             <div className="flex items-center justify-between w-full">
//                 <div className="flex items-center gap-4">
//                     <div className="p-2 rounded-xl bg-linear-to-r from-blue-500/10 to-purple-500/10">
//                         <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
//                             <Eye size={20} className="text-white" />
//                         </div>
//                     </div>
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-800">مدیریت خبرها</h1>
//                         <p className="text-gray-500 text-sm">ساخت، ویرایش و مدیریت محتوای خبری</p>
//                     </div>
//                 </div>
//             </div>
//         );
//         return () => setAction(null);
//     }, []);

//     const handleEditNews = (item: News, imageSrc: string | null) => {
//         setSelectedNews({ ...item, imageSrc });
//         setUploadedImageFile(null);
//         setIsEditModalOpen(true);
//     };

//     const handleAddSubmit = async (values: any, { setSubmitting }: any) => {
//         const formData = new FormData();

//         formData.append('Body', values.body);
//         formData.append('LeadParagraph', values.leadParagraph);
//         formData.append('Caption', values.caption);
//         formData.append('Credit', values.credit);
//         formData.append('Headline', values.headline);
//         formData.append('ShortTitle', values.shortTitle);
//         formData.append('SeoTitle', values.seoTitle);
//         formData.append('IsExclusive', values.isExclusive.toString());
//         formData.append('IsSticky', values.isSticky.toString());
//         formData.append('PublishDate', values.publishDate.toString());
//         formData.append('PublishTime', values.publishTime.toString());
//         formData.append('ExpireDate', values.expireDate.toString());
//         formData.append('ExpireTime', values.expireTime.toString());

//         if (uploadedImageFile) {
//             formData.append('NewsFile', uploadedImageFile);
//         }

//         try {
//             await createNews(formData);
//             toastify('success', '📰 خبر با موفقیت اضافه شد');
//             refetch();
//             setIsAddModalOpen(false);
//             setUploadedImageFile(null);
//         } catch (error: any) {
//             toastify('error', error?.message || 'خطا در ایجاد خبر');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const handleEditSubmit = async (values: any, { setSubmitting }: any) => {
//         if (!selectedNews) return;

//         const formData = new FormData();

//         formData.append('Id', selectedNews.id);
//         formData.append('Body', values.body);
//         formData.append('LeadParagraph', values.leadParagraph);
//         formData.append('Caption', values.caption);
//         formData.append('Credit', values.credit);
//         formData.append('Headline', values.headline);
//         formData.append('ShortTitle', values.shortTitle);
//         formData.append('SeoTitle', values.seoTitle);
//         formData.append('IsExclusive', values.isExclusive.toString());
//         formData.append('IsSticky', values.isSticky.toString());
//         formData.append('PublishDate', values.publishDate.toString());
//         formData.append('PublishTime', values.publishTime.toString());
//         formData.append('ExpireDate', values.expireDate.toString());
//         formData.append('ExpireTime', values.expireTime.toString());

//         if (uploadedImageFile) {
//             formData.append('NewsFile', uploadedImageFile);
//         }

//         try {
//             await updateNews(formData);
//             toastify('success', '✅ خبر با موفقیت بروزرسانی شد');
//             refetch();
//             setIsEditModalOpen(false);
//             setSelectedNews(null);
//         } catch (error: any) {
//             toastify('error', error?.message || 'خطا در بروزرسانی خبر');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const stats = {
//         total: newsData?.totalRecord || 0,
//         exclusive: newsData?.data?.filter(item => item.isExclusive).length || 0,
//         sticky: newsData?.data?.filter(item => item.isSticky).length || 0,
//     };

//     return (
//         <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6">
//             <div className="w-full mx-auto">
//                 <div className="mb-10">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//                         <div>
//                             <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                                 اخبار و مقالات
//                             </h2>
//                             <p className="text-gray-600 text-lg max-w-2xl">
//                                 مدیریت حرفه‌ای محتوای خبری با قابلیت‌های پیشرفته نمایش و ویرایش
//                             </p>
//                         </div>

//                         <Button
//                             onClick={() => setIsAddModalOpen(true)}
//                             className="flex items-center gap-3 px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//                         >
//                             <Plus size={22} />
//                             <span className="font-semibold">افزودن خبر جدید</span>
//                         </Button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                         <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-gray-500 text-sm">تعداد کل خبرها</p>
//                                     <p className="text-3xl font-bold text-gray-800 mt-2">
//                                         {stats.total.toLocaleString('fa-IR')}
//                                     </p>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-blue-50">
//                                     <Eye className="text-blue-500" size={24} />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-gray-500 text-sm">خبرهای انحصاری</p>
//                                     <p className="text-3xl font-bold text-gray-800 mt-2">
//                                         {stats.exclusive}
//                                     </p>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-yellow-50">
//                                     <Star className="text-yellow-500" size={24} />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <p className="text-gray-500 text-sm">خبرهای مهم</p>
//                                     <p className="text-3xl font-bold text-gray-800 mt-2">
//                                         {stats.sticky}
//                                     </p>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-red-50">
//                                     <Pin className="text-red-500" size={24} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {isLoading ? (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <div className="relative">
//                             <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-300 border-t-blue-500"></div>
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <Eye className="text-blue-500" size={24} />
//                             </div>
//                         </div>
//                         <p className="mt-6 text-gray-600 font-medium">در حال بارگذاری خبرها...</p>
//                         <p className="text-gray-400 text-sm mt-2">لطفا چند لحظه صبر کنید</p>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                             {newsData?.data?.map((item: News) => (
//                                 <NewsCard
//                                     key={item.id}
//                                     item={item}
//                                     onEdit={handleEditNews}
//                                 />
//                             ))}
//                         </div>

//                         {(!newsData?.data || newsData.data.length === 0) && (
//                             <div className="text-center py-20">
//                                 <div className="w-24 h-24 mx-auto bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
//                                     <Eye className="text-blue-500" size={40} />
//                                 </div>
//                                 <h3 className="text-2xl font-bold text-gray-700 mb-3">خبری یافت نشد</h3>
//                                 <p className="text-gray-500 mb-8">هنوز هیچ خبری اضافه نکرده‌اید</p>
//                                 <Button
//                                     onClick={() => setIsAddModalOpen(true)}
//                                     className="mx-auto flex items-center gap-2"
//                                 >
//                                     <Plus size={20} />
//                                     افزودن اولین خبر
//                                 </Button>
//                             </div>
//                         )}

//                         {newsData?.data && newsData.data.length > 0 && (
//                             <div className="mt-12">
//                                 <Pagination
//                                     pageNumbers={pageNumbers}
//                                     currentPage={currentPage}
//                                     onPageChange={setCurrentPage}
//                                 />
//                             </div>
//                         )}
//                     </>
//                 )}

//                 {isAddModalOpen && (
//                     <AddNews
//                         uploadedImageFile={uploadedImageFile}
//                         setUploadedImageFile={setUploadedImageFile}
//                         handleSubmit={handleAddSubmit}
//                         isVisible={isAddModalOpen}
//                         showModalAddNews={isAddModalOpen}
//                         onClose={() => {
//                             setIsAddModalOpen(false);
//                             setUploadedImageFile(null);
//                         }}
//                         isSubmitting={isCreating}
//                     />
//                 )}

//                 {isEditModalOpen && selectedNews && (
//                     <EditNews
//                         showModalAddNews={isEditModalOpen}
//                         onClose={() => {
//                             setIsEditModalOpen(false);
//                             setSelectedNews(null);
//                         }}
//                         isVisible={isEditModalOpen}
//                         uploadedImageFile={uploadedImageFile}
//                         setUploadedImageFile={setUploadedImageFile}
//                         item={selectedNews}
//                         handleSubmit={handleEditSubmit}
//                         isSubmitting={isUpdating}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     Newspaper,
//     Plus,
//     Search,
//     Star,
//     Pin,
//     Eye,
//     Grid,
//     List,
//     AlertCircle,
//     Loader2
// } from 'lucide-react';
// import { toast } from 'react-toastify';

// // Import components
// import { StatCard } from './components/StatCard';
// import { NewsCard } from './components/NewsCard';
// import { NewsModal } from './components/NewsModal';
// import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
// import { NewsFilters } from './components/NewsFilters';
// import { NewsPagination } from './components/NewsPagination';

// // Import hooks and types
// import { useGetAllNews, useCreateNews, useUpdateNews, useDeleteNews } from '@/app/core/services/News/useNews';
// import { News, NewsWithImage } from '@/app/core/services/News/type';

// export default function NewsManagementPage() {
//     const [currentPage, setCurrentPage] = useState(0);
//     const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterType, setFilterType] = useState<'all' | 'exclusive' | 'sticky'>('all');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedNews, setSelectedNews] = useState<NewsWithImage | null>(null);
//     const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
//     const [newsToDelete, setNewsToDelete] = useState<string | null>(null);
//     const [newsWithImages, setNewsWithImages] = useState<NewsWithImage[]>([]);

//     // Use React Query hooks
//     const { data, isLoading, error, refetch } = useGetAllNews(currentPage, 12);
//     const { mutate: createNews, isPending: isCreating } = useCreateNews();
//     const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();
//     const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

//     // Update local state when data changes
//     useEffect(() => {
//         if (data?.data) {
//             setNewsWithImages(data.data);
//         }
//     }, [data]);

//     // Filter news based on search and filter type
//     const filteredNews = newsWithImages.filter(news => {
//         const matchesSearch = 
//             news.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             news.shortTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             news.credit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             String(news.code).includes(searchTerm);

//         if (filterType === 'exclusive') return matchesSearch && news.isExclusive;
//         if (filterType === 'sticky') return matchesSearch && news.isSticky;
//         return matchesSearch;
//     });

//     // Stats calculation
//     const stats = {
//         total: data?.totalRecord || 0,
//         exclusive: newsWithImages.filter(n => n.isExclusive).length,
//         sticky: newsWithImages.filter(n => n.isSticky).length,
//         totalViews: newsWithImages.reduce((acc, curr) => acc + (curr.viewCount || 0), 0),
//     };

//     // Handle edit
//     const handleEdit = (news: NewsWithImage) => {
//         setSelectedNews(news);
//         setIsModalOpen(true);
//     };

//     // Handle delete
//     const handleDelete = (id: string) => {
//         setNewsToDelete(id);
//         setIsDeleteConfirmOpen(true);
//     };

//     // Handle form submit
//     const handleSubmit = async (formData: FormData) => {
//         try {
//             if (selectedNews) {
//                 updateNews(formData, {
//                     onSuccess: () => {
//                         toastify("success",'خبر با موفقیت بروزرسانی شد');
//                         setIsModalOpen(false);
//                         setSelectedNews(null);
//                         refetch();
//                     },
//                     onError: (error: any) => {
//                         toast.error(error?.message || 'خطا در بروزرسانی خبر');
//                     }
//                 });
//             } else {
//                 createNews(formData, {
//                     onSuccess: () => {
//                         toastify("success",'خبر با موفقیت ایجاد شد');
//                         setIsModalOpen(false);
//                         refetch();
//                     },
//                     onError: (error: any) => {
//                         toast.error(error?.message || 'خطا در ایجاد خبر');
//                     }
//                 });
//             }
//         } catch (error) {
//             console.error('Submit error:', error);
//         }
//     };

//     // Handle confirm delete
//     const confirmDelete = async () => {

//             const formDataToSend = new FormData();
//             formDataToSend.append("newsId" , newsToDelete)
//             deleteNews(formDataToSend, {
//                 onSuccess: () => {
//                     toastify("success",'خبر با موفقیت حذف شد');
//                     setIsDeleteConfirmOpen(false);
//                     setNewsToDelete(null);
//                     refetch();
//                 },
//                 onError: (error: any) => {
//                     toast.error(error?.message || 'خطا در حذف خبر');
//                 }
//             });
//     };

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">خطا در بارگذاری</h2>
//                     <p className="text-gray-600 mb-4">{(error as Error).message}</p>
//                     <button
//                         onClick={() => refetch()}
//                         className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
//                     >
//                         تلاش مجدد
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100" dir="rtl">
//             {/* Header */}
//             <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
//                 <div className="container mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500">
//                                 <Newspaper size={28} className="text-white" />
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">مدیریت اخبار</h1>
//                                 <p className="text-gray-500 text-sm">ساخت، ویرایش و مدیریت محتوای خبری</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3">
//                             <button
//                                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                                 className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
//                             >
//                                 {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setSelectedNews(null);
//                                     setIsModalOpen(true);
//                                 }}
//                                 className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:-translate-y-0.5 shadow-lg"
//                             >
//                                 <Plus size={20} />
//                                 <span className="font-medium">خبر جدید</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="container mx-auto px-6 py-8">
//                 {/* Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                     <StatCard
//                         title="کل اخبار"
//                         value={stats.total}
//                         icon={Newspaper}
//                         color="from-blue-500 to-blue-600"
//                     />
//                     <StatCard
//                         title="اخبار انحصاری"
//                         value={stats.exclusive}
//                         icon={Star}
//                         color="from-yellow-500 to-orange-500"
//                     />
//                     <StatCard
//                         title="اخبار مهم"
//                         value={stats.sticky}
//                         icon={Pin}
//                         color="from-red-500 to-pink-500"
//                     />
//                     <StatCard
//                         title="تعداد بازدیدها"
//                         value={stats.totalViews}
//                         icon={Eye}
//                         color="from-green-500 to-emerald-500"
//                     />
//                 </div>

//                 {/* Filters */}
//                 <NewsFilters
//                     searchTerm={searchTerm}
//                     onSearchChange={setSearchTerm}
//                     filterType={filterType}
//                     onFilterChange={setFilterType}
//                 />

//                 {/* News Grid */}
//                 {isLoading ? (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <div className="relative">
//                             <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-blue-500" />
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <Newspaper className="text-blue-500" size={32} />
//                             </div>
//                         </div>
//                         <p className="mt-6 text-gray-600 font-medium">در حال بارگذاری اخبار...</p>
//                     </div>
//                 ) : (
//                     <>
//                         {filteredNews.length === 0 ? (
//                             <div className="text-center py-20">
//                                 <div className="w-24 h-24 mx-auto bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
//                                     <Newspaper size={48} className="text-blue-500" />
//                                 </div>
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-3">خبری یافت نشد</h3>
//                                 <p className="text-gray-500 mb-8">
//                                     {searchTerm ? 'با معیارهای جستجو خبری پیدا نشد' : 'هنوز هیچ خبری اضافه نکرده‌اید'}
//                                 </p>
//                                 <button
//                                     onClick={() => {
//                                         setSelectedNews(null);
//                                         setIsModalOpen(true);
//                                     }}
//                                     className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
//                                 >
//                                     <Plus size={20} />
//                                     {searchTerm ? 'افزودن خبر جدید' : 'افزودن اولین خبر'}
//                                 </button>
//                             </div>
//                         ) : (
//                             <motion.div
//                                 layout
//                                 className={`grid gap-6 ${
//                                     viewMode === 'grid'
//                                         ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
//                                         : 'grid-cols-1'
//                                 }`}
//                             >
//                                 <AnimatePresence>
//                                     {filteredNews.map((news) => (
//                                         <NewsCard
//                                             key={news.id}
//                                             news={news}
//                                             onEdit={handleEdit}
//                                             onDelete={handleDelete}
//                                         />
//                                     ))}
//                                 </AnimatePresence>
//                             </motion.div>
//                         )}

//                         {/* Pagination */}
//                         {data && data.totalRecord > data.pageSize && (
//                             <NewsPagination
//                                 currentPage={currentPage}
//                                 totalPages={Math.ceil(data.totalRecord / data.pageSize)}
//                                 onPageChange={setCurrentPage}
//                             />
//                         )}
//                     </>
//                 )}
//             </div>

//             {/* Add/Edit Modal */}
//             <NewsModal
//                 isOpen={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setSelectedNews(null);
//                 }}
//                 news={selectedNews}
//                 onSubmit={handleSubmit}
//                 isSubmitting={isCreating || isUpdating}
//             />

//             {/* Delete Confirmation Modal */}
//             <DeleteConfirmationModal
//                 isOpen={isDeleteConfirmOpen}
//                 onClose={() => {
//                     setIsDeleteConfirmOpen(false);
//                     setNewsToDelete(null);
//                 }}
//                 onConfirm={confirmDelete}
//                 isDeleting={isDeleting}
//             />
//         </div>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Newspaper,
    Plus,
    Star,
    Pin,
    Eye,
    ThumbsUp,
    ThumbsDown,
    Calendar,
    User,
    Image as ImageIcon,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Loader2,
    Scale,
    Gavel,
    FileText,
    Award,
    TrendingUp,
    Bookmark,
    Share2,
    MoreHorizontal,
} from 'lucide-react';

import { useGetAllNews, useCreateNews, useUpdateNews, useDeleteNews } from '@/app/core/services/News/useNews';
import { NewsWithImage } from '@/app/core/services/News/type';
import { generatePageNumbers } from '@/app/lib/generatePageNumbers';
import useTruncateText from '@/app/lib/useTruncateText';

import AddNewsModal from './components/AddNews';
import EditNewsModal from './components/EditNews';
import DeleteConfirmModal from './components/DeleteConfirmationModal';
import { useHeaderAction } from '@/app/core/provider/HeaderActionProvider/HeaderAction';
import { toastify } from '@/app/components/Toasts';
import { showErrorToasts } from '@/app/lib/showErrorToastify';

interface NewsCardProps {
    news: NewsWithImage;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative group overflow-hidden"
    >
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="relative bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-xs font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        {value.toLocaleString('fa-IR')}
                    </h3>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            <TrendingUp size={12} className="text-emerald-500" />
                            <span className="text-emerald-600 text-xs font-medium">{trend}</span>
                            <span className="text-slate-400 text-xs">نسبت به ماه قبل</span>
                        </div>
                    )}
                </div>
                <div className={`relative p-4 rounded-2xl bg-linear-to-br ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    </motion.div>
);

const NewsCard = ({ news, onEdit, onDelete }: NewsCardProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(news.imageSrc || null);
    const [isImageLoading, setIsImageLoading] = useState(!news.imageSrc && !!news.newsFileId);
    const [showActions, setShowActions] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const leadParagraph = useTruncateText(news.leadParagraph, 100);
    const title = useTruncateText(news.headline || news.shortTitle, 50);

    useEffect(() => {
        const loadImage = async () => {
            if (!news.newsFileId || news.imageSrc) return;

            try {
                setIsImageLoading(true);
                const response = await fetch(
                    `http://10.0.1.141:8082/Api/File/DownloadFileById?fileId=${news.newsFileId}`,
                    { method: 'POST' }
                );
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                }
            } catch (error) {
                showErrorToasts(error);
            } finally {
                setIsImageLoading(false);
            }
        };

        loadImage();

        return () => {
            if (imageUrl && imageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [news.newsFileId]);

    const formatDate = (timestamp: number) => {
        if (!timestamp) return 'نامشخص';
        const date = new Date(timestamp);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'امروز';
        if (diffDays === 1) return 'دیروز';
        if (diffDays < 7) return `${diffDays} روز پیش`;
        return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    };

    const getCategoryStyle = () => {
        if (news.isExclusive) {
            return {
                bg: 'bg-linear-to-r from-amber-500 to-orange-500',
                text: 'text-amber-100',
                icon: <Award size={12} />,
                label: 'انحصاری'
            };
        }
        if (news.isSticky) {
            return {
                bg: 'bg-linear-to-r from-red-500 to-pink-500',
                text: 'text-red-100',
                icon: <Pin size={12} />,
                label: 'مهم'
            };
        }
        return {
            bg: 'bg-linear-to-r from-slate-600 to-slate-700',
            text: 'text-slate-100',
            icon: <FileText size={12} />,
            label: 'عمومی'
        };
    };

    const categoryStyle = getCategoryStyle();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="group relative"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${categoryStyle.bg} z-10`} />
                <div className="relative h-52 overflow-hidden bg-linear-to-br from-slate-800 to-slate-900">
                    {isImageLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 size={36} className="text-slate-400" />
                            </motion.div>
                        </div>
                    ) : imageUrl ? (
                        <motion.img
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={imageUrl}
                            alt={news.headline}
                            className="w-full h-full object-cover"
                            onError={() => setImageUrl(null)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Scale size={48} className="text-slate-500" />
                            </motion.div>
                            <span className="text-sm text-slate-500 font-medium">سامانه نظام قضایی</span>
                        </div>
                    )}

                    {/* برچسب دسته‌بندی با افکت */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${categoryStyle.bg} shadow-lg`}
                    >
                        {categoryStyle.icon}
                        <span className={`text-xs font-bold ${categoryStyle.text}`}>
                            {categoryStyle.label}
                        </span>
                    </motion.div>

                    {/* نشانگر ویژه */}
                    {news.viewCount > 1000 && (
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm"
                        >
                            <TrendingUp size={10} className="text-emerald-400" />
                            <span className="text-[10px] text-white">پربازدید</span>
                        </motion.div>
                    )}

                    {/* آمار بازدید */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm"
                    >
                        <Eye size={11} className="text-slate-300" />
                        <span className="text-xs text-white font-medium">
                            {news.viewCount.toLocaleString('fa-IR')}
                        </span>
                    </motion.div>

                    {/* دکمه‌های اکشن پیشرفته */}
                    <AnimatePresence>
                        {showActions && (
                            <motion.div
                                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                            >
                                <motion.button
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onEdit(news.id)}
                                    className="p-3 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <Edit size={18} className="text-emerald-600" />
                                </motion.button>
                                <motion.button
                                    initial={{ scale: 0, rotate: 180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onDelete(news.id)}
                                    className="p-3 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <Trash2 size={18} className="text-red-600" />
                                </motion.button>
                                <motion.button
                                    initial={{ scale: 0, rotate: 0 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className="p-3 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <Bookmark size={18} className={isBookmarked ? "fill-amber-500 text-amber-500" : "text-slate-600"} />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-4 relative">
                    <h3 className="font-bold text-slate-800 text-base line-clamp-2 leading-relaxed mb-2 group-hover:text-slate-600 transition-colors">
                        {title}
                    </h3>

                    <div className="relative">
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                            {leadParagraph || 'توضیحی برای این خبر ثبت نشده است.'}
                        </p>
                        {leadParagraph && leadParagraph.length > 80 && (
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-white to-transparent pointer-events-none" />
                        )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                <User size={10} className="text-white" />
                            </div>
                            <span className="font-medium">{news.credit || 'قوه قضاییه'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={10} />
                            <span>{formatDate(news.publishDate)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-medium"
                        >
                            <ThumbsUp size={12} />
                            <span>{news.likes.toLocaleString('fa-IR')}</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1.5 text-red-600 text-[11px] font-medium"
                        >
                            <ThumbsDown size={12} />
                            <span>{news.disLikes.toLocaleString('fa-IR')}</span>
                        </motion.div>
                        <div className="mr-auto">
                            <div className="px-2 py-0.5 rounded-md bg-slate-100">
                                <span className="text-slate-400 text-[9px] font-mono">{news.code}</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min((news.viewCount / 5000) * 100, 100)}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full bg-linear-to-r ${categoryStyle.bg}`}
                        />
                    </div>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
        </motion.div>
    );
};

export default function NewsManagementPage() {
    const { setAction, setActionSecound } = useHeaderAction();

    useEffect(() => {
        setAction(
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
            >
                <div className="p-2.5 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 shadow-lg">
                    <Scale size={22} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        مدیریت اخبار
                    </h1>
                    <p className="text-xs text-slate-500">مدیریت اخبار و اطلاعیه‌های قضایی</p>
                </div>
            </motion.div>
        );

        setActionSecound(
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddModalOpen(true)}
                className="relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm font-medium"
            >
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Plus size={16} />
                <span>خبر جدید</span>
            </motion.button>
        );

        return () => {
            setAction(null);
            setActionSecound(null);
        };
    }, [setAction, setActionSecound]);

    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
    const [newsToDelete, setNewsToDelete] = useState<string | null>(null);
    const [newsWithImages, setNewsWithImages] = useState<NewsWithImage[]>([]);

    const { data, isLoading, error, refetch } = useGetAllNews(currentPage, 12);
    const { mutate: createNews, isPending: isCreating } = useCreateNews();
    const { mutate: updateNews, isPending: isUpdating } = useUpdateNews();
    const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

    useEffect(() => {
        if (data?.data) {
            setNewsWithImages(data.data);
        }
    }, [data]);

    const stats = {
        total: data?.totalRecord || 0,
        exclusive: newsWithImages.filter(n => n.isExclusive).length,
        sticky: newsWithImages.filter(n => n.isSticky).length,
        totalViews: newsWithImages.reduce((acc, curr) => acc + curr.viewCount, 0),
    };

    const handleEdit = (id: string) => {
        setSelectedNewsId(id);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setNewsToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleAddSubmit = async (formData: FormData) => {
        await createNews(formData, {
            onSuccess: () => {
                toastify("success", 'خبر با موفقیت ایجاد شد');
                setIsAddModalOpen(false);
                refetch();
            },
            onError: (error: any) => {
                showErrorToasts(error);
            }
        });
    };

    const handleEditSubmit = async (formData: FormData) => {
        await updateNews(formData, {
            onSuccess: () => {
                toastify("success", 'خبر با موفقیت بروزرسانی شد');
                setIsEditModalOpen(false);
                setSelectedNewsId(null);
                refetch();
            },
            onError: (error: any) => {
                showErrorToasts(error);
            }
        });
    };

    const handleConfirmDelete = async () => {
        if (newsToDelete) {
            await deleteNews(newsToDelete, {
                onSuccess: () => {
                    toastify("success", 'خبر با موفقیت حذف شد');
                    setIsDeleteModalOpen(false);
                    setNewsToDelete(null);
                    refetch();
                },
                onError: (error: any) => {
                    showErrorToasts(error);
                }
            });
        }
    };

    const totalPages = data ? Math.ceil(data.totalRecord / data.pageSize) : 1;
    const pageNumbers = generatePageNumbers(totalPages, currentPage + 1);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">خطا در بارگذاری</h2>
                    <p className="text-slate-500 mb-6">مشکلی در دریافت اطلاعات رخ داده است</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => refetch()}
                        className="px-6 py-3 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-xl shadow-md hover:shadow-xl transition-all"
                    >
                        تلاش مجدد
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full bg-linear-to-br from-slate-50 via-white to-slate-50 min-h-screen" dir="rtl">
            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                    <StatCard title="کل اخبار" value={stats.total} icon={Newspaper} color="from-slate-600 to-slate-700" trend="+12.5%" />
                    <StatCard title="اخبار انحصاری" value={stats.exclusive} icon={Star} color="from-amber-500 to-orange-500" trend="+5.2%" />
                    <StatCard title="اخبار مهم" value={stats.sticky} icon={Pin} color="from-red-500 to-pink-500" trend="+8.3%" />
                    <StatCard title="تعداد بازدیدها" value={stats.totalViews} icon={Eye} color="from-emerald-500 to-teal-500" trend="+22.1%" />
                </div>

                <div className="md:hidden flex justify-end mb-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-lg shadow-md text-sm"
                    >
                        <Plus size={16} />
                        <span>خبر جدید</span>
                    </motion.button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 size={48} className="text-slate-400" />
                        </motion.div>
                        <p className="text-slate-500 mt-4">در حال بارگذاری اخبار...</p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {data?.data.map((news: any, index: number) => (
                                    <motion.div
                                        key={news.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <NewsCard
                                            news={news}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {data && data.totalRecord > data.pageSize && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-between mt-10 bg-white rounded-2xl shadow-lg border border-slate-100 p-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-all text-sm font-medium"
                                >
                                    <ChevronRight size={16} />
                                    قبلی
                                </motion.button>

                                <div className="flex items-center gap-2">
                                    {pageNumbers.map((page, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => typeof page === 'number' && setCurrentPage(page - 1)}
                                            className={`w-9 h-9 rounded-xl font-medium text-sm transition-all ${currentPage === (typeof page === 'number' ? page - 1 : -1)
                                                    ? 'bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-md'
                                                    : typeof page === 'number'
                                                        ? 'hover:bg-slate-100 text-slate-600'
                                                        : 'text-slate-300 cursor-default'
                                                }`}
                                            disabled={typeof page !== 'number'}
                                        >
                                            {page}
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={currentPage >= totalPages - 1}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-all text-sm font-medium"
                                >
                                    بعدی
                                    <ChevronLeft size={16} />
                                </motion.button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            <AddNewsModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddSubmit}
                isSubmitting={isCreating}
            />

            <EditNewsModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedNewsId(null);
                }}
                newsId={selectedNewsId}
                onSubmit={handleEditSubmit}
                isSubmitting={isUpdating}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setNewsToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}