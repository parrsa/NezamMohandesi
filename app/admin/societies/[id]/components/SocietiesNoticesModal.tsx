"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  X,
  AlertCircle,
  Loader2,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { Input, TextArea } from "@/app/components/Input";
import Modal from "@/app/components/Modal";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  SocietiesNoticesFormData,
  societiesNoticesSchema,
} from "./societiesNoticesSchema";
import { ParamValue } from "next/dist/server/request/params";
import { formatDateForBackend } from "@/app/lib/persianToEnglishNumber";

interface SocietiesNoticesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
  societyId: ParamValue;
}

const priorityOptions = [
  { value: 0, label: "کم اهمیت" },
  { value: 1, label: "عادی" },
  { value: 2, label: "فوری" },
  { value: 3, label: "اضطراری" },
];

const typeOptions = [
  { value: 0, label: "عمومی" },
  { value: 1, label: "مهم" },
  { value: 2, label: "رویداد" },
  { value: 3, label: "هشدار" },
  { value: 4, label: "سیستمی" },
];

export default function AddSocietiesNoticesModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  societyId,
}: SocietiesNoticesModalProps) {
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<
    string | null
  >(null);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const [publishDateValue, setPublishDateValue] = useState<any>(null);

  const initialValues: SocietiesNoticesFormData = {
    title: "",
    description: "",
    priority: 0,
    type: 0,
    expirationDate: "",
    attachmentPath: null,
  };

  useEffect(() => {
    if (!isOpen) {
      if (featuredImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(featuredImagePreview);
      }
      attachmentPreviews.forEach((preview) => {
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
      setFeaturedImageFile(null);
      setFeaturedImagePreview(null);
      setAttachmentPreviews([]);
      setPublishDateValue(null);
    }
  }, [isOpen]);

  const handleFeaturedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (featuredImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(featuredImagePreview);
      }
      setFeaturedImageFile(file);
      setFieldValue("attachment", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFeaturedImage = (setFieldValue: any) => {
    if (featuredImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(featuredImagePreview);
    }
    setFeaturedImageFile(null);
    setFeaturedImagePreview(null);
    setFieldValue("attachment", null);
  };

  const handleSubmit = async (
    values: SocietiesNoticesFormData,
    { setSubmitting }: any,
  ) => {
    try {
      const formData = new FormData();
      formData.append("SocietyId", String(societyId));
      formData.append("Title", values.title);
      formData.append("Description", values.description);
      formData.append("Priority", String(values.priority));
      formData.append("Type", String(values.type));

      if (featuredImageFile) {
        formData.append("Attachment", featuredImageFile);
      }

      if (publishDateValue) {
        const dateString = formatDateForBackend(publishDateValue);
        formData.append("ExpirationDate", dateString);
      }
      console.log(formData.values);
      await onSubmit(formData);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const headerProps = {
    title: "ایجاد مصوبه جدید",
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
      className="w-full md:w-[55%] h-[95vh] backdrop-blur-xl bg-white rounded-3xl shadow-2xl border border-gray-200"
      showHeader={true}
      headerProps={headerProps}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={societiesNoticesSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form className="p-6 space-y-6 max-h-[calc(95vh-80px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان *
                </label>
                <Field
                  name="title"
                  type="text"
                  as={Input}
                  variant="form"
                  rounded="xl"
                  inputSize="lg"
                  error={errors.title}
                  placeholder="عنوان"
                />
                <ErrorMessage name="title">
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
                  توضیحات *
                </label>
                <Field
                  as={TextArea}
                  name="description"
                  rows={3}
                  rounded="xl"
                  inputSize="lg"
                  error={errors.description}
                  placeholder="توضیحات..."
                />
                <ErrorMessage name="description">
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
                  اولویت بندی *
                </label>
                <Field name="priority">
                  {({ field }: any) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <ErrorMessage name="priority">
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
                  نوع *
                </label>
                <Field name="type">
                  {({ field }: any) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                      {typeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <ErrorMessage name="type">
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
                  تاریخ انقضا
                </label>
                <div className="relative">
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={publishDateValue}
                    onChange={setPublishDateValue}
                    format="YYYY/MM/DD"
                    placeholder="انتخاب تاریخ و زمان"
                    className="w-full"
                    containerClassName="w-full"
                    inputClass="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all bg-white"
                    calendarPosition="bottom-right"
                  />
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                تصویر شاخص
              </label>
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    {featuredImagePreview ? (
                      <div className="relative w-full max-w-md">
                        <img
                          src={featuredImagePreview}
                          alt="Featured"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveFeaturedImage(setFieldValue)
                          }
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                          <ImageIcon size={32} className="text-blue-500" />
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          تصویر شاخص را آپلود کنید
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          فرمت‌های مجاز: JPG، PNG، WEBP (حداکثر 10MB)
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
                      onChange={(e) =>
                        handleFeaturedImageChange(e, setFieldValue)
                      }
                    />
                  </div>
                </label>
              </div>
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
                  "ثبت مصوبه"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
