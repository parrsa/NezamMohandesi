'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X, Upload, Star, Pin, Image as ImageIcon, AlertCircle, Loader2, Calendar, Clock } from 'lucide-react';
import { newsSchema, NewsFormData } from './newsSchema';
import { Input, TextArea } from '@/app/components/Input';
import Modal from '@/app/components/Modal';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface AddNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
    isSubmitting: boolean;
}

const initialValues: NewsFormData = {
    headline: '',
    shortTitle: '',
    leadParagraph: '',
    body: '',
    credit: '',
    caption: '',
    seoTitle: '',
    isExclusive: false,
    isSticky: false,
};

const convertPersianDateToNumber = (date: any): number => {
    if (!date) return 0;

    if (date.year && date.month && date.day) {
        return parseInt(`${date.year}${date.month.toString().padStart(2, '0')}${date.day.toString().padStart(2, '0')}`);
    }

    if (typeof date === 'string') {
        const parts = date.split('/');
        if (parts.length === 3) {
            return parseInt(`${parts[0]}${parts[1].padStart(2, '0')}${parts[2].padStart(2, '0')}`);
        }
    }

    return 0;
};

const convertTimeToNumber = (time: string): number => {
    if (!time) return 0;
    return parseInt(time.replace(':', ''));
};

export default function AddNewsModal({ isOpen, onClose, onSubmit, isSubmitting }: AddNewsModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [publishDate, setPublishDate] = useState<any>(null);
    const [publishTime, setPublishTime] = useState<string>('');
    const [expireDate, setExpireDate] = useState<any>(null);
    const [expireTime, setExpireTime] = useState<string>('');

    useEffect(() => {
        if (!isOpen) {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            setSelectedFile(null);
            setPreviewUrl(null);
            setPublishDate(null);
            setPublishTime('');
            setExpireDate(null);
            setExpireTime('');
        }
    }, [isOpen, previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }

            setSelectedFile(file);
            setFieldValue('newsFile', file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (setFieldValue: any) => {
        if (previewUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedFile(null);
        setPreviewUrl(null);
        setFieldValue('newsFile', null);
    };

    const handleSubmit = async (values: NewsFormData, { setSubmitting }: any) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key !== 'isExclusive' && key !== 'isSticky') {
                formData.append(key, value as string);
            }
        });

        formData.append('IsExclusive', String(values.isExclusive));
        formData.append('IsSticky', String(values.isSticky));

        formData.append('PublishDate', convertPersianDateToNumber(publishDate).toString());
        formData.append('PublishTime', convertTimeToNumber(publishTime).toString());

        formData.append('ExpireDate', convertPersianDateToNumber(expireDate).toString());
        formData.append('ExpireTime', convertTimeToNumber(expireTime).toString());

        if (selectedFile) {
            formData.append('NewsFile', selectedFile);
        }

        await onSubmit(formData);
        setSubmitting(false);
    };

    const headerProps = {
        title: "خبر جدید",
        ColorText: "#1e293b",
        bgColor: "transparent",
        Close_Icon: <X size={24} className="text-gray-500" />,
        className: "border-b border-gray-200 py-4",
    };

    return (
        <Modal
            isVisible={isOpen}
            onClose={onClose}
            auth
            className="w-full md:w-[45%]  h-[95vh] backdrop-blur-xl bg-white rounded-3xl shadow-2xl border border-gray-200"
            showHeader={true}
            headerProps={headerProps}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={newsSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue, values }) => (
                    <Form className="p-6 space-y-6 max-h-[calc(95vh-80px)]">
                        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                            <label className="cursor-pointer">
                                <div className="flex flex-col items-center">
                                    {previewUrl ? (
                                        <div className="relative w-full max-w-md">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(setFieldValue)}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                title="حذف تصویر"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                                                <Upload size={32} className="text-blue-500" />
                                            </div>
                                            <p className="text-gray-700 font-medium mb-2">
                                                تصویر خبر را آپلود کنید
                                            </p>
                                            <p className="text-gray-500 text-sm mb-4">
                                                فرمت‌های مجاز: JPG، PNG، GIF (حداکثر 5MB)
                                            </p>
                                            <span className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-colors">
                                                انتخاب فایل
                                            </span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Calendar size={18} className="text-blue-500" />
                                    تاریخ انتشار
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        value={publishDate}
                                        onChange={setPublishDate}
                                        format="YYYY/MM/DD"
                                        placeholder="انتخاب تاریخ انتشار"
                                        className="w-full"
                                        containerClassName="w-full"
                                        inputClass="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all hover:border-blue-300 bg-white"
                                        calendarPosition="bottom-right"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Clock size={18} className="text-blue-500" />
                                    زمان انتشار
                                </label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={publishTime}
                                        onChange={(e) => setPublishTime(e.target.value)}
                                        className="w-full px-4 py-3  rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all hover:border-blue-300 bg-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        style={{ direction: 'ltr' }}
                                        step="60"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mr-1">فرمت ۲۴ ساعته • مثال: ۱۴:۳۰</p>
                            </div>

                            <div className="space-y-2">
                                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Calendar size={18} className="text-amber-500" />
                                    تاریخ انقضا
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        value={expireDate}
                                        onChange={setExpireDate}
                                        format="YYYY/MM/DD"
                                        placeholder="انتخاب تاریخ انقضا"
                                        className="w-full"
                                        containerClassName="w-full"
                                        inputClass="w-full px-4 py-3 p rounded-xl border-2 border-gray-200 focus:border-amber-500 outline-none transition-all hover:border-amber-300 bg-white"
                                        calendarPosition="bottom-right"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Clock size={18} className="text-amber-500" />
                                    زمان انقضا
                                </label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={expireTime}
                                        onChange={(e) => setExpireTime(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-amber-500 outline-none transition-all hover:border-amber-300 bg-white [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        style={{ direction: 'ltr' }}
                                        step="60"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mr-1">فرمت ۲۴ ساعته • مثال: ۲۳:۴۵</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    عنوان اصلی *
                                </label>
                                <Field
                                    name="headline"
                                    type="text"
                                    as={Input}
                                    variant="form"
                                    rounded="xl"
                                    inputSize="lg"
                                    error={errors.headline}
                                    placeholder="عنوان اصلی خبر"
                                />
                                <ErrorMessage name="headline">
                                    {(msg) => (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    عنوان کوتاه *
                                </label>
                                <Field
                                    as={Input}
                                    variant="form"
                                    name="shortTitle"
                                    rounded="xl"
                                    inputSize="lg"
                                    type="text"
                                    error={errors.shortTitle}
                                    placeholder="عنوان کوتاه برای نمایش"
                                />
                                <ErrorMessage name="shortTitle">
                                    {(msg) => (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    نویسنده *
                                </label>
                                <Field
                                    name="credit"
                                    type="text"
                                    as={Input}
                                    variant="form"
                                    rounded="xl"
                                    inputSize="lg"
                                    error={errors.credit}
                                    placeholder="نام نویسنده"
                                />
                                <ErrorMessage name="credit">
                                    {(msg) => (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    توضیح تصویر *
                                </label>
                                <Field
                                    name="caption"
                                    type="text"
                                    as={Input}
                                    variant="form"
                                    rounded="xl"
                                    inputSize="lg"
                                    error={errors.caption}
                                    placeholder="توضیح تصویر"
                                />
                                <ErrorMessage name="caption">
                                    {(msg) => (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    عنوان سئو *
                                </label>
                                <Field
                                    name="seoTitle"
                                    type="text"
                                    as={Input}
                                    variant="form"
                                    rounded="xl"
                                    inputSize="lg"
                                    error={errors.seoTitle}
                                    placeholder="عنوان برای موتورهای جستجو"
                                />
                                <ErrorMessage name="seoTitle">
                                    {(msg) => (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    خلاصه خبر *
                                </label>
                                <Field
                                    as={TextArea}
                                    name="leadParagraph"
                                    rows={4}
                                    rounded="xl"
                                    inputSize="lg"
                                    error={errors.leadParagraph}
                                    placeholder="خلاصه خبر برای نمایش در کارت..."
                                />
                                <ErrorMessage name="leadParagraph">
                                    {(msg) => (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    متن کامل خبر *
                                </label>
                                <Field
                                    name="body"
                                    rows={6}
                                    as={TextArea}
                                    rounded="xl"
                                    inputSize="lg"
                                    error={errors.body}
                                    placeholder="متن کامل خبر..."
                                />
                                <ErrorMessage name="body">
                                    {(msg) => (
                                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div className="flex gap-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Field
                                    type="checkbox"
                                    name="isExclusive"
                                    className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                                />
                                <Star size={20} className={values.isExclusive ? 'text-yellow-500' : 'text-gray-400'} />
                                <span className="font-medium text-gray-700">خبر انحصاری</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <Field
                                    type="checkbox"
                                    name="isSticky"
                                    className="w-5 h-5 text-red-500 rounded border-gray-300 focus:ring-red-500"
                                />
                                <Pin size={20} className={values.isSticky ? 'text-red-500' : 'text-gray-400'} />
                                <span className="font-medium text-gray-700">خبر مهم</span>
                            </label>
                        </div>

                        <div className="flex justify-end gap-4 pb-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-8 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>در حال ثبت...</span>
                                    </>
                                ) : (
                                    'ثبت خبر'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}