"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useCreateContent,
  useDeleteContent,
  useGetAllContents,
  useGetContentById,
  useUpdateContent,
} from "@/app/core/services/Contents/useContents";
import { useHeaderAction } from "@/app/core/provider/HeaderActionProvider/HeaderAction";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  EyeIcon,
  Loader2,
  Plus,
  Scale,
  Trash2,
} from "lucide-react";
import { generatePageNumbers } from "@/app/lib/generatePageNumbers";
import { toastify } from "@/app/components/Toasts";
import { showErrorToasts } from "@/app/lib/showErrorToastify";
import DeleteConfirmModal from "@/app/admin/news/components/DeleteConfirmationModal";
import AddContentModal from "./components/AddContentModal";
import EditContentModal from "./components/EditContentModal";

export default function ContentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string>("");

  const { contentId } = useParams();

  const { data, isLoading, error, refetch } = useGetAllContents(
    currentPage,
    20,
    null,
    contentId,
  );

  const { mutate: createContent, isPending: isCreating } = useCreateContent();
  const { mutate: deleteContent, isPending: isDeleting } = useDeleteContent();
  const { mutate: updateContent, isPending: isUpdating } = useUpdateContent();
  const { data: getById, isLoading: isGetById } = useGetContentById(
    String(selectedContentId),
  );
  const { setAction, setActionSecound } = useHeaderAction();
  const totalPages = data ? Math.ceil(data.totalRecord / data.pageSize) : 1;
  const pageNumbers = generatePageNumbers(totalPages, currentPage + 1);

  const handleEdit = (id: string) => {
    setSelectedContentId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setContentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = async (formData: any) => {
    await createContent(formData, {
      onSuccess: () => {
        toastify("success", "خبر با موفقیت ایجاد شد");
        setIsAddModalOpen(false);
        refetch();
      },
      onError: (error: any) => {
        showErrorToasts(error);
      },
    });
  };

  const handleConfirmDelete = async () => {
    if (contentToDelete) {
      await deleteContent(contentToDelete, {
        onSuccess: () => {
          toastify("success", "خبر با موفقیت حذف شد");
          setIsDeleteModalOpen(false);
          setContentToDelete(null);
          refetch();
        },
        onError: (error) => {
          showErrorToasts(error);
        },
      });
    }
  };

  const handleEditSubmit = async (formData: FormData) => {
    await updateContent(
      { id: selectedContentId, formData },
      {
        onSuccess: () => {
          toastify("success", "دسته بندی با موفقیت بروزرسانی شد");
          setIsEditModalOpen(false);
          setSelectedContentId("");
          refetch();
        },
        onError: (error: any) => {
          showErrorToasts(error);
        },
      },
    );
  };

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
            مدیریت دسته بندی
          </h1>
          <p className="text-xs text-slate-500">مدیریت دسته بندی ها</p>
        </div>
      </motion.div>,
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
        <span>محتوای جدید</span>
      </motion.button>,
    );

    return () => {
      setAction(null);
      setActionSecound(null);
    };
  }, [setAction, setActionSecound]);

  return (
    <div className="min-h-screen p-5 bg-linear-to-br from-slate-50 to-slate-100">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={48} className="text-slate-400" />
          </motion.div>
          <p className="text-slate-500 mt-4">در حال بارگذاری دسته بندی ها...</p>
        </div>
      ) : (
        <table className="border-collapse text-sm text-right rounded-xl overflow-hidden w-full bg-white">
          <thead className="bg-[#2563EB] text-white h-10 sticky top-0 z-10">
            <tr className="divide-x">
              <th className="px-4 py-2 font-light text-center border-l w-[60px]">
                ردیف
              </th>
              <th className="px-4 py-2 font-light text-center w-[120px]">
                نام دسته بندی
              </th>
              <th className="px-4 py-2 font-light text-center">موضوع</th>
              <th className="px-4 py-2 font-light text-center w-[100px]">
                تاریخ ثبت
              </th>
              <th className="px-4 py-2 font-light text-center w-[100px]">
                وضعیت
              </th>
              <th className="px-4 py-2 font-light text-center w-[80px]">
                عملیات
              </th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody className="divide-y divide-gray-200">
              {data.items &&
                data?.items.map((item: any, index: number) => (
                  <motion.tr
                    key={item?.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="transition-colors divide-x divide-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700 text-center text-nowrap overflow-hidden text-ellipsis max-w-[30px]">
                      {item?.title}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700  text-center text-nowrap overflow-hidden text-ellipsis max-w-xl">
                      {item?.summary}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700 text-center text-nowrap overflow-clip">
                      {item?.createdAt}
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${item?.isActive ? "text-green-700" : "text-red-700"} text-center`}
                    >
                      {item?.isActive ? "فعال" : "غیرفعال"}
                    </td>
                    <td className="flex items-center justify-center gap-2 py-3">
                      <Trash2
                        onClick={() => handleDelete(item?.id)}
                        size={18}
                        className="text-red-600"
                      />
                      <Edit
                        onClick={() => handleEdit(item?.id)}
                        size={18}
                        className="text-emerald-600"
                      />
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </AnimatePresence>
        </table>
      )}
      {data && data.totalRecord > data.pageSize && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mt-10 bg-white rounded-2xl shadow-lg border border-slate-100 p-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
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
                onClick={() =>
                  typeof page === "number" && setCurrentPage(page - 1)
                }
                className={`w-9 h-9 rounded-xl font-medium text-sm transition-all ${
                  currentPage === (typeof page === "number" ? page - 1 : -1)
                    ? "bg-linear-to-r from-slate-700 to-slate-800 text-white shadow-md"
                    : typeof page === "number"
                      ? "hover:bg-slate-100 text-slate-600"
                      : "text-slate-300 cursor-default"
                }`}
                disabled={typeof page !== "number"}
              >
                {page}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-all text-sm font-medium"
          >
            بعدی
            <ChevronLeft size={16} />
          </motion.button>
        </motion.div>
      )}
      <AddContentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isSubmitting={isCreating}
        categoryId={contentId}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setContentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
      <EditContentModal
        categoryId={contentId}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedContentId("");
        }}
        onSubmit={handleEditSubmit}
        isSubmitting={isUpdating}
        data={getById}
      />
    </div>
  );
}
