import * as yup from 'yup';

export const newsSchema = yup.object().shape({
    headline: yup
        .string()
        .required('عنوان اصلی خبر الزامی است')
        .min(5, 'عنوان اصلی باید حداقل ۵ کاراکتر باشد')
        .max(200, 'عنوان اصلی باید حداکثر ۲۰۰ کاراکتر باشد'),
    
    shortTitle: yup
        .string()
        .required('عنوان کوتاه الزامی است')
        .min(3, 'عنوان کوتاه باید حداقل ۳ کاراکتر باشد')
        .max(100, 'عنوان کوتاه باید حداکثر ۱۰۰ کاراکتر باشد'),
    
    leadParagraph: yup
        .string()
        .required('خلاصه خبر الزامی است')
        .min(20, 'خلاصه خبر باید حداقل ۲۰ کاراکتر باشد')
        .max(500, 'خلاصه خبر باید حداکثر ۵۰۰ کاراکتر باشد'),
    
    body: yup
        .string()
        .required('متن کامل خبر الزامی است')
        .min(10, 'متن کامل خبر باید حداقل 10 کاراکتر باشد'),
    
    credit: yup
        .string()
        .required('نام نویسنده الزامی است')
        .min(3, 'نام نویسنده باید حداقل ۳ کاراکتر باشد')
        .max(100, 'نام نویسنده باید حداکثر ۱۰۰ کاراکتر باشد'),
    
    caption: yup
        .string()
        .required('توضیح تصویر الزامی است')
        .min(5, 'توضیح تصویر باید حداقل ۵ کاراکتر باشد')
        .max(200, 'توضیح تصویر باید حداکثر ۲۰۰ کاراکتر باشد'),
    
    seoTitle: yup
        .string()
        .required('عنوان سئو الزامی است')
        .min(5, 'عنوان سئو باید حداقل ۵ کاراکتر باشد')
        .max(200, 'عنوان سئو باید حداکثر ۲۰۰ کاراکتر باشد'),
    
    isExclusive: yup.boolean(),
    isSticky: yup.boolean(),
});

export type NewsFormData = yup.InferType<typeof newsSchema>;