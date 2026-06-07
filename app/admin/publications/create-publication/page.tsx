"use client";
import { useState, ChangeEvent, JSX, useEffect, useRef } from "react";
import { useFormik } from "formik";
import {
  Upload,
  X,
  Save,
  Loader2,
  FileText,
  Image,
  Calendar,
  User,
  Building,
  Hash,
  Volume2,
  BookOpen,
  CheckCircle,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/Textarea";
import { PublicationFormData } from "../types";
import { validationSchema } from "./schema/index";
import { useCreatePublication } from "@/app/core/services/Publications/mutation";
import { toastify } from "@/app/components/Toasts";
import FormikPersianDatePicker from "@/app/components/FormikPersianDatePicker";
import { useHeaderAction } from "@/app/core/provider/HeaderActionProvider/HeaderAction";
import { showErrorToasts } from "@/app/lib/showErrorToastify";
import { formatDateForBackend } from "@/app/lib/persianToEnglishNumber";

// ──────────────────────────────────────────────
// Utility Functions
// ──────────────────────────────────────────────

const formatDateToBackend = (dateString: string): string => {
  if (!dateString) return "";
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const year = parts[0].padStart(4, "0");
    const month = parts[1].padStart(2, "0");
    const day = parts[2].padStart(2, "0");
    return year + month + day;
  }
  return dateString.replace(/\D/g, "");
};

const getTodayJalali = (): string => {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(today);
  const year = parts.find((p) => p.type === "year")?.value || "1403";
  const month = parts.find((p) => p.type === "month")?.value || "01";
  const day = parts.find((p) => p.type === "day")?.value || "01";
  return `${year}/${month}/${day}`;
};

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

export default function CreatePublication(): JSX.Element {
  const [previewCover, setPreviewCover] = useState<string>("");
  const [isSubmittingOnce, setIsSubmittingOnce] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const createPublicationMutation = useCreatePublication();

  // ── Formik Setup ──
  const formik = useFormik<PublicationFormData>({
    initialValues: {
      publicationTitle: "",
      description: "",
      editorInChief: "",
      managingPublisher: "",
      issueNumber: "",
      volume: "",
      publicationDate: getTodayJalali(),
      publicationFile: null,
      publicationCover: null,
    },
    validationSchema,
    onSubmit: async (values: PublicationFormData) => {
      // ── جلوگیری از دابل‌سابمیت ──
      if (isSubmittingOnce || createPublicationMutation.isPending) {
        return;
      }

      setIsSubmittingOnce(true);

      // ── ساخت FormData ──
      const formDataToSend = new FormData();
      const textFields: Array<keyof PublicationFormData> = [
        "publicationTitle",
        "description",
        "editorInChief",
        "managingPublisher",
        "issueNumber",
        "volume",
        "publicationDate",
      ];

      textFields.forEach((field) => {
        let value = values[field];
        if (field === "publicationDate") {
          value = formatDateForBackend(value as string);
        }
        if (value !== null && value !== undefined && value !== "") {
          formDataToSend.append(field, value.toString());
        }
      });
      if (values.publicationFile) {
        formDataToSend.append("publicationFile", values.publicationFile);
      }
      if (values.publicationCover) {
        formDataToSend.append("publicationCover", values.publicationCover);
      }

      // ── ارسال درخواست ──
      createPublicationMutation.mutate(formDataToSend, {
        onSuccess: () => {
          toastify("success", "نشریه با موفقیت ایجاد شد ✓");
          handleFormReset();
        },
        onError: (error) => {
          showErrorToasts(error);
          setIsSubmittingOnce(false);
        },
      });
    },
  });

  // ── Derived States ──
  const isLoading = createPublicationMutation.isPending || isSubmittingOnce;
  const isDirty = formik.dirty;

  // ── ریست کامل فرم ──
  const handleFormReset = () => {
    formik.resetForm();
    setPreviewCover("");
    setIsSubmittingOnce(false);
    // ریست فایل input ها
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── آپلود تصویر ──
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toastify("warning", "حجم فایل تصویر نباید بیشتر از 5 مگابایت باشد");
      return;
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      toastify("warning", "فرمت فایل باید JPG, PNG, WebP یا GIF باشد");
      return;
    }

    formik.setFieldValue("publicationCover", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewCover(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ── آپلود فایل ──
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toastify("warning", "حجم فایل نشریه نباید بیشتر از 20 مگابایت باشد");
      return;
    }

    const validFileTypes = [".pdf", ".doc", ".docx"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!validFileTypes.includes(fileExtension)) {
      toastify("warning", "فرمت فایل باید PDF, DOC یا DOCX باشد");
      return;
    }

    formik.setFieldValue("publicationFile", file);
  };

  // ── حذف تصویر ──
  const removeImage = (): void => {
    formik.setFieldValue("publicationCover", null);
    setPreviewCover("");
    if (imageInputRef.current) imageInputRef.current.value = "";
    toastify("info", "تصویر جلد حذف شد");
  };

  // ── حذف فایل ──
  const removeFile = (): void => {
    formik.setFieldValue("publicationFile", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toastify("info", "فایل نشریه حذف شد");
  };

  // ── Header Action ──
  const { setAction } = useHeaderAction();
  useEffect(() => {
    setAction(
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500">
            <BookOpen size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              ایجاد نشریه جدید
            </h1>
            <p className="text-gray-500 text-sm">
              اطلاعات نشریه جدید را با دقت وارد کنید
            </p>
          </div>
        </div>
        {/* ── وضعیت لودینگ در هدر ── */}
        {isLoading && (
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
            <Loader2 size={20} className="text-blue-600 animate-spin" />
            <span className="text-blue-700 font-medium text-sm">
              در حال ثبت نشریه...
            </span>
          </div>
        )}
      </div>
    );

    return () => setAction(null);
  }, [isLoading]);

  // ── Field Config ──
  const technicalFields = [
    {
      name: "volume",
      label: "شماره دوره",
      placeholder: "مثال: 12",
      icon: Volume2,
      color: "text-blue-500",
    },
    {
      name: "managingPublisher",
      label: "ناشر مسئول",
      placeholder: "نام سازمان یا انتشارات",
      icon: Building,
      color: "text-amber-500",
    },
    {
      name: "editorInChief",
      label: "سردبیر",
      placeholder: "نام سردبیر",
      icon: User,
      color: "text-purple-500",
    },
  ];

  // ──────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col gap-3">
      {/* ── موبایل هدر ── */}
      <div className="w-full md:hidden flex">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500">
            <BookOpen size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              ایجاد نشریه جدید
            </h1>
            <p className="text-gray-500 text-sm">
              اطلاعات نشریه جدید را با دقت وارد کنید
            </p>
          </div>
        </div>
      </div>

      {/* ── اسپینر تمام‌صفحه هنگام سابمیت ── */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 min-w-[300px]">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen size={32} className="text-blue-600" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">
                در حال ایجاد نشریه
              </p>
              <p className="text-sm text-gray-500 mt-1">
                لطفاً چند لحظه صبر کنید...
              </p>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* ── بخش ۱: اطلاعات اصلی ── */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="p-3 bg-blue-500 rounded-xl shadow">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                اطلاعات اصلی نشریه
              </h2>
              <p className="text-gray-500 mt-1">
                اطلاعات پایه نشریه را وارد کنید
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* عنوان نشریه */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-5 h-5 text-blue-500" />
                <label className="block text-sm font-semibold text-gray-800">
                  عنوان نشریه <span className="text-red-500">*</span>
                </label>
              </div>
              <Input
                name="publicationTitle"
                value={formik.values.publicationTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="مثال: مجله مهندسی عمران و محیط زیست"
                disabled={isLoading}
                error={
                  formik.touched.publicationTitle &&
                  Boolean(formik.errors.publicationTitle)
                }
              />
              {formik.touched.publicationTitle &&
                formik.errors.publicationTitle && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {formik.errors.publicationTitle}
                  </p>
                )}
            </div>

            {/* شماره نشریه */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-5 h-5 text-green-500" />
                <label className="block text-sm font-semibold text-gray-800">
                  شماره نشریه <span className="text-red-500">*</span>
                </label>
              </div>
              <Input
                name="issueNumber"
                value={formik.values.issueNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="مثال: 2345-6789"
                disabled={isLoading}
                error={
                  formik.touched.issueNumber &&
                  Boolean(formik.errors.issueNumber)
                }
              />
              {formik.touched.issueNumber && formik.errors.issueNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {formik.errors.issueNumber}
                </p>
              )}
            </div>

            {/* شرح مختصر */}
            <div className="lg:col-span-2 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-500" />
                <label className="block text-sm font-semibold text-gray-800">
                  شرح مختصر نشریه <span className="text-red-500">*</span>
                </label>
              </div>
              <Textarea
                bgcolor="#eee"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="توضیحات کامل درباره حوزه، اهداف، مخاطبان و محتوای نشریه..."
                height="140px"
                disabled={isLoading}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {formik.errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── بخش ۲: اطلاعات فنی ── */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="p-3 bg-green-500 rounded-xl shadow">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                اطلاعات فنی نشریه
              </h2>
              <p className="text-gray-500 mt-1">مشخصات انتشار نشریه</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <field.icon className={`w-5 h-5 ${field.color}`} />
                  <label className="block text-sm font-semibold text-gray-800">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                </div>
                <Input
                  name={field.name}
                  value={
                    formik.values[field.name as keyof PublicationFormData] as string
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                  disabled={isLoading}
                  error={
                    formik.touched[field.name as keyof PublicationFormData] &&
                    Boolean(formik.errors[field.name as keyof PublicationFormData])
                  }
                />
                {formik.touched[field.name as keyof PublicationFormData] &&
                  formik.errors[field.name as keyof PublicationFormData] && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {formik.errors[field.name as keyof PublicationFormData] as string}
                    </p>
                  )}
              </div>
            ))}

            {/* تاریخ انتشار */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <label className="block text-sm font-semibold text-gray-800">
                  تاریخ انتشار <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative">
                <FormikPersianDatePicker
                  field={formik.getFieldProps("publicationDate")}
                  form={formik}
                  className="w-full"
                  disabled={isLoading}
                  error={
                    formik.touched.publicationDate &&
                    Boolean(formik.errors.publicationDate)
                  }
                  inputClass="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  minDate={getTodayJalali()}
                  onChange={(value: string) => {
                    formik.setFieldValue("publicationDate", value);
                  }}
                />
                {formik.touched.publicationDate &&
                  formik.errors.publicationDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {formik.errors.publicationDate}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* ── بخش ۳: فایل‌ها ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* تصویر جلد */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-500 rounded-xl shadow">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  تصویر جلد نشریه
                </h2>
                <p className="text-gray-500 text-sm">حداکثر 5 مگابایت</p>
              </div>
            </div>

            <div
              className={`border-2 ${previewCover
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 border-dashed"
                } rounded-xl grow flex flex-col transition-colors`}
            >
              {previewCover ? (
                <div className="p-4 flex flex-col grow">
                  <div className="relative grow">
                    <img
                      src={previewCover}
                      alt="پیش‌نمایش جلد"
                      className="w-full h-full max-h-64 object-cover rounded-lg mx-auto shadow"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={isLoading}
                      className="absolute top-3 left-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow transition-colors disabled:opacity-50"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle size={18} />
                    <span className="font-medium">
                      تصویر جلد انتخاب شده است
                    </span>
                  </div>
                </div>
              ) : (
                <label
                  className={`cursor-pointer p-8 text-center flex flex-col grow justify-center transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  <div className="py-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                      <Image className="w-10 h-10 text-amber-500" />
                    </div>
                    <p className="text-gray-700 font-medium mb-3">
                      تصویر جلد نشریه را انتخاب کنید
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow">
                      <Upload size={20} />
                      <span>انتخاب تصویر</span>
                    </div>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isLoading}
                    />
                    <p className="text-sm text-gray-500 mt-4">
                      JPG, PNG, WebP, GIF
                    </p>
                  </div>
                </label>
              )}
            </div>

            {!formik.values.publicationCover && formik.submitCount > 0 && (
              <div className="mt-3 flex items-center gap-2 text-red-600">
                <AlertCircle size={16} />
                <span className="text-sm">تصویر جلد الزامی است</span>
              </div>
            )}
          </div>

          {/* فایل نشریه */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500 rounded-xl shadow">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">فایل نشریه</h2>
                <p className="text-gray-500 text-sm">حداکثر 20 مگابایت</p>
              </div>
            </div>

            <div
              className={`border-2 ${formik.values.publicationFile
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 border-dashed"
                } rounded-xl grow flex flex-col transition-colors`}
            >
              <div className="p-6 text-center flex flex-col grow justify-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-purple-500" />
                </div>

                {formik.values.publicationFile ? (
                  <div className="space-y-4 flex flex-col grow justify-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800 truncate">
                          {formik.values.publicationFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={removeFile}
                          disabled={isLoading}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors disabled:opacity-50"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                          {(
                            formik.values.publicationFile.size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle size={14} />
                          آماده آپلود
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 font-medium mb-4">
                      فایل PDF نشریه را آپلود کنید
                    </p>
                    <label
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <Upload size={20} />
                      <span>انتخاب فایل</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-4">PDF, DOC, DOCX</p>
              </div>
            </div>

            {!formik.values.publicationFile && formik.submitCount > 0 && (
              <div className="mt-3 flex items-center gap-2 text-red-600">
                <AlertCircle size={16} />
                <span className="text-sm">فایل نشریه الزامی است</span>
              </div>
            )}
          </div>
        </div>

        {/* ── بخش ۴: دکمه‌های اقدام ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* نمایش وضعیت فرم */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {isDirty ? (
              <>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span>تغییرات ذخیره نشده دارید</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>فرم بدون تغییر</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* پاک کردن فرم */}
            <button
              type="button"
              onClick={handleFormReset}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw size={18} />
              پاک کردن فرم
            </button>

            {/* ایجاد نشریه */}
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-3 shadow-lg shadow-blue-500/20 ${isLoading
                  ? "bg-blue-400 cursor-not-allowed opacity-70"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
                } text-white`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  در حال ایجاد نشریه...
                </>
              ) : (
                <>
                  <Save size={20} />
                  ایجاد نشریه جدید
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}