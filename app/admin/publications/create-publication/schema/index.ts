import * as Yup from "yup";

export const validationSchema = Yup.object({
  publicationTitle: Yup.string()
    .min(10, "عنوان باید حداقل 10 کاراکتر باشد")
    .required("عنوان نشریه الزامی است"),

  description: Yup.string()
    .min(20, "توضیحات باید حداقل 20 کاراکتر باشد")
    .required("توضیحات الزامی است"),

  issueNumber: Yup.string().required("شماره نشریه الزامی است"),

  volume: Yup.string().required("شماره دوره الزامی است"),

  publicationDate: Yup.string().required("تاریخ انتشار الزامی است"),

  managingPublisher: Yup.string().required("نام ناشر مسئول الزامی است"),

  editorInChief: Yup.string().required("نام سردبیر الزامی است"),

  publicationFile: Yup.mixed().required("فایل نشریه الزامی است"),

  publicationCover: Yup.mixed().required("تصویر جلد الزامی است"),
});

export const validationSchemaEdit = Yup.object({
  publicationTitle: Yup.string()
    .min(10, "عنوان باید حداقل 10 کاراکتر باشد")
    .required("عنوان نشریه الزامی است"),

  description: Yup.string()
    .min(20, "توضیحات باید حداقل 20 کاراکتر باشد")
    .required("توضیحات الزامی است"),

  issueNumber: Yup.string().required("شماره نشریه الزامی است"),

  volume: Yup.string().required("شماره دوره الزامی است"),

  publicationDate: Yup.string().required("تاریخ انتشار الزامی است"),

  managingPublisher: Yup.string().required("نام ناشر مسئول الزامی است"),

  editorInChief: Yup.string().required("نام سردبیر الزامی است"),

  publicationFile: Yup.mixed().notRequired(),

  publicationCover: Yup.mixed().notRequired(),
});