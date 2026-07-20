import * as yup from "yup";

export const societiesNoticesSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان الزامی است")
    .min(5, "عنوان باید حداقل ۵ کاراکتر باشد")
    .max(20, "عنوان باید حداکثر ۲۰ کاراکتر باشد"),

  description: yup
    .string()
    .required("خلاصه الزامی است")
    .min(20, "خلاصه باید حداقل ۲۰ کاراکتر باشد")
    .max(50, "خلاصه باید حداکثر ۵۰ کاراکتر باشد"),

  priority: yup
    .number()
    .required("وضعیت الزامی است")
    .oneOf([0, 1, 2, 3], "وضعیت نامعتبر است"),
  type: yup
    .number()
    .required("وضعیت الزامی است")
    .oneOf([0, 1, 2, 3], "وضعیت نامعتبر است"),

  tagIds: yup.array(yup.number()),

  expirationDate: yup.string(),

  attachment: yup.mixed().nullable(),
});

export type SocietiesNoticesFormData = yup.InferType<
  typeof societiesNoticesSchema
>;
