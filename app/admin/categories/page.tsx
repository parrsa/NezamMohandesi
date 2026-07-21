"use client";

import React, { useMemo, useState } from "react";
import Tree from "rc-tree";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategoriesTree,
  useGetCategoryById,
  useUpdateCategory,
} from "@/app/core/services/Categories/useCategories";
import {
  Edit,
  EyeIcon,
  NotepadText,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { toastify } from "@/app/components/Toasts";
import { showErrorToasts } from "@/app/lib/showErrorToastify";
import { formatDateForDisplay } from "@/app/lib/persianToEnglishNumber";
import AddCategoriesModal from "./components/CreateCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import EditCategoriesModal from "./components/EditCategories";

interface CategoryNode {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  level: number;
  fullPath: string;
  createdAt?: string;
  children: CategoryNode[];
}

interface RcTreeNode {
  key: string;
  title: React.ReactNode;
  children?: RcTreeNode[];
}

const COLS = "grid-cols-4";

export default function Categories() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [newsToDelete, setNewsToDelete] = useState<string | null>(null);
  const [parentIdForAdd, setParentIdForAdd] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const {
    data: treeData,
    isLoading: treeLoading,
    refetch: treeFetch,
  } = useGetCategoriesTree();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const { mutate: createCategories, isPending: isCreating } =
    useCreateCategory();
  const { mutate: editCategories, isPending: isUpdating } = useUpdateCategory();
  const { data: getById } = useGetCategoryById(selectedCategoryId);

  const handleDelete = (id: number) => {
    setNewsToDelete(String(id));
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (id: number) => {
    setSelectedCategoryId(String(id));
    setIsEditModalOpen(true);
  };

  const handleAddChild = (id: number) => {
    setParentIdForAdd(String(id));
    setIsAddModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!newsToDelete) return;
    await deleteCategory(newsToDelete, {
      onSuccess: () => {
        toastify("success", "دسته بندی با موفقیت حذف شد");
        setIsDeleteModalOpen(false);
        setNewsToDelete(null);
        treeFetch();
      },
      onError: (error) => showErrorToasts(error),
    });
  };

  const handleAddSubmit = async (formData: any) => {
    const payload = parentIdForAdd
      ? { ...formData, parentId: Number(parentIdForAdd) }
      : formData;
    await createCategories(payload, {
      onSuccess: () => {
        toastify("success", "دسته بندی با موفقیت ایجاد شد");
        setIsAddModalOpen(false);
        setParentIdForAdd(null);
        treeFetch();
      },
      onError: (error: any) => showErrorToasts(error),
    });
  };

  const handleEditSubmit = async (payload: any) => {
    await editCategories(payload, {
      onSuccess: () => {
        toastify("success", "دسته بندی با موفقیت بروزرسانی شد");
        setIsEditModalOpen(false);
        setSelectedCategoryId("");
        treeFetch();
      },
      onError: (error: any) => showErrorToasts(error),
    });
  };

  const renderTitle = (node: CategoryNode, rowIndex: number) => (
    <div
      className={`grid ${COLS} items-center divide-y divide-gray-50 divide-x w-full text-sm h-full`}
    >
      <span className="text-slate-700 flex items-center justify-center h-full py-2">
        {rowIndex}
      </span>
      <span className="text-slate-700 flex items-center justify-center h-full py-2">
        {node.name}
      </span>
      <span className="text-slate-700 flex items-center justify-center h-full py-2">
        {node.description}
      </span>
      <span className="flex items-center justify-center gap-2 h-full py-2">
        <Plus
          size={15}
          className="text-slate-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleAddChild(node.id);
          }}
        />
        <Trash2
          size={15}
          className="text-red-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(node.id);
          }}
        />
        <Edit
          size={15}
          className="text-emerald-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(node.id);
          }}
        />
        <Link
          href={`/admin/categories/${node.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <EyeIcon size={15} className="text-blue-600" />
        </Link>
        <Link
          href={`/admin/categories/contents/${node.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <NotepadText size={15} className="text-yellow-600" />
        </Link>
      </span>
    </div>
  );

  const mapToRcTree = (nodes: CategoryNode[]): RcTreeNode[] =>
    nodes.map((node, i) => ({
      key: String(node.id),
      title: renderTitle(node, i + 1),
      children:
        node.children && node.children.length > 0
          ? mapToRcTree(node.children)
          : undefined,
    }));

  const collectAllKeys = (nodes: CategoryNode[]): string[] =>
    nodes.reduce<string[]>((acc, node) => {
      acc.push(String(node.id));
      if (node.children && node.children.length > 0) {
        acc.push(...collectAllKeys(node.children));
      }
      return acc;
    }, []);

  const rcTreeData = useMemo(
    () => (treeData ? mapToRcTree(treeData) : []),
    [treeData],
  );
  const allKeys = useMemo(
    () => (treeData ? collectAllKeys(treeData) : []),
    [treeData],
  );

  return (
    <div className="min-h-screen p-5 bg-linear-to-br from-slate-50 to-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-slate-800">مدیریت دسته بندی</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpandedKeys(allKeys)}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            باز کردن همه
          </button>
          <button
            onClick={() => setExpandedKeys([])}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            بستن همه
          </button>
          <button
            onClick={() => {
              setParentIdForAdd(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-xl text-sm font-medium"
          >
            <Plus size={16} />
            دسته بندی جدید
          </button>
        </div>
      </div>

      {treeLoading ? (
        <div className="flex items-center justify-center py-20 text-slate-500">
          در حال بارگذاری...
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-100">
          <div
            className={`grid ${COLS} bg-[#2563EB] divide-x divide-gray-50 text-white text-xs font-light h-10 items-center px-2`}
          >
            <span className="text-center flex items-center justify-center h-full">
              ردیف
            </span>
            <span className="text-center flex items-center justify-center h-full">
              نام دسته بندی
            </span>
            <span className="text-center flex items-center justify-center h-full">
              توضیحات
            </span>
            <span className="text-center flex items-center justify-center h-full">
              عملیات
            </span>
          </div>
          <div className="p-2">
            <Tree
              treeData={rcTreeData}
              expandedKeys={expandedKeys}
              onExpand={(keys) => setExpandedKeys(keys)}
              selectable={false}
              switcherIcon={(props: any) =>
                props.isLeaf ? null : props.expanded ? (
                  <ChevronDown size={16} className="text-slate-500" />
                ) : (
                  <ChevronRight size={16} className="text-slate-500" />
                )
              }
            />
          </div>
        </div>
      )}

      <AddCategoriesModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setParentIdForAdd(null);
        }}
        onSubmit={handleAddSubmit}
        isSubmitting={isCreating}
      />
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setNewsToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
      <EditCategoriesModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategoryId("");
        }}
        onSubmit={handleEditSubmit}
        isSubmitting={isUpdating}
        data={getById}
      />
    </div>
  );
}
