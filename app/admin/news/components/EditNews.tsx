'use client';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { X, Upload, Star, Pin, AlertCircle, Loader2, Calendar, Clock } from 'lucide-react';
import { useGetNewsById } from '@/app/core/services/News/useNews';
import { newsSchema, NewsFormData } from './newsSchema';
import { Input, TextArea } from '@/app/components/Input';
import Modal from '@/app/components/Modal';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from 'react-multi-date-picker';
import path from 'path';

interface EditNewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsId: string | null;
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

const convertPersianNumberToDateObject = (dateNum: number): DateObject | null => {
    if (!dateNum) return null;
    const dateStr = dateNum.toString();
    if (dateStr.length === 8) {
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6));
        const day = parseInt(dateStr.substring(6, 8));

        return new DateObject({
            year,
            month,
            day,
            calendar: persian,
            locale: persian_fa
        });
    }
    return null;
};

const convertDateObjectToPersianNumber = (date: any): number => {
    if (!date) return 0;

    if (date.year && date.month && date.day) {
        return parseInt(`${date.year}${date.month.toString().padStart(2, '0')}${date.day.toString().padStart(2, '0')}`);
    }

    return 0;
};

const convertNumberToTimeString = (timeNum: number): string => {
    if (!timeNum) return '';
    const timeStr = timeNum.toString().padStart(4, '0');
    return `${timeStr.substring(0, 2)}:${timeStr.substring(2, 4)}`;
};

const convertTimeStringToNumber = (timeString: string): number => {
    if (!timeString) return 0;
    return parseInt(timeString.replace(':', ''));
};

export default function EditNewsModal({ isOpen, onClose, newsId, onSubmit, isSubmitting }: EditNewsModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

    const [publishDate, setPublishDate] = useState<any>(null);
    const [publishTime, setPublishTime] = useState<string>('');
    const [expireDate, setExpireDate] = useState<any>(null);
    const [expireTime, setExpireTime] = useState<string>('');

    const { data: newsData, isLoading: isLoadingNews } = useGetNewsById(newsId || "");

    useEffect(() => {
        if (newsData?.data) {
            if (newsData.data.publishDate) {
                const publishDateObj = convertPersianNumberToDateObject(newsData.data.publishDate);
                setPublishDate(publishDateObj);
            }

            if (newsData.data.publishTime !== undefined) {
                setPublishTime(convertNumberToTimeString(newsData.data.publishTime));
            }

            if (newsData.data.expireDate) {
                const expireDateObj = convertPersianNumberToDateObject(newsData.data.expireDate);
                setExpireDate(expireDateObj);
            }

            if (newsData.data.expireTime !== undefined) {
                setExpireTime(convertNumberToTimeString(newsData.data.expireTime));
            }
        }
    }, [newsData]);

    useEffect(() => {
        const loadImage = async () => {
            if (newsData?.data?.newsFileId && isOpen) {
                try {
                    const response = await fetch(
                        `http://10.0.1.141:8082/Api/File/DownloadFileById?fileId=${newsData.data.newsFileId}`,
                        { method: 'POST' }
                    );
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = URL.createObjectURL(blob);
                        setCurrentImageUrl(url);
                        setPreviewUrl(url);
                    }
                } catch (error) {
                    console.error('Failed to load image:', error);
                }
            }
        };

        loadImage();

        return () => {
            if (currentImageUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(currentImageUrl);
            }
        };
    }, [newsData, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            if (currentImageUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(currentImageUrl);
            }
            setSelectedFile(null);
            setPreviewUrl(null);
            setCurrentImageUrl(null);
            setPublishDate(null);
            setPublishTime('');
            setExpireDate(null);
            setExpireTime('');
        }
    }, [isOpen]);

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
        setPreviewUrl(currentImageUrl);
        setFieldValue('newsFile', null);
    };

    const handleClearImage = (setFieldValue: any) => {
        if (previewUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        if (currentImageUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(currentImageUrl);
        }
        setSelectedFile(null);
        setPreviewUrl(null);
        setCurrentImageUrl(null);
        setFieldValue('newsFile', null);
    };

    const handleSubmit = async (values: NewsFormData, { setSubmitting }: any) => {
        if (!newsId) return;

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key !== 'isExclusive' && key !== 'isSticky') {
                formData.append(key, value as string);
            }
        });

        formData.append('IsExclusive', String(values.isExclusive));
        formData.append('IsSticky', String(values.isSticky));
        formData.append("Id", newsId);

        formData.append('PublishDate', convertDateObjectToPersianNumber(publishDate).toString());
        formData.append('PublishTime', convertTimeStringToNumber(publishTime).toString());

        formData.append('ExpireDate', convertDateObjectToPersianNumber(expireDate).toString());
        formData.append('ExpireTime', convertTimeStringToNumber(expireTime).toString());

        if (selectedFile) {
            formData.append('NewsFile', selectedFile);
        }

        await onSubmit(formData);
        setSubmitting(false);
    };

    if (!isOpen || !newsId) return null;

    const headerProps = {
        title: "ویرایش خبر",
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
            className="w-full md:w-[45%] h-[95vh] backdrop-blur-xl bg-white rounded-3xl shadow-2xl border border-gray-200"
            showHeader={true}
            headerProps={headerProps}
        >
            {isLoadingNews ? (
                <div className="p-12 flex flex-col items-center justify-center">
                    <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-600">در حال بارگذاری اطلاعات خبر...</p>
                </div>
            ) : (
                <Formik
                    initialValues={{
                        headline: newsData?.data?.headline || '',
                        shortTitle: newsData?.data?.shortTitle || '',
                        leadParagraph: newsData?.data?.leadParagraph || '',
                        body: newsData?.data?.body || '',
                        credit: newsData?.data?.credit || '',
                        caption: newsData?.data?.caption || '',
                        seoTitle: newsData?.data?.seoTitle || '',
                        isExclusive: newsData?.data?.isExclusive || false,
                        isSticky: newsData?.data?.isSticky || false,
                    }}
                    validationSchema={newsSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form className="p-6 space-y-6 max-h-[calc(95vh-80px)] ">
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
                                                <div className="absolute top-2 right-2 flex gap-2">
                                                    {selectedFile && currentImageUrl && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveImage(setFieldValue)}
                                                            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                                                            title="بازگشت به تصویر قبلی"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleClearImage(setFieldValue)}
                                                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                        title="حذف تصویر"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                                    {selectedFile ? 'تصویر جدید' : 'تصویر فعلی'}
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                                                    <Upload size={32} className="text-blue-500" />
                                                </div>
                                                <p className="text-gray-700 font-medium mb-2">
                                                    {currentImageUrl ? 'تغییر تصویر خبر' : 'افزودن تصویر خبر'}
                                                </p>
                                                <p className="text-gray-500 text-sm mb-4">
                                                    فرمت‌های مجاز: JPG، PNG، GIF (حداکثر 5MB)
                                                </p>
                                                {!previewUrl && !currentImageUrl && (
                                                    <p className="text-amber-600 text-sm mb-2 bg-amber-50 px-4 py-2 rounded-full">
                                                        ⚠️ این خبر تصویر ندارد
                                                    </p>
                                                )}
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
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
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
                                    {newsData?.data?.publishDateDisplay && (
                                        <p className="text-xs text-gray-500">
                                            {newsData.data.publishDateDisplay}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Clock size={18} className="text-blue-500" />
                                        زمان انتشار
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="time"
                                            value={publishTime}
                                            onChange={(e) => setPublishTime(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all hover:border-blue-300 bg-white"
                                            style={{ direction: 'ltr' }}
                                            step="60"
                                        />
                                    </div>
                                    {newsData?.data?.publishTimeDisplay && (
                                        <p className="text-xs text-gray-500">
                                            {newsData.data.publishTimeDisplay}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
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
                                            inputClass="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 outline-none transition-all hover:border-amber-300 bg-white"
                                            calendarPosition="bottom-right"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
                                    </div>
                                    {newsData?.data?.expireDateDisplay && (
                                        <p className="text-xs text-gray-500">
                                            {newsData.data.expireDateDisplay}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Clock size={18} className="text-amber-500" />
                                        زمان انقضا
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="time"
                                            value={expireTime}
                                            onChange={(e) => setExpireTime(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 outline-none transition-all hover:border-amber-300 bg-white"
                                            style={{ direction: 'ltr' }}
                                            step="60"
                                        />
                                    </div>
                                    {newsData?.data?.expireTimeDisplay && (
                                        <p className="text-xs text-gray-500">
                                            {newsData.data.expireTimeDisplay}
                                        </p>
                                    )}
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

                            <div className="flex justify-end gap-4  pb-4 pt-6 border-t border-gray-200">
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
                                            <span>در حال بروزرسانی...</span>
                                        </>
                                    ) : (
                                        'بروزرسانی خبر'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </Modal>
    );
}