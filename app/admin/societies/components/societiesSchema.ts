import * as yup from "yup";

export const societiesSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اصلی خبر الزامی است")
    .min(3, "عنوان اصلی باید حداقل ۵ کاراکتر باشد")
    .max(200, "عنوان اصلی باید حداکثر ۲۰۰ کاراکتر باشد"),

  description: yup
    .string()
    .required("متن کامل خبر الزامی است")
    .min(5, "متن کامل خبر باید حداقل 10 کاراکتر باشد"),
});

export type SocietiesFormData = yup.InferType<typeof societiesSchema>;
