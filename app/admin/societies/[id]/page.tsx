"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeaderAction } from "@/app/core/provider/HeaderActionProvider/HeaderAction";
import {
  useCreateSocietiesNotices,
  useDeleteSocieties,
  useDeleteSocietiesNotices,
  useGetSocietiesById,
  useGetSocietiesNotices,
  useGetSocietyNoticesById,
  useUpdateSocieties,
} from "@/app/core/services/Societies/useSocieties";
import { Edit, Loader2, Plus, Scale, Trash2 } from "lucide-react";
import { showErrorToasts } from "@/app/lib/showErrorToastify";
import { toastify } from "@/app/components/Toasts";
import { useParams } from "next/navigation";
import AddSocietiesNoticesModal from "./components/SocietiesNoticesModal";
import DeleteSocietiesNoticesModal from "./components/DeleteSocietiesNoticesModal";

export default function SocietiesNoticesPage() {
  const { id } = useParams();

  const [selectedSocietiesId, setSelectedSocietiesId] = useState<string>("");
  const { data, isLoading, error, refetch } = useGetSocietiesNotices(id);
  const { mutate: createSocieties, isPending: isCreating } =
    useCreateSocietiesNotices();
  const { mutate: deleteSocieties, isPending: isDeleting } =
    useDeleteSocietiesNotices();
  const { mutate: editSocieties, isPending: isUpdating } = useUpdateSocieties();
  const { data: getSocietiesById, isLoading: isGetSocietiesById } =
    useGetSocietyNoticesById(selectedSocietiesId);

  const { setAction, setActionSecound } = useHeaderAction();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [societiesToDelete, setSocietiesToDelete] = useState<string | null>(
    null,
  );

  const handleDelete = (id: string) => {
    setSocietiesToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedSocietiesId(id);
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = async (formData: any) => {
    await createSocieties(formData, {
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
    if (societiesToDelete) {
      await deleteSocieties(societiesToDelete, {
        onSuccess: () => {
          toastify("success", "خبر با موفقیت حذف شد");
          setIsDeleteModalOpen(false);
          setSocietiesToDelete(null);
          refetch();
        },
        onError: (error) => {
          showErrorToasts(error);
        },
      });
    }
  };
  const handleEditSubmit = async (payload: any) => {
    await editSocieties(payload, {
      onSuccess: () => {
        toastify("success", "دسته بندی با موفقیت بروزرسانی شد");
        setIsEditModalOpen(false);
        setSelectedSocietiesId("");
        refetch();
      },
      onError: (error: any) => {
        showErrorToasts(error);
      },
    });
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
            مدیریت مصوبات
          </h1>
          <p className="text-xs text-slate-500">مدیریت مصوبات</p>
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
        <span>مصوبه جدید</span>
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
                عنوان
              </th>
              <th className="px-4 py-2 font-light text-center">توضیحات</th>
              <th className="px-4 py-2 font-light text-center">
                تعداد اطلاعیه ها
              </th>

              <th className="px-4 py-2 font-light text-center w-[80px]">
                عملیات
              </th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody className="divide-y divide-gray-200">
              {data?.map((item: any, index: number) => (
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
                  <td className="px-4 py-3 font-medium text-gray-700 text-center text-nowrap overflow-hidden text-ellipsis max-w-xl">
                    {item?.title}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700 text-center text-nowrap overflow-hidden text-ellipsis max-w-xl">
                    {item?.description}
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
      <AddSocietiesNoticesModal
        societyId={id}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isSubmitting={isCreating}
      />

      <DeleteSocietiesNoticesModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSocietiesToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
      {/*
      <EditSocietiesModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSocietiesId("");
        }}
        onSubmit={handleEditSubmit}
        isSubmitting={isUpdating}
        data={getSocietiesById}
      /> */}
    </div>
  );
}
