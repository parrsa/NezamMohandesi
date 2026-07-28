"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { X, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { Input, TextArea } from "@/app/components/Input";
import Modal from "@/app/components/Modal";
import { SliderFormData, sliderSchema } from "./sliderSchem";

interface AddSliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function AddSliderModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: AddSliderModalProps) {
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<
    string | null
  >(null);

  const initialValues: SliderFormData = {
    title: "",
    imageAlt: "",
    link: "",
    displayOrder: 0,
    imageFile: null,
    position: 0,
    isActive: true,
  };

  useEffect(() => {
    if (!isOpen) {
      if (featuredImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(featuredImagePreview);
      }
      setFeaturedImageFile(null);
      setFeaturedImagePreview(null);
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
    setFieldValue("featuredImage", null);
  };

  const handleSubmit = async (
    values: SliderFormData,
    { setSubmitting }: any,
  ) => {
    try {
      const formData = new FormData();

      formData.append("Title", values.title);
      formData.append("ImageAlt", values.imageAlt);
      formData.append("Link", values.link);
      formData.append("isActive", String(values.isActive));
      formData.append("DisplayOrder", "0");
      formData.append("Position", "0");

      if (featuredImageFile) {
        formData.append("ImageFile", featuredImageFile);
      }

      await onSubmit(formData);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const headerProps = {
    title: "ایجاد بنر جدید",
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
        validationSchema={sliderSchema}
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
                  placeholder="عنوان بنر"
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
                  توضیحات بنر
                </label>
                <Field
                  as={TextArea}
                  name="imageAlt"
                  rows={3}
                  rounded="xl"
                  inputSize="lg"
                  error={errors.imageAlt}
                  placeholder="توضیحات عکس..."
                />
                <ErrorMessage name="imageAlt">
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
                  لینک *
                </label>
                <Field
                  name="link"
                  rows={8}
                  as={TextArea}
                  rounded="xl"
                  inputSize="lg"
                  error={errors.link}
                  placeholder="آدرس بنر..."
                />
                <ErrorMessage name="link">
                  {(msg) => (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                تصویر بنر
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
                          تصویر بنر را آپلود کنید
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
