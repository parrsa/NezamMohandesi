import * as yup from "yup";

export const categoriesSchema = yup.object().shape({
  name: yup
    .string()
    .required("عنوان اصلی خبر الزامی است")
    .min(5, "عنوان اصلی باید حداقل ۵ کاراکتر باشد")
    .max(200, "عنوان اصلی باید حداکثر ۲۰۰ کاراکتر باشد"),

  description: yup
    .string()
    .required("متن کامل خبر الزامی است")
    .min(10, "متن کامل خبر باید حداقل 10 کاراکتر باشد"),

  link: yup.string().nullable(),

  isActive: yup.boolean(),
});

export type CategoriesFormData = yup.InferType<typeof categoriesSchema>;
