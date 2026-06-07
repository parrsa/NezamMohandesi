"use client";

import Modal from "@/app/components/Modal";
import { Formik } from "formik";
import { XIcon } from "lucide-react";
import * as yup from "yup";
import FormUsers from "../FormUsers/insex";

export const FormValidate = yup.object().shape({
  fullName: yup
    .string()
    .min(7, "نام خود را کامل بنویسید")
    .required("*این قسمت الزامی می باشد"),
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "*ایمیل به درستی وارد نشده است"
    )
    .required("*این قسمت الزامی می باشد"),
  area: yup.string().required("*این قسمت الزامی می باشد"),
  role: yup.string().required("*این قسمت الزامی می باشد"),
  publicationsCount: yup
    .number()
    .typeError("*باید عدد باشد")
    .min(0, "عدد نمی‌تواند منفی باشد")
    .required("*این قسمت الزامی می باشد"),
  membershipDate: yup.string().required("*این قسمت الزامی می باشد"),
});

interface ModalProps {
  setIsOpenCreateModal: any;
  isOpenCreateModal: boolean;
}
function CreateUsersModal({
  setIsOpenCreateModal,
  isOpenCreateModal,
}: ModalProps) {
  const onClose = () => {
    setIsOpenCreateModal(false);
  };
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      isVisible={isOpenCreateModal}
      auth
      onClose={onClose}
      headerProps={{
        ColorText: "#fff",
        bgColor: "#1E40AF",
        title: "افزودن کاربر جدید",
        Close_Icon: <XIcon className="text-black" />,
      }}
      className="w-[95%] h-[95%] sm:h-[95%] md:h-fit sm:w-[80%] md:w-[60%] xl:w-[45%] 2xl:w-[35%] no-scrollbar"
    >
      {isOpenCreateModal && (
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            area: "",
            role: "",
            publicationsCount: null,
            membershipDate: "",
          }}
          onSubmit={onSubmit}
          validationSchema={FormValidate}
        >
          {({ errors, values }) => (
            <>
              <FormUsers
                errors={errors}
                values={values}
                btnTitle="افزودن کاربر"
                onClose={onClose}
              />
            </>
          )}
        </Formik>
      )}
    </Modal>
  );
}

export default CreateUsersModal;
