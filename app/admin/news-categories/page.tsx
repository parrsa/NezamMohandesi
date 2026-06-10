'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderTree,
    Plus,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Loader2,
    Hash,
    FileText,
    Save,
    X,
    CheckCircle,
    FolderOpen,
    Layers,
} from 'lucide-react';
import { toastify } from '@/app/components/Toasts';
import { showErrorToasts } from '@/app/lib/showErrorToastify';
import { useHeaderAction } from '@/app/core/provider/HeaderActionProvider/HeaderAction';
import Modal from '@/app/components/Modal';
import { Input } from '@/app/components/Input';

interface NewsCategory {
    id: string;
    title: string;
    slug: string;
    description: string;
    newsCount: number;
    createdAt: number;
    isActive: boolean;
}


export default function NewsCategoriesPage() {
    const { setAction, setActionSecound } = useHeaderAction();
    const [categories, setCategories] = useState<NewsCategory[]>([
        {
            id: '1',
            title: 'سیاسی',
            slug: 'political',
            description: 'اخبار سیاسی و تحولات داخلی',
            newsCount: 24,
            createdAt: Date.now(),
            isActive: true,
        },
        {
            id: '2',
            title: 'قضایی',
            slug: 'judicial',
            description: 'اخبار قوه قضاییه و احکام',
            newsCount: 18,
            createdAt: Date.now(),
            isActive: true,
        },
        {
            id: '3',
            title: 'اجتماعی',
            slug: 'social',
            description: 'اخبار اجتماعی و فرهنگی',
            newsCount: 12,
            createdAt: Date.now(),
            isActive: true,
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<NewsCategory | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<NewsCategory | null | any>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setAction(
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
            >
                <div className="p-2.5 rounded-xl bg-linear-to-br from-emerald-600 to-teal-600 shadow-lg">
                    <FolderTree size={22} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        دسته‌بندی اخبار
                    </h1>
                    <p className="text-xs text-slate-500">مدیریت دسته‌بندی‌های اخبار</p>
                </div>
            </motion.div>
        );

        setActionSecound(
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal()}
                className="relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm font-medium"
            >
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Plus size={16} />
                <span>دسته‌بندی جدید</span>
            </motion.button>
        );

        return () => {
            setAction(null);
            setActionSecound(null);
        };
    }, [setAction, setActionSecound]);

    const openModal = (category?: NewsCategory) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                title: category.title,
                slug: category.slug,
                description: category.description,
            });
        } else {
            setEditingCategory(null);
            setFormData({
                title: '',
                slug: '',
                description: '',
            });
        }
        setFormErrors({});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ title: '', slug: '', description: '' });
    };

    const generateSlug = (title: string) => {
        return title
            .trim()
            .toLowerCase()
            .replace(/[^\u0600-\u06FF\w\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/ـ/g, '-');
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.title.trim()) {
            errors.title = 'عنوان دسته‌بندی الزامی است';
        }
        if (!formData.slug.trim()) {
            errors.slug = 'اسلاگ الزامی است';
        }
        if (formData.slug.includes(' ')) {
            errors.slug = 'اسلاگ نباید شامل فاصله باشد';
        }
        // بررسی تکراری نبودن اسلاگ
        const slugExists = categories.some(
            cat => cat.slug === formData.slug && cat.id !== editingCategory?.id
        );
        if (slugExists) {
            errors.slug = 'این اسلاگ قبلاً استفاده شده است';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            if (editingCategory) {
                setCategories(prev =>
                    prev.map(cat =>
                        cat.id === editingCategory.id
                            ? {
                                ...cat,
                                title: formData.title,
                                slug: formData.slug,
                                description: formData.description,
                            }
                            : cat
                    )
                );
                toastify('success', 'دسته‌بندی با موفقیت ویرایش شد');
            } else {
                const newCategory: NewsCategory = {
                    id: Date.now().toString(),
                    title: formData.title,
                    slug: formData.slug,
                    description: formData.description,
                    newsCount: 0,
                    createdAt: Date.now(),
                    isActive: true,
                };
                setCategories(prev => [newCategory, ...prev]);
                toastify('success', 'دسته‌بندی با موفقیت ایجاد شد');
            }
            closeModal();
        } catch (error) {
            showErrorToasts(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setCategories(prev => prev.filter(cat => cat.id !== deleteTarget.id));
            toastify('success', 'دسته‌بندی با موفقیت حذف شد');
            setDeleteTarget(null);
        } catch (error) {
            showErrorToasts(error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    };

    const headerProps = {
        title: editingCategory ? 'ویرایش دسته‌بندی' : 'دسته‌بندی جدید',
        ColorText: '#1e293b',
        bgColor: 'transparent',
        Close_Icon: <X size={24} className="text-gray-500" />,
        className: 'border-b border-gray-200 py-4',
    };

    return (
        <div className="w-full bg-linear-to-br from-slate-50 via-white to-slate-50 min-h-screen" dir="rtl">
            <div className="p-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
                >
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">تعداد دسته‌بندی‌ها</p>
                                <h3 className="text-3xl font-bold text-slate-800">{categories.length}</h3>
                            </div>
                            <div className="p-4 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500">
                                <FolderTree size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">کل اخبار</p>
                                <h3 className="text-3xl font-bold text-slate-800">
                                    {categories.reduce((sum, cat) => sum + cat.newsCount, 0)}
                                </h3>
                            </div>
                            <div className="p-4 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-500">
                                <FileText size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">میانگین هر دسته</p>
                                <h3 className="text-3xl font-bold text-slate-800">
                                    {Math.round(categories.reduce((sum, cat) => sum + cat.newsCount, 0) / categories.length) || 0}
                                </h3>
                            </div>
                            <div className="p-4 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500">
                                <Layers size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {isLoading && !isModalOpen ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                            <Loader2 size={48} className="text-slate-400" />
                        </motion.div>
                        <p className="text-slate-500 mt-4">در حال بارگذاری...</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">#</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">عنوان</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">اسلاگ</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">توضیحات</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">تعداد اخبار</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">تاریخ ایجاد</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {categories.map((category, index) => (
                                            <motion.tr
                                                key={category.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <FolderOpen size={16} className="text-emerald-500" />
                                                        <span className="font-medium text-slate-700">{category.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <code className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                                                        {category.slug}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                                                    {category.description || '—'}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                                                        {category.newsCount}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {formatDate(category.createdAt)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => openModal(category)}
                                                            className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                                                        >
                                                            <Edit size={18} />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => setDeleteTarget(category)}
                                                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                        {categories.length === 0 && (
                            <div className="text-center py-12">
                                <FolderTree size={48} className="text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-400">هیچ دسته‌بندی وجود ندارد</p>
                                <p className="text-slate-400 text-sm">با کلیک روی دکمه "دسته‌بندی جدید" شروع کنید</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            <Modal
                isVisible={isModalOpen}
                onClose={closeModal}
                auth
                className="w-full md:w-[500px] backdrop-blur-xl bg-white rounded-3xl shadow-2xl border border-gray-200"
                showHeader
                headerProps={headerProps}
            >
                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            عنوان دسته‌بندی *
                        </label>
                        <Input
                            value={formData.title}
                            onChange={(e) => {
                                const title = e.target.value;
                                setFormData(prev => ({
                                    ...prev,
                                    title,
                                    slug: editingCategory ? prev.slug : generateSlug(title),
                                }));
                                setFormErrors(prev => ({ ...prev, title: '' }));
                            }}
                            placeholder="مثال: اخبار قضایی"
                            variant="form"
                            rounded="xl"
                            inputSize="lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            اسلاگ (شناسه یکتا) *
                        </label>
                        <div className="relative">
                            <Hash size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Input
                                value={formData.slug}
                                onChange={(e) => {
                                    const slug = e.target.value.toLowerCase().replace(/\s+/g, '-');
                                    setFormData(prev => ({ ...prev, slug }));
                                    setFormErrors(prev => ({ ...prev, slug: '' }));
                                }}
                                placeholder="مثال: judicial-news"
                                variant="form"
                                rounded="xl"
                                inputSize="lg"
                                className="pr-10"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">فقط حروف انگلیسی، اعداد و خط تیره - مجاز است</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            توضیحات (اختیاری)
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, description: e.target.value }));
                                setFormErrors(prev => ({ ...prev, description: '' }));
                            }}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 outline-none transition-all resize-none"
                            placeholder="توضیحات مربوط به این دسته‌بندی..."
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            انصراف
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-6 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>در حال ثبت...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>{editingCategory ? 'ویرایش' : 'ایجاد'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isVisible={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                auth
                className="w-full md:w-[450px] backdrop-blur-xl bg-white rounded-3xl shadow-2xl"
                showHeader
                headerProps={{
                    title: 'حذف دسته‌بندی',
                    ColorText: '#991b1b',
                    bgColor: 'transparent',
                    Close_Icon: <X size={24} className="text-gray-500" />,
                    className: 'border-b border-red-100',
                }}
            >
                <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                        <Trash2 size={32} className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                        آیا از حذف این دسته‌بندی مطمئن هستید؟
                    </h3>
                    <p className="text-slate-500 mb-6">
                        دسته‌بندی "{deleteTarget?.title}" دارای {deleteTarget?.newsCount} خبر است.
                        {deleteTarget?.newsCount > 0 && ' با حذف این دسته‌بندی، اخبار آن بدون دسته‌بندی می‌شوند.'}
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setDeleteTarget(null)}
                            className="px-6 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="px-6 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                            <span>حذف</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}