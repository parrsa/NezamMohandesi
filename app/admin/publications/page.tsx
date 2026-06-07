"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Download,
  Plus,
  SquarePen,
  Star,
  Trash2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Calendar,
  User,
  Edit,
  Eye,
  ThumbsUp,
  ThumbsDown,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeletePublicationModal from "./components/DeletePublicatoinModal";
import { useRouter } from "next/navigation";
import { GetAllPublications } from "@/app/core/services/Publications/queries";
import { useHeaderAction } from "@/app/core/provider/HeaderActionProvider/HeaderAction";
import { Button } from "@/app/components/button/Button";
import Pagination from "@/app/components/Pagination";
import { generatePageNumbers } from "@/app/lib/generatePageNumbers";
import useTruncateText from "@/app/lib/useTruncateText";
import { showErrorToasts } from "@/app/lib/showErrorToastify";

interface IPublicationsList {
  id: string;
  publicationTitle: string;
  description: string;
  issueNumber: string;
  volume: string;
  managingPublisher: string;
  editorInChief: string;
  publicationDate: number;
  likes: number;
  disLikes: number;
  publicationFileId: string;
  coverFileId: string;
  downloadCount: number;
  creatorName?: string;
  createDate?: number;
}

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px", ...options }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, options]);

  return { ref, isIntersecting };
};

interface StatCardProps {
  title: string;
  value: number;
  icon: any;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">
          {value.toLocaleString("fa-IR")}
        </h3>
      </div>
      <div className={`p-4 rounded-2xl bg-linear-to-br ${color}`}>
        <Icon size={28} className="text-white" />
      </div>
    </div>
  </motion.div>
);

interface CoverImageProps {
  coverFileId: string;
  title: string;
}

const CoverImage = ({ coverFileId, title }: CoverImageProps) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref: inViewRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    inViewRef.current = node;
  }, [inViewRef]);

  useEffect(() => {
    const loadCover = async () => {
      if (!coverFileId || coverUrl || !isIntersecting) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://10.0.1.141:8082/Api/File/DownloadFileById?fileId=${coverFileId}`,
          { method: "POST" }
        );

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setCoverUrl(url);
        } else {
          throw new Error("Failed to load cover image");
        }
      } catch (err: any) {
        setError(err.message || "خطا در بارگذاری تصویر");
      } finally {
        setIsLoading(false);
      }
    };

    loadCover();

    return () => {
      if (coverUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(coverUrl);
      }
    };
  }, [coverFileId, isIntersecting]);

  if (error) {
    return (
      <div
        ref={setRefs}
        className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center"
      >
        <div className="text-center">
          <ImageIcon size={40} className="text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-xs">خطا در بارگذاری</p>
        </div>
      </div>
    );
  }

  if (isLoading || !coverUrl) {
    return (
      <div
        ref={setRefs}
        className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center"
      >
        <Loader2 size={32} className="text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div ref={setRefs} className="relative w-full h-full">
      <Image
        width={800}
        height={600}
        src={coverUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
};


interface PublicationCardProps {
  publication: IPublicationsList;
  onEdit: (publication: IPublicationsList) => void;
  onDelete: (id: string, title: string) => void;
}

const PublicationCard = ({
  publication,
  onEdit,
  onDelete,
}: PublicationCardProps) => {
  const title = useTruncateText(publication.publicationTitle, 60);
  const description = useTruncateText(publication.description, 120);

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "نامشخص";
    return new Date(timestamp).toLocaleDateString("fa-IR");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
     
      <div className="relative h-52 overflow-hidden">
        <CoverImage
          coverFileId={publication.coverFileId}
          title={publication.publicationTitle}
        />

        
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
          دوره {publication.volume} - شماره {publication.issueNumber}
        </div>

     
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(publication)}
            className="p-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg"
            title="ویرایش"
          >
            <SquarePen size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              onDelete(publication.id, publication.publicationTitle)
            }
            className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            title="حذف"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>

    
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Download size={12} />
          <span>{publication.downloadCount.toLocaleString("fa-IR")}</span>
        </div>
      </div>

     
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-base">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
          {description}
        </p>

      
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <User size={12} className="text-purple-500" />
              {publication.editorInChief || "نامشخص"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-emerald-500" />
              {formatDate(publication.createDate ?? 1)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <BookOpen size={12} className="text-amber-500" />
              {publication.managingPublisher || "نامشخص"}
            </span>
          </div>
        </div>

        
        <div className="flex items-center gap-4 pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-green-600">
            <ThumbsUp size={14} />
            <span className="text-sm font-medium">
              {publication.likes.toLocaleString("fa-IR")}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-red-500">
            <ThumbsDown size={14} />
            <span className="text-sm font-medium">
              {publication.disLikes.toLocaleString("fa-IR")}
            </span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 text-blue-500">
            <Eye size={14} />
            <span className="text-sm font-medium">
              {publication.downloadCount.toLocaleString("fa-IR")}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
    </motion.div>
  );
};

export default function AdminPublications() {
  const router = useRouter();
  const { setAction, setActionSecound } = useHeaderAction();

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [publicationId, setPublicationId] = useState("");
  const [publicationTitle, setPublicationTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [hasInitialError, setHasInitialError] = useState(false);

  const { data, isLoading, error, refetch } = GetAllPublications({
    PageNumber: currentPage,
    PageSize: 12,
  });

  useEffect(() => {
    if (error && !hasInitialError) {
      setHasInitialError(true);
    }
  }, [error, hasInitialError]);

  useEffect(() => {
    setAction(
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500">
            <BookOpen size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">مدیریت نشریه</h1>
            <p className="text-gray-500 text-sm">
              مدیریت، ایجاد و ویرایش نشریه
            </p>
          </div>
        </div>
      </div>
    );

    setActionSecound(
      <div className="flex items-center gap-3">
        <Link
          href={"publications/create-publication"}
          className="flex items-center gap-2 px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg"
        >
          <Plus size={20} />
          <span>نشریه جدید</span>
        </Link>
      </div>
    );

    return () => {
      setAction(null);
      setActionSecound(null);
    };
  }, []);

  const publications = data?.data ?? [];
  const stats = {
    total: data?.totalRecord || 0,
    totalDownloads: publications.reduce(
      (acc: number, curr: IPublicationsList) => acc + (curr.downloadCount || 0),
      0
    ),
    totalLikes: publications.reduce(
      (acc: number, curr: IPublicationsList) => acc + (curr.likes || 0),
      0
    ),
    totalDislikes: publications.reduce(
      (acc: number, curr: IPublicationsList) => acc + (curr.disLikes || 0),
      0
    ),
  };

  const handleEdit = (publication: IPublicationsList) => {
    router.push(`publications/${publication.id}`);
  };

  const handleDelete = (id: string, title: string) => {
    setPublicationId(id);
    setPublicationTitle(title);
    setDeleteOpen(true);
  };

  const totalPages = data
    ? Math.ceil(data.totalRecord / data.pageSize)
    : 1;
  const pageNumbers = generatePageNumbers(totalPages, currentPage + 1);

  const shouldShowError = error && !data && hasInitialError;

  if (shouldShowError) {
    return (
      <div
        className="min-h-screen w-full bg-linear-to-br from-gray-50 via-white to-gray-100 p-4"
        dir="rtl"
      >
        <div className="flex flex-col items-center justify-center py-20">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            خطا در بارگذاری
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "خطای ناشناخته"}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setHasInitialError(false);
                refetch();
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              تلاش مجدد
            </button>
            <Link
              href={"publications/create-publication"}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              ایجاد نشریه جدید
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-linear-to-br from-gray-50 via-white to-gray-100 p-4 flex flex-col gap-4"
      dir="rtl"
    >
      <div className="w-full p-3 md:hidden flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">مدیریت نشریه</h1>
            <p className="text-gray-500 text-sm">
              مدیریت، ایجاد و ویرایش نشریه
            </p>
          </div>
        </div>
        <Link
          href={"publications/create-publication"}
          className="flex items-center justify-center gap-1 text-white bg-linear-to-r from-blue-500 to-purple-600 py-2 rounded-lg px-4"
        >
          <Plus size={18} />
          <span>جدید</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="کل نشریات"
          value={stats.total}
          icon={BookOpen}
          color="from-blue-500 to-purple-500"
        />
        <StatCard
          title="مجموع دانلودها"
          value={stats.totalDownloads}
          icon={Download}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="مجموع لایک‌ها"
          value={stats.totalLikes}
          icon={ThumbsUp}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="مجموع دیسلایک‌ها"
          value={stats.totalDislikes}
          icon={ThumbsDown}
          color="from-red-500 to-pink-500"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">در حال بارگذاری نشریات...</p>
        </div>
      ) : (
        <>
          {(!data?.data || data.data.length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto bg-linear-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <FileText size={48} className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                نشریه‌ای یافت نشد
              </h3>
              <p className="text-gray-500 mb-8">
                هنوز هیچ نشریه‌ای اضافه نکرده‌اید
              </p>
              <Link
                href={"publications/create-publication"}
                className="mx-auto flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors w-fit"
              >
                <Plus size={20} />
                افزودن اولین نشریه
              </Link>
            </motion.div>
          )}

          {data?.data && data.data.length > 0 && (
            <motion.div layout className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {data.data.map((pub: IPublicationsList) => (
                  <PublicationCard
                    key={pub.id}
                    publication={pub}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {data && data.totalRecord > data.pageSize && (
            <div className="mt-8">
              <Pagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}

      <DeletePublicationModal
        publicationId={publicationId}
        publicationTitle={publicationTitle}
        isVisible={isDeleteOpen}
        refetch={refetch}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}