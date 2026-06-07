"use client";
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/Input";
import { Textarea } from "@/app/components/Textarea";
import { ErrorMessage, Field, FieldArray, Form } from "formik";
import { select } from "framer-motion/client";
import { Plus, Save, Trash2 } from "lucide-react";
interface Values {
  features: Array<string>;
  isActive: boolean;
}
interface FormProps {
  errors: any;
  values: Values;
  btnTitle: string;
  onClose: () => void;
}
function FormTariff({ errors, values, btnTitle, onClose }: FormProps) {
  console.log(errors);
  
  return (
    <Form className="px-5 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor=""
          className={`text-base font-medium pr-1.5 ${
            errors.title ? "text-red-600" : "text-black"
          }`}
        >
          عنوان بسته تبلیغاتی*
        </label>
        <Field
          as={Input}
          error={errors.title}
          name="title"
          placeholder="مثال: تبلیغ روی جلد نشریه"
          className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
          autoComplete="off"
        />
        <div className="px-2 min-h-6 max-h-max">
          <ErrorMessage
            name="title"
            component="span"
            className="text-[13px] font-medium text-red-600"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor=""
          className={`text-base font-medium pr-1.5 ${
            errors.description ? "text-red-600" : "text-black"
          }`}
        >
          توضیحات*
        </label>
        <Field
          as={Textarea}
          error={errors.description}
          name="description"
          placeholder="توضیحات کامل بسته تبلیغاتی ..."
          className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold border border-gray-300 max-h-22 min-h-22 focus:outline-none"
          autoComplete="off"
        />
        <div className="px-2 min-h-6 max-h-max">
          <ErrorMessage
            name="description"
            component="span"
            className="text-[13px] font-medium text-red-600"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-1/2 flex flex-col gap-1">
          <label
            htmlFor=""
            className={`text-base font-medium pr-1.5 ${
              errors.price ? "text-red-600" : "text-black"
            }`}
          >
            قیمت {"(تومان)"}*
          </label>
          <Field
            as={Input}
            error={errors.price}
            name="price"
            placeholder="50000000"
            className="w-full pt-2 placeholder:text-sm placeholder:font-normal font-semibold focus:outline-none"
            autoComplete="off"
          />
          <div className="px-2 min-h-6 max-h-max">
            <ErrorMessage
              name="price"
              component="span"
              className="text-[13px] font-medium text-red-600"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          <label
            htmlFor=""
            className={`text-base font-medium pr-1.5 ${
              errors.duration ? "text-red-600" : "text-black"
            }`}
          >
            مدت زمان*
          </label>
          <Field
            as={select}
            error={errors.duration}
            name="duration"
            placeholder="50000000"
            className="w-full pt-2 px-2 h-10 placeholder:text-sm placeholder:font-normal font-semibold border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
            autoComplete="off"
          >
            <option value="روزانه">روزانه</option>
            <option value="هفتگی">هفتگی</option>
            <option value="ماهانه" selected>
              ماهانه
            </option>
            <option value="سالانه">سالانه</option>
          </Field>
        </div>
      </div>
      <div>
        <FieldArray name="features">
          {({ push, remove }) => (
            <>
              {values.features.length > 0 ? (
                <>
                  <span className="block text-base font-medium pr-1.5 mb-1">
                    ویژگی های بسته
                  </span>
                  <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto">
                    {values.features.map((tag: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Field
                          as={Input}
                          name={`features[${index}]`}
                          placeholder="ویژگی ..."
                          className="flex-1 "
                        />
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          className="border border-red-400 rounded-lg text-red-500 h-10 cursor-pointer"
                        >
                          <Trash2 className="w-4.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
              <Button
                type="button"
                onClick={() => push("")}
                className="flex items-center justify-center h-10 border border-gray-300 rounded-lg mt-3 cursor-pointer"
              >
                <Plus className="w-5" />
                <span className="text-base">افزودن ویژگی</span>
              </Button>
            </>
          )}
        </FieldArray>
      </div>
      <div className="flex gap-2 items-center mt-3">
        <Field
          type="checkbox"
          name="isActive"
          className="w-4 h-4 cursor-pointer"
        />
        <span>{values.isActive ? "فعال" : "غیر فعال"}</span>
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

export default FormTariff;
