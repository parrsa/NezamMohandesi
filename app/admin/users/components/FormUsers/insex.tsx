"use client";
import { Button } from "@/app/components/button/Button";
import FormikPersianDatePicker from "@/app/components/FormikPersianDatePicker";
import { Input } from "@/app/components/Input";
import { ErrorMessage, Field, Form } from "formik";
import { CalendarDays, Save } from "lucide-react";

interface FormProps {
  errors: any;
  values: any;
  btnTitle: string;
  onClose: () => void;
}
function FormUsers({ errors, values, btnTitle, onClose }: FormProps) {
  console.log(errors);

  return (
    <Form className="px-5 flex flex-col gap-1">
      <div className="flex gap-3">
        <div className="w-2/3 flex flex-col gap-1">
          <label
            htmlFor=""
            className={`text-base font-medium pr-1.5 ${
              errors.fullName ? "text-red-600" : "text-black"
            }`}
          >
            ناو و نام خانوادگی*
          </label>
          <Field
            as={Input}
            error={errors.fullName}
            name="fullName"
            placeholder=""
            className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
            autoComplete="off"
          />
          <div className="px-2 min-h-6 max-h-max">
            <ErrorMessage
              name="fullName"
              component="span"
              className="text-[13px] font-medium text-red-600"
            />
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-1">
          <label
            htmlFor=""
            className={`text-base font-medium pr-1.5 ${
              errors.area ? "text-red-600" : "text-black"
            }`}
          >
            حوزه*
          </label>
          <Field
            as={Input}
            error={errors.area}
            name="area"
            placeholder="مثال: عمران"
            className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
            autoComplete="off"
          />
          <div className="px-2 min-h-6 max-h-max">
            <ErrorMessage
              name="area"
              component="span"
              className="text-[13px] font-medium text-red-600"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-2/3 flex flex-col gap-1">
          <label
            htmlFor=""
            className={`text-base font-medium pr-1.5 ${
              errors.email ? "text-red-600" : "text-black"
            }`}
          >
            ایمیل*
          </label>
          <Field
            as={Input}
            error={errors.email}
            name="email"
            placeholder="example@gmail.com"
            className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
            autoComplete="off"
          />
          <div className="px-2 min-h-6 max-h-max">
            <ErrorMessage
              name="email"
              component="span"
              className="text-[13px] font-medium text-red-600"
            />
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-1">
          <label
            htmlFor=""
            className={`text-base font-medium pr-1.5 ${
              errors.role ? "text-red-600" : "text-black"
            }`}
          >
            نقش*
          </label>
          <Field
            as={Input}
            error={errors.role}
            name="role"
            placeholder="مثال: مهندس"
            className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
            autoComplete="off"
          />
          <div className="px-2 min-h-6 max-h-max">
            <ErrorMessage
              name="role"
              component="span"
              className="text-[13px] font-medium text-red-600"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="relative w-2/3 flex flex-col gap-1">
          <span
            className={`text-base font-medium pr-1.5 ${
              errors.membershipDate ? "text-red-600" : "text-black"
            }`}
          >
            تاریخ عضویت*
          </span>
          <label
            htmlFor="membershipDate"
            className="absolute left-3 top-9 cursor-pointer"
          >
            <CalendarDays className="w-5 text-zinc-500" />
          </label>
          <Field
            as={Input}
            id="membershipDate"
            error={errors.membershipDate}
            name="membershipDate"
            placeholder=""
            className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
            autoComplete="off"
          >
            {({ field, form, meta }: any) => (
                <FormikPersianDatePicker
                  field={field}
                  form={form}
                  className="w-full"
                  error={meta.touched && Boolean(meta.error)}
                  inputClass="w-full"
                />
              )}
          </Field>
          <div className="px-2 min-h-6 max-h-max">
            <ErrorMessage
              name="membershipDate"
              component="span"
              className="text-[13px] font-medium text-red-600"
            />
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-1">
          <label
            htmlFor=""
            className={`text-base font-medium pr-1.5 ${
              errors.publicationsCount ? "text-red-600" : "text-black"
            }`}
          >
            تعداد نشریات*
          </label>
          <Field
            as={Input}
            error={errors.publicationsCount}
            name="publicationsCount"
            placeholder="مثال: ۱۲"
            className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
            autoComplete="off"
          />
          <div className="px-2 min-h-6 max-h-max">
            <ErrorMessage
              name="publicationsCount"
              component="span"
              className="text-[13px] font-medium text-red-600"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <Button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 text-lg font-medium h-12 cursor-pointer px-6 py-3 bg-linear-to-l from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-shadow"
        >
          <Save className="w-5" />
          <span className="block mt-1">{btnTitle}</span>
        </Button>
        <Button
          onClick={onClose}
          type="button"
          className="text-lg font-medium border border-gray-300 rounded-lg h-12 cursor-pointer"
        >
          انصراف
        </Button>
      </div>
    </Form>
  );
}

export default FormUsers;
