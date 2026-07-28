import * as yup from "yup";

export const sliderSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان الزامی است")
    .min(2, "عنوان باید حداقل ۵ کاراکتر باشد")
    .max(100, "عنوان باید حداکثر ۲۰ کاراکتر باشد"),

  imageAlt: yup
    .string()
    .required("توضیحات بنر الزامی است")
    .min(10, "توضیحات بنر باید حداقل 10 کاراکتر باشد")
    .max(200, "توضیحات بنر باید حداکثر ۵۰ کاراکتر باشد"),

  link: yup
    .string()
    .required("لینک کامل الزامی است")
    .min(1, "لینک کامل باید حداقل 10 کاراکتر باشد"),

  displayOrder: yup
    .number()
    .required("وضعیت الزامی است")
    .oneOf([0, 1, 2, 3], "وضعیت نامعتبر است"),

  isActive: yup.boolean(),

  position: yup
    .number()
    .required("موقعیت الزامی است")
    .oneOf([0, 1, 2, 3], "موقعیت نامعتبر است"),

  imageFile: yup.mixed().required("عکس بنر الزامی است").nullable(),
});

export type SliderFormData = yup.InferType<typeof sliderSchema>;
