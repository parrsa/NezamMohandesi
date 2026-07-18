"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { categoriesSchema, CategoriesFormData } from "./categoriesSchema";
import { Input, TextArea } from "@/app/components/Input";
import Modal from "@/app/components/Modal";
import { useEffect, useMemo } from "react";
import { FormikSwitch } from "@/app/components/FormikSwitch";
import { ParamValue } from "next/dist/server/request/params";

interface EditCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
  data: any;
  parentId?: ParamValue;
}

export default function EditCategoriesModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  data,
  parentId,
}: EditCategoriesModalProps) {
  const initialValues: CategoriesFormData = useMemo(() => {
    return {
      name: data?.name || "",
      description: data?.description || "",
      isActive: data?.isActive ?? true,
    };
  }, [data]);

  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  const handleSubmit = async (
    values: CategoriesFormData,
    { setSubmitting }: any,
  ) => {
    const payload = {
      id: data?.id,
      formData: {
        id: data?.id,
        name: values.name,
        description: values.description,
        isActive: values.isActive,
        parentId: null,
      },
    };

    await onSubmit(payload);
    setSubmitting(false);
  };

  const headerProps = {
    title: `${parentId ? "ویرایش زیر دسته" : "ویرایش دسته بندی"}`,
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
      <Formik
        key={data?.id || "edit-form"}
        initialValues={initialValues}
        validationSchema={categoriesSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ errors, setFieldValue, values }) => (
          <Form className="p-6 space-y-6 max-h-[calc(95vh-80px)]">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان اصلی *
                </label>
                <Field
                  name="name"
                  type="text"
                  as={Input}
                  variant="form"
                  rounded="xl"
                  inputSize="lg"
                  error={errors.name}
                  placeholder="عنوان دسته بندی"
                />
                <ErrorMessage name="name">
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
                  توضیحات *
                </label>
                <Field
                  as={TextArea}
                  name="description"
                  rows={4}
                  rounded="xl"
                  inputSize="lg"
                  error={errors.description}
                  placeholder="توضیحات دسته بندی..."
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
            </div>
            <div className="w-full border-b pb-4 border-neutral-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  فعال/غیرفعال *
                </label>
                <FormikSwitch
                  name="isActive"
                  label={values.isActive ? "فعال" : "غیرفعال"}
                />

                <ErrorMessage name="isActive">
                  {(msg) => (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
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
                    <span>در حال بروزرسانی...</span>
                  </>
                ) : (
                  "بروزرسانی دسته بندی"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
