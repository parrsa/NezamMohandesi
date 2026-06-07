"use client";
import { useState, ChangeEvent, JSX, useEffect } from "react";
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
  ArrowRight,
} from "lucide-react";
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/Textarea";
import { validationSchemaEdit } from "../create-publication/schema/index";
import { toastify } from "@/app/components/Toasts";
import FormikPersianDatePicker from "@/app/components/FormikPersianDatePicker";
import { useGetPublication } from "@/app/core/services/Publications/queries";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUpdatePublication } from "@/app/core/services/Publications/mutation";
import { PublicationFormData } from "../types";
import { useDownloadFile } from "@/app/core/services/News/useNews";
import { useHeaderAction } from "@/app/core/provider/HeaderActionProvider/HeaderAction";


const formatDateToBackend = (dateString: string): string => {
  if (!dateString) return "";
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const year = parts[0].padStart(4, "0");
    const month = parts[1].padStart(2, "0");
    const day = parts[2].padStart(2, "0");
    return year + month + day;
  }
  const numbersOnly = dateString.replace(/\D/g, "");
  return numbersOnly;
};

const formatDateFromBackend = (dateNumber: number): string => {
  if (!dateNumber) return "";
  const dateStr = dateNumber.toString();
  if (dateStr.length === 8) {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}/${month}/${day}`;
  }
  return "";
};


const getTodayJalali = (): string => {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(today);
  const year = parts.find((part) => part.type === "year")?.value || "1403";
  const month = parts.find((part) => part.type === "month")?.value || "01";
  const day = parts.find((part) => part.type === "day")?.value || "01";
  return `${year}/${month}/${day}`;
};

interface EditPublicationProps {
  publicationId?: string;
}

export default function EditPublication({
  publicationId,
}: EditPublicationProps): JSX.Element {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = publicationId || params.id;

  const updatePublicationMutation = useUpdatePublication();
  const { data: publicationData, isLoading, error } = useGetPublication(id);
  const downloadMutation = useDownloadFile();

  const [previewCover, setPreviewCover] = useState<string>("");
  const [previewFileUrl, setPreviewFileUrl] = useState<string>("");

  const [newSelectedFile, setNewSelectedFile] = useState<File | null>(null);
  const [newSelectedCover, setNewSelectedCover] = useState<File | null>(null);

  const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false);
  const { setAction, setActionSecound } = useHeaderAction();
  useEffect(() => {
    setAction(
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500">
            <BookOpen size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ویرایش نشریه </h1>
            <p className="text-gray-500 text-sm">
              اطلاعات نشریه  را با دقت ویرایش کنید
            </p>
          </div>
        </div>
      </div>
    );
    return () => {
      setAction(null);
    };
  }, []);

  useEffect(() => {
    if (publicationData && !initialDataLoaded) {
      const { data } = publicationData;
      if (data) {
        formik.setValues({
          publicationTitle: data.publicationTitle || "",
          description: data.description || "",
          editorInChief: data.editorInChief || "",
          managingPublisher: data.managingPublisher || "",
          issueNumber: data.issueNumber || "",
          volume: data.volume || "",
          publicationDate:
            formatDateFromBackend(data.publicationDate) || getTodayJalali(),
          publicationFile: null,
          publicationCover: null,
        });
        setInitialDataLoaded(true);
      }
    }
  }, [publicationData, initialDataLoaded]);

  useEffect(() => {
    const loadCover = async () => {
      if (newSelectedCover) return;

      const coverFileId = publicationData?.data?.coverFileId;
      if (!coverFileId) {
        setPreviewCover("");
        return;
      }

      try {
        const blob = await downloadMutation.mutateAsync(coverFileId);
        const url = URL.createObjectURL(blob);
        setPreviewCover(url);
      } catch (error) {
        console.error("Failed to load cover:", error);
        toastify("error", "خطا در بارگذاری تصویر جلد");
      }
    };

    loadCover();

    return () => {
      if (previewCover && previewCover.startsWith("blob:")) {
        URL.revokeObjectURL(previewCover);
      }
    };
  }, [publicationData?.data?.coverFileId, newSelectedCover]);

  useEffect(() => {
    const loadFile = async () => {
      if (newSelectedFile) return;

      const publicationFileId = publicationData?.data?.publicationFileId;
      if (!publicationFileId) {
        setPreviewFileUrl("");
        return;
      }

      try {
        const blob = await downloadMutation.mutateAsync(publicationFileId);
        const url = URL.createObjectURL(blob);
        setPreviewFileUrl(url);
      } catch (error) {
        console.error("Failed to load file:", error);
        toastify("error", "خطا در بارگذاری فایل نشریه");
      }
    };

    loadFile();

    return () => {
      if (previewFileUrl && previewFileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewFileUrl);
      }
    };
  }, [publicationData?.data?.publicationFileId, newSelectedFile]);

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
    validationSchema: validationSchemaEdit,
    onSubmit: async (values: PublicationFormData, { setSubmitting, setFieldError }) => {
      try {
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

        textFields.forEach((field: keyof PublicationFormData) => {
          let value = values[field];
          if (field === "publicationDate") {
            value = formatDateToBackend(value as string);
          }
          if (value !== null && value !== undefined && value !== "") {
            formDataToSend.append(field, value.toString());
          }
        });
        formDataToSend.append("Id", id);

        if (values.publicationFile instanceof File) {
          formDataToSend.append("publicationFile", values.publicationFile);
        }
        if (values.publicationCover instanceof File) {
          formDataToSend.append("publicationCover", values.publicationCover);
        }

        await updatePublicationMutation.mutateAsync({
          id,
          formData: formDataToSend,
        });

        toastify("success", "نشریه با موفقیت ویرایش شد ✓");
        router.refresh();
      } catch (error: unknown) {
        console.error("خطا در ویرایش فرم:", error);
        let errorMessage = "خطا در ویرایش نشریه";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "object" && error !== null && "response" in error) {
          const axiosError = error as { response?: { data?: { message?: string } } };
          errorMessage = axiosError.response?.data?.message || errorMessage;
        }
        toastify("error", errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });


  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
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
      formik.setFieldTouched("publicationCover", true);
      setNewSelectedCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
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
      formik.setFieldTouched("publicationFile", true);
      setNewSelectedFile(file);

      setPreviewFileUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = (): void => {
    formik.setFieldValue("publicationCover", null);
    formik.setFieldTouched("publicationCover", true);
    setNewSelectedCover(null);
    setPreviewCover("");
    toastify("info", "تصویر جلد حذف شد");
  };

  const removeFile = (): void => {
    formik.setFieldValue("publicationFile", null);
    formik.setFieldTouched("publicationFile", true);
    setNewSelectedFile(null);
    setPreviewFileUrl("");
    toastify("info", "فایل نشریه حذف شد");
  };

  const isFormDirty = (): boolean => {
    return formik.dirty || newSelectedFile !== null || newSelectedCover !== null;
  };

  const isFormValid = (): boolean => {
    const requiredFields = [
      "publicationTitle",
      "description",
      "issueNumber",
      "volume",
      "publicationDate",
      "managingPublisher",
      "editorInChief",
    ] as const;
    return (
      requiredFields.every((field) => {
        const value = formik.values[field];
        return value !== null && value !== undefined && value.toString().trim() !== "";
      }) && Object.keys(formik.errors).length === 0
    );
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">در حال بارگذاری اطلاعات نشریه...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">خطا در بارگذاری نشریه</h3>
          <p className="text-gray-600 mb-6">نشریه مورد نظر یافت نشد یا مشکلی در دریافت اطلاعات وجود دارد.</p>
          <button
            onClick={() => router.push("/dashboard/admin/publications")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            بازگشت به لیست نشریه‌ها
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col gap-3">
      <div>
        <div className="p-2 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/dashboard/admin/publications" className="hover:text-blue-500 transition-colors">
            لیست نشریه‌ها
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">ویرایش نشریه</span>
        </div>

        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-500 rounded-xl shadow">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">ویرایش نشریه</h1>
              <p className="text-gray-600 mt-2 text-lg flex items-center gap-3">
                اطلاعات نشریه{" "}
                <p className="font-semibold text-amber-600">{publicationData?.data?.publicationTitle}</p> را ویرایش کنید
              </p>
            </div>
          </div>
          <div className="h-1 w-24 bg-amber-500 rounded-full"></div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="p-3 bg-blue-500 rounded-xl shadow">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">اطلاعات اصلی نشریه</h2>
                <p className="text-gray-500 mt-1">اطلاعات پایه نشریه را ویرایش کنید</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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
                  error={formik.touched.publicationTitle && Boolean(formik.errors.publicationTitle)}
                />
                {formik.touched.publicationTitle && formik.errors.publicationTitle && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.publicationTitle}</p>
                )}
              </div>

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
                  error={formik.touched.issueNumber && Boolean(formik.errors.issueNumber)}
                />
                {formik.touched.issueNumber && formik.errors.issueNumber && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.issueNumber}</p>
                )}
              </div>

              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <label className="block text-sm font-semibold text-gray-800">
                    شرح مختصر نشریه <span className="text-red-500">*</span>
                  </label>
                </div>
                <Textarea
                  bgcolor="#f9fafb"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="توضیحات کامل درباره حوزه، اهداف، مخاطبان و محتوای نشریه..."
                  height="140px"
                  error={formik.touched.description && Boolean(formik.errors.description)}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="p-3 bg-green-500 rounded-xl shadow">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">اطلاعات فنی نشریه</h2>
                <p className="text-gray-500 mt-1">مشخصات انتشار نشریه</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
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
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <field.icon className={`w-5 h-5 ${field.color}`} />
                    <label className="block text-sm font-semibold text-gray-800">
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <Input
                    name={field.name}
                    value={formik.values[field.name as keyof PublicationFormData] as string}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={field.placeholder}
                    error={
                      formik.touched[field.name as keyof PublicationFormData] &&
                      Boolean(formik.errors[field.name as keyof PublicationFormData])
                    }
                  />
                  {formik.touched[field.name as keyof PublicationFormData] &&
                    formik.errors[field.name as keyof PublicationFormData] && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors[field.name as keyof PublicationFormData] as string}
                      </p>
                    )}
                </div>
              ))}

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
                    error={formik.touched.publicationDate && Boolean(formik.errors.publicationDate)}
                    inputClass="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(value: string) => {
                      formik.setFieldValue("publicationDate", value);
                      formik.setFieldTouched("publicationDate", true);
                    }}
                  />
                  {formik.touched.publicationDate && formik.errors.publicationDate && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.publicationDate}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-500 rounded-xl shadow">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">تصویر جلد نشریه</h2>
                  <p className="text-gray-500 text-sm">حداکثر 5 مگابایت</p>
                  <p className="text-xs text-amber-600 mt-1">
                    {previewCover
                      ? newSelectedCover
                        ? "تصویر جدید انتخاب شده است"
                        : "تصویر فعلی نمایش داده شده است"
                      : "هیچ تصویری انتخاب نشده"}
                  </p>
                </div>
              </div>
              <div
                className={`border-2 ${previewCover ? "border-green-200 bg-green-50" : "border-gray-200"
                  } rounded-xl grow flex flex-col transition-colors`}
              >
                {previewCover ? (
                  <div className="p-4 flex flex-col grow">
                    <div className="relative grow">
                      <img
                        src={previewCover}
                        alt="پیش‌نمایش جلد نشریه"
                        className="w-full h-full max-h-64 object-cover rounded-lg mx-auto shadow"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-cover.jpg";
                        }}
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-3 left-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${newSelectedCover ? "bg-green-500" : "bg-gray-400"
                          }`}
                      ></div>
                      <span
                        className={`font-medium ${newSelectedCover ? "text-green-600" : "text-gray-600"
                          }`}
                      >
                        {newSelectedCover ? "تصویر جدید انتخاب شده است" : "تصویر فعلی نمایش داده شده است"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <label className=" cursor-pointer p-8 text-center flex flex-col grow justify-center hover:bg-gray-50 transition-colors">
                    <div className="py-4">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                        <Image className="w-10 h-10 text-amber-500" />
                      </div>
                      <p className="text-gray-700 font-medium mb-3">تصویر جلد نشریه را انتخاب کنید</p>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow">
                        <Upload size={20} />
                        <span>انتخاب تصویر</span>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      <p className="text-sm text-gray-500 mt-4">JPG, PNG, WebP, GIF</p>
                    </div>
                  </label>
                )}
              </div>
              {formik.touched.publicationCover && formik.errors.publicationCover && (
                <div className="mt-3 flex items-center gap-2 text-red-600">
                  <X size={16} />
                  <span className="text-sm">{formik.errors.publicationCover}</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500 rounded-xl shadow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">فایل نشریه</h2>
                  <p className="text-gray-500 text-sm">حداکثر 20 مگابایت</p>
                  <p className="text-xs text-purple-600 mt-1">
                    {previewFileUrl
                      ? newSelectedFile
                        ? "فایل جدید انتخاب شده است"
                        : "فایل فعلی حفظ خواهد شد"
                      : "هیچ فایلی انتخاب نشده"}
                  </p>
                </div>
              </div>
              <div
                className={`border-2 ${previewFileUrl ? "border-blue-200 bg-blue-50" : "border-gray-200"
                  } rounded-xl grow flex flex-col transition-colors`}
              >
                <div className="p-6 text-center flex flex-col grow justify-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-purple-500" />
                  </div>
                  {previewFileUrl ? (
                    <div className="space-y-4 flex flex-col grow justify-center">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800 truncate">
                            {newSelectedFile ? newSelectedFile.name : "فایل فعلی"}
                          </span>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="text-red-500 hover:text-red-700 p-1 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>
                            {newSelectedFile
                              ? (newSelectedFile.size / 1024 / 1024).toFixed(2) + " MB"
                              : "فایل موجود در سرور"}
                          </span>
                          <span className="text-green-600 font-medium">
                            {newSelectedFile ? "✓ آماده آپلود" : "✓ موجود"}
                          </span>
                        </div>
                        {!newSelectedFile && (
                          <a
                            href={previewFileUrl}
                            download={`publication-${id}`}
                            className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                          >
                            مشاهده/دانلود فایل فعلی
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 font-medium mb-4">برای تغییر فایل، فایل جدید آپلود کنید</p>
                      <label className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow cursor-pointer">
                        <Upload size={20} />
                        <span>انتخاب فایل جدید</span>
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                      </label>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-4">PDF, DOC, DOCX</p>
                </div>
              </div>
              {formik.touched.publicationFile && formik.errors.publicationFile && (
                <div className="mt-3 flex items-center gap-2 text-red-600">
                  <X size={16} />
                  <span className="text-sm">{formik.errors.publicationFile}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  router.push("/admin/publications");
                }}
                className="px-6 py-3 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={formik.isSubmitting}
              >
                بازگشت
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`px-8 py-3 cursor-pointer bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center gap-3 ${formik.isSubmitting || !isFormValid() || !isFormDirty()
                  ? "opacity-50 cursor-not-allowed"
                  : "shadow-lg hover:shadow-xl"
                  }`}
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    در حال ویرایش نشریه...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    ذخیره تغییرات
                  </>
                )}
              </button>
            </div>
            <div className={`flex items-center gap-2 ${!isFormDirty() ? "invisible" : ""}`}>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-amber-600">تغییرات ذخیره نشده وجود دارد</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}