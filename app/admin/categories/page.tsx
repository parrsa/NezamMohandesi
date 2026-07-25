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
  ChevronLeft,
  FolderTree,
  FolderOpen,
  FileBox,
  Hash,
  MoreHorizontal,
  BadgeCheck,
  CircleOff,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { toastify } from "@/app/components/Toasts";
import { showErrorToasts } from "@/app/lib/showErrorToastify";
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
  className?: string;
}

export default function Categories() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [newsToDelete, setNewsToDelete] = useState<string | null>(null);
  const [parentIdForAdd, setParentIdForAdd] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

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

  let mainRowCounter = 0;

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

  const getLevelStyles = (level: number) => {
    const styles = {
      0: {
        bg: "bg-white",
        border: "border-r-4 border-blue-500",
        icon: <FolderTree className="w-4 h-4 text-blue-600" />,
        text: "text-gray-800 font-semibold",
        badge: "bg-blue-100 text-blue-700",
        dot: "bg-blue-500",
        indent: "",
        width: "w-full",
      },
      1: {
        bg: "bg-blue-50/30 hover:bg-blue-50/50",
        border: "border-r-4 border-emerald-500",
        icon: <FolderOpen className="w-4 h-4 text-emerald-600" />,
        text: "text-gray-700 font-medium",
        badge: "bg-emerald-100 text-emerald-700",
        dot: "bg-emerald-500",
        indent: "mr-4",
        width: "w-[95%]",
      },
      2: {
        bg: "bg-purple-50/30 hover:bg-purple-50/50",
        border: "border-r-4 border-purple-500",
        icon: <FileBox className="w-4 h-4 text-purple-600" />,
        text: "text-gray-700",
        badge: "bg-purple-100 text-purple-700",
        dot: "bg-purple-500",
        indent: "mr-8",
        width: "w-[90%]",
      },
      3: {
        bg: "bg-rose-50/30 hover:bg-rose-50/50",
        border: "border-r-4 border-rose-500",
        icon: <Sparkles className="w-4 h-4 text-rose-600" />,
        text: "text-gray-600",
        badge: "bg-rose-100 text-rose-700",
        dot: "bg-rose-500",
        indent: "mr-12",
        width: "w-[85%]",
      },
    };
    return styles[level as keyof typeof styles] || styles[2];
  };

  const renderTitle = (
    node: CategoryNode,
    rowIndex: number | null,
    level: number,
  ) => {
    const levelStyle = getLevelStyles(level);
    const isHovered = hoveredKey === String(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isMain = level === 0;

    return (
      <div
        className={`transition-all duration-200 ${levelStyle.bg} ${isHovered ? "shadow-sm" : ""}`}
        onMouseEnter={() => setHoveredKey(String(node.id))}
        onMouseLeave={() => setHoveredKey(null)}
      >
        <div
          className={`grid grid-cols-12 gap-3 items-center py-2.5 px-4 border-b border-gray-100/60 ${levelStyle.border} ${!isMain ? levelStyle.indent : ""} ${!isMain ? "rounded-l-xl" : ""}`}
        >
          <div className="col-span-1 flex items-center gap-2">
            {isMain ? (
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-gray-500">
                  {rowIndex}
                </span>
              </div>
            ) : (
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/50 flex items-center justify-center">
                {levelStyle.icon}
              </div>
            )}
          </div>

          <div className="col-span-4 flex items-center gap-2 min-w-0">
            <div className="flex-shrink-0 p-1.5 rounded-lg bg-white/60">
              {levelStyle.icon}
            </div>
            <span className={`text-sm truncate ${levelStyle.text}`}>
              {node.name}
            </span>
            {hasChildren && (
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                <Layers size={10} />
                {node.children.length}
              </span>
            )}
            {!isMain && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${levelStyle.badge}`}
              >
                زیردسته
              </span>
            )}
          </div>

          <div className="col-span-3 hidden lg:flex items-center">
            <div className="py-1 px-2 w-full">
              <p className="text-xs text-gray-500 truncate">
                {node.description || <span className="text-gray-300">—</span>}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex items-center">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-200 ${node.isActive ? "bg-emerald-50/80 border border-emerald-200/50" : "bg-red-50/80 border border-red-200/50"} ${isHovered ? "scale-105" : ""}`}
            >
              {node.isActive ? (
                <BadgeCheck size={13} className="text-emerald-500" />
              ) : (
                <CircleOff size={13} className="text-red-500" />
              )}
              <span
                className={`text-[10px] font-medium ${node.isActive ? "text-emerald-600" : "text-red-600"}`}
              >
                {node.isActive ? "فعال" : "غیرفعال"}
              </span>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-end">
            <div
              className={`flex items-center gap-0.5 p-0.5 bg-white/80 rounded-lg border border-gray-100/50 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-50"}`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddChild(node.id);
                }}
                className="p-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-gray-400 group"
                title="افزودن زیردسته"
              >
                <Plus
                  size={13}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
              <div className="w-px h-4 bg-gray-200"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(node.id);
                }}
                className="p-1.5 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 text-gray-400 group"
                title="ویرایش"
              >
                <Edit
                  size={13}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
              <div className="w-px h-4 bg-gray-200"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(node.id);
                }}
                className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-gray-400 group"
                title="حذف"
              >
                <Trash2
                  size={13}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
              <div className="w-px h-4 bg-gray-200"></div>
              <Link
                href={`/admin/categories/${node.id}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 text-gray-400 group"
                title="مشاهده"
              >
                <EyeIcon
                  size={13}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
              <div className="w-px h-4 bg-gray-200"></div>
              <Link
                href={`/admin/categories/contents/${node.id}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 text-gray-400 group"
                title="محتوای دسته"
              >
                <NotepadText
                  size={13}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const mapToRcTree = (nodes: CategoryNode[], level = 0): RcTreeNode[] => {
    return nodes.map((node) => {
      let rowIndex = null;
      if (level === 0) {
        mainRowCounter++;
        rowIndex = mainRowCounter;
      }

      return {
        key: String(node.id),
        title: renderTitle(node, rowIndex, level),
        className: `level-${level}`,
        children:
          node.children && node.children.length > 0
            ? mapToRcTree(node.children, level + 1)
            : undefined,
      };
    });
  };

  const collectAllKeys = (nodes: CategoryNode[]): string[] =>
    nodes.reduce<string[]>((acc, node) => {
      acc.push(String(node.id));
      if (node.children && node.children.length > 0) {
        acc.push(...collectAllKeys(node.children));
      }
      return acc;
    }, []);

  const rcTreeData = useMemo(() => {
    mainRowCounter = 0;
    return treeData ? mapToRcTree(treeData) : [];
  }, [treeData]);

  const allKeys = useMemo(
    () => (treeData ? collectAllKeys(treeData) : []),
    [treeData],
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="relative mb-6">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-200">
              <FolderTree className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                مدیریت دسته‌بندی
                <Sparkles size={16} className="text-yellow-400" />
              </h1>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {treeData?.length || 0} دسته‌بندی اصلی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpandedKeys(allKeys)}
              className="px-4 py-2 text-xs rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <ChevronDown size={14} />
              باز کردن همه
            </button>
            <button
              onClick={() => setExpandedKeys([])}
              className="px-4 py-2 text-xs rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <ChevronLeft size={14} />
              بستن همه
            </button>
            <button
              onClick={() => {
                setParentIdForAdd(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-xs font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-[1.02] transition-all duration-300"
            >
              <Zap size={14} />
              دسته‌بندی جدید
            </button>
          </div>
        </div>
      </div>

      {treeLoading ? (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 border-3 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FolderTree size={14} className="text-blue-600 animate-pulse" />
              </div>
            </div>
            <span className="text-xs text-gray-400">بارگذاری...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-100/50 border border-white/50 overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-gradient-to-r from-gray-50/80 via-white/50 to-gray-50/80 border-b border-gray-100/80">
            <span className="col-span-1 flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <Hash size={12} />
              ردیف
            </span>
            <span className="col-span-4 flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <FolderTree size={12} />
              نام دسته‌بندی
            </span>
            <span className="col-span-3 flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden lg:flex">
              <FileBox size={12} />
              توضیحات
            </span>
            <span className="col-span-2 flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <BadgeCheck size={12} />
              وضعیت
            </span>
            <span className="col-span-2 flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider justify-end">
              <MoreHorizontal size={12} />
              عملیات
            </span>
          </div>

          <div className="p-1">
            <style jsx global>{`
              .rc-tree {
                padding: 0;
                font-family: inherit;
              }
              .rc-tree .rc-tree-treenode {
                padding: 0;
                margin: 0;
                list-style: none;
                transition: all 0.2s ease;
              }
              .rc-tree .rc-tree-treenode .rc-tree-node-content-wrapper {
                display: block;
                padding: 0;
                width: 100%;
              }

              .rc-tree .rc-tree-indent {
                display: flex;
                align-items: stretch;
                padding: 0;
              }
              .rc-tree .rc-tree-indent-unit {
                width: 24px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .rc-tree .rc-tree-indent-unit::before {
                content: "";
                position: absolute;
                right: 50%;
                top: 0;
                bottom: 0;
                width: 1px;
                background: #e2e8f0;
                transform: translateX(50%);
              }
              .rc-tree .rc-tree-indent-unit:last-child::before {
                bottom: 50%;
              }
              .rc-tree .rc-tree-indent-unit:first-child::before {
                top: 50%;
              }
              .rc-tree .rc-tree-indent-unit:only-child::before {
                display: none;
              }

              .rc-tree .rc-tree-switcher {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 36px;
                cursor: pointer;
                flex-shrink: 0;
                transition: all 0.3s ease;
                position: relative;
                z-index: 2;
                border-radius: 6px;
              }
              .rc-tree .rc-tree-switcher:hover {
                background: rgba(59, 130, 246, 0.08);
              }
              .rc-tree .rc-tree-switcher svg {
                transition: all 0.3s ease;
              }
              .rc-tree .rc-tree-switcher.rc-tree-switcher_open svg {
                transform: rotate(0deg);
              }
              .rc-tree .rc-tree-switcher.rc-tree-switcher_close svg {
                transform: rotate(-90deg);
              }

              .level-0 .rc-tree-title {
                padding-right: 0;
              }
              .level-1 .rc-tree-title {
                padding-right: 0;
                margin-right: 4px;
              }
              .level-2 .rc-tree-title {
                padding-right: 0;
                margin-right: 8px;
              }
              .level-3 .rc-tree-title {
                padding-right: 0;
                margin-right: 12px;
              }

              .level-1 .rc-tree-node-content-wrapper {
                width: 96% !important;
              }
              .level-2 .rc-tree-node-content-wrapper {
                width: 92% !important;
              }
              .level-3 .rc-tree-node-content-wrapper {
                width: 88% !important;
              }

              .level-1 .rc-tree-title {
                border-right: 2px solid rgba(16, 185, 129, 0.15);
                border-radius: 0 8px 8px 0;
                padding-right: 4px;
              }
              .level-2 .rc-tree-title {
                border-right: 2px solid rgba(139, 92, 246, 0.15);
                border-radius: 0 8px 8px 0;
                padding-right: 8px;
              }
              .level-3 .rc-tree-title {
                border-right: 2px solid rgba(244, 63, 94, 0.15);
                border-radius: 0 8px 8px 0;
                padding-right: 12px;
              }

              .rc-tree .rc-tree-treenode {
                animation: fadeIn 0.25s ease forwards;
                opacity: 0;
              }
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-2px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            <Tree
              treeData={rcTreeData}
              expandedKeys={expandedKeys}
              onExpand={(keys) => setExpandedKeys(keys)}
              selectable={false}
              showLine={{
                showLeafIcon: false,
              }}
              switcherIcon={(props: any) => {
                if (props.isLeaf) return null;
                return props.expanded ? (
                  <div className="w-6 h-6 rounded-full bg-blue-50/80 flex items-center justify-center">
                    <ChevronDown size={13} className="text-blue-500" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-50/80 flex items-center justify-center hover:bg-blue-50 transition-colors">
                    <ChevronLeft size={13} className="text-gray-400" />
                  </div>
                );
              }}
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
