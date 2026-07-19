import * as yup from "yup";

export const contentSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان الزامی است")
    .min(5, "عنوان باید حداقل ۵ کاراکتر باشد")
    .max(20, "عنوان باید حداکثر ۲۰ کاراکتر باشد"),

  summary: yup
    .string()
    .required("خلاصه الزامی است")
    .min(20, "خلاصه باید حداقل ۲۰ کاراکتر باشد")
    .max(50, "خلاصه باید حداکثر ۵۰ کاراکتر باشد"),

  body: yup
    .string()
    .required("متن کامل الزامی است")
    .min(10, "متن کامل باید حداقل 10 کاراکتر باشد"),

  status: yup
    .number()
    .required("وضعیت الزامی است")
    .oneOf([0, 1, 2, 3], "وضعیت نامعتبر است"),

  tagIds: yup.array(yup.number()),

  publishDate: yup.string(),

  featuredImage: yup.mixed().nullable(),

  files: yup.array().of(yup.mixed()),
});

export type ContentFormData = yup.InferType<typeof contentSchema>;