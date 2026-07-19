"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  X,
  Upload,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  Hash,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Input, Select, TextArea } from "@/app/components/Input";
import Modal from "@/app/components/Modal";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ContentFormData, contentSchema } from "../contentSchema";
import { useGetAllTags } from "@/app/core/services/Tags/useTags";
import { ParamValue } from "next/dist/server/request/params";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
  categoryId: ParamValue;
}

const statusOptions = [
  { value: 0, label: "پیش‌نویس" },
  { value: 1, label: "منتشر شده" },
  { value: 2, label: "بایگانی شده" },
  { value: 3, label: "زمان‌بندی شده" },
];

export default function AddContentModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  categoryId,
}: AddContentModalProps) {
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<
    string | null
  >(null);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const [publishDateValue, setPublishDateValue] = useState<any>(null);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const initialValues: ContentFormData = {
    title: "",
    summary: "",
    body: "",
    status: 1,
    tagIds: 4,
    publishDate: "",
    featuredImage: null,
    files: [],
  };

  const { data: tagsData, isLoading: tagsLoading } = useGetAllTags();

  const tagOptions =
    tagsData?.map((tag: any) => ({
      value: tag.id,
      label: tag.name,
    })) || [];

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
      setAttachmentFiles([]);
      setAttachmentPreviews([]);
      setPublishDateValue(null);
      setSelectedTags([]);
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
      setFieldValue("featuredImage", file);
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
    // setFieldValue("featuredImage", null);
  };

  const handleAttachmentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachmentFiles((prev) => [...prev, ...newFiles]);
      setFieldValue("files", [...attachmentFiles, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachmentPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveAttachment = (index: number, setFieldValue: any) => {
    if (attachmentPreviews[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(attachmentPreviews[index]);
    }
    const newFiles = attachmentFiles.filter((_, i) => i !== index);
    const newPreviews = attachmentPreviews.filter((_, i) => i !== index);
    setAttachmentFiles(newFiles);
    setAttachmentPreviews(newPreviews);
    setFieldValue("files", newFiles);
  };

  const generateSlug = (title: string): string => {
    return title
      .trim()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const generateMetaTitle = (title: string): string => {
    return `${title} | وبسایت خبری`;
  };

  const generateMetaDescription = (summary: string): string => {
    return summary.length > 160 ? summary.substring(0, 157) + "..." : summary;
  };

  const handleSubmit = async (
    values: ContentFormData,
    { setSubmitting }: any,
  ) => {
    const formData = new FormData();

    const slug = generateSlug(values.title);
    const metaTitle = generateMetaTitle(values.title);
    const metaDescription = generateMetaDescription(values.summary);

    formData.append("Title", values.title);
    formData.append("Summary", values.summary);
    formData.append("Body", values.body);
    formData.append("Status", String(values.status));
    formData.append("CategoryId", categoryId);
    formData.append("Slug", slug);
    formData.append("MetaTitle", metaTitle);
    formData.append("MetaDescription", metaDescription);
    formData.append("FeaturedImage", metaDescription);
    formData.append("TagIds", 4);

    // if (values.tagIds && values.tagIds.length > 0) {
    //   values.tagIds.forEach((tagId: number | undefined) => {
    //     formData.append("TagIds", String(tagId));
    //   });
    // }

    if (publishDateValue) {
      const date = new Date(publishDateValue);
      formData.append("PublishDate", date.toISOString());
    }

    // if (featuredImageFile) {
    //   formData.append("FeaturedImage", featuredImageFile);
    // }

    attachmentFiles.forEach((file, index) => {
      formData.append("Files", file);
      const fileMetadata = {
        fileName: file.name,
        displayName: file.name,
        isMainAttachment: index === 0,
        fileType: file.type,
        description: `فایل پیوست ${index + 1}`,
      };
      formData.append("FilesMetadata", JSON.stringify(fileMetadata));
    });

    await onSubmit(formData);
    setSubmitting(false);
  };

  const headerProps = {
    title: "ایجاد محتوای جدید",
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
        validationSchema={contentSchema}
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
                  placeholder="عنوان محتوا"
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
                  خلاصه *
                </label>
                <Field
                  as={TextArea}
                  name="summary"
                  rows={3}
                  rounded="xl"
                  inputSize="lg"
                  error={errors.summary}
                  placeholder="خلاصه محتوا..."
                />
                <ErrorMessage name="summary">
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
                  متن کامل *
                </label>
                <Field
                  name="body"
                  rows={8}
                  as={TextArea}
                  rounded="xl"
                  inputSize="lg"
                  error={errors.body}
                  placeholder="متن کامل محتوا..."
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وضعیت *
                </label>
                <Field name="status">
                  {({ field }: any) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <ErrorMessage name="status">
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
                  تاریخ انتشار
                </label>
                <div className="relative">
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={publishDateValue}
                    onChange={setPublishDateValue}
                    format="YYYY/MM/DD - HH:mm"
                    placeholder="انتخاب تاریخ و زمان انتشار"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تگ‌ها
                </label>
                <Select
                  variant="default"
                  options={tagOptions}
                  value={selectedTags}
                  onChange={(selected: any) => {
                    setSelectedTags(selected || []);
                    setFieldValue(
                      "tagIds",
                      (selected || []).map((item: any) => item.value),
                    );
                  }}
                />
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

            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                فایل‌های پیوست
              </label>
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    {attachmentPreviews.length > 0 ? (
                      <div className="w-full grid grid-cols-3 gap-4">
                        {attachmentPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveAttachment(index, setFieldValue)
                              }
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-24 hover:border-purple-500 transition-colors">
                          <Upload size={24} className="text-gray-400" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                          <FileText size={32} className="text-purple-500" />
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          فایل‌های پیوست را آپلود کنید
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          فرمت‌های مجاز: PDF، DOC، DOCX، تصاویر (حداکثر 20MB)
                        </p>
                        <span className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
                          انتخاب فایل‌ها
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={(e) => handleAttachmentChange(e, setFieldValue)}
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
                  "ثبت محتوا"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
