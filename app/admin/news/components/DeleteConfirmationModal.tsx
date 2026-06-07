'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
    title?: string;
    message?: string;
}

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
    title = 'حذف خبر',
    message = 'آیا از حذف این خبر اطمینان دارید؟ این عمل قابل بازگشت نیست.'
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle size={40} className="text-red-500" />
                        </div>
                        <p className="text-gray-600">{message}</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-red-500 to-pink-500 text-white font-medium hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>در حال حذف...</span>
                                </>
                            ) : (
                                'حذف خبر'
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}