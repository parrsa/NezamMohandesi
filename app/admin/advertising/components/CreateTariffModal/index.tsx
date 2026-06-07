"use client";

import Modal from "@/app/components/Modal";
import { Formik } from "formik";
import { XIcon } from "lucide-react";
import FormTariff from "../FormTariff";
import * as yup from "yup"

 export const FormValidate = yup.object().shape({
  title:yup.string().required("*این قسمت الزامی می باشد") ,
description:yup.string().required("*این قسمت الزامی می باشد") ,
price:yup.number().typeError("*قیمت باید عدد باشد").min(0, "قیمت نمی‌تواند منفی باشد").required("*این قسمت الزامی می باشد") ,
})

interface ModalProps {
  setIsOpenCreateModal: any;
  isOpenCreateModal: boolean;
}
function CreateTariffModal({
  setIsOpenCreateModal,
  isOpenCreateModal,
}: ModalProps) {
  const onClose = () => {
    setIsOpenCreateModal(false);
  };
  const onSubmit = (values:any) => {
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
        title: "افزودن تعرفه جدید",
        Close_Icon: <XIcon className="text-black" />,
      }}
      className="w-[95%] h-[95%] sm:h-[95%] md:h-fit sm:w-[80%] md:w-[60%] xl:w-[50%] no-scrollbar"
    >
      {isOpenCreateModal && (
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: null,
            duration: "ماهانه",
            features: [""],
            isActive: true,
          }}
          onSubmit={onSubmit}
          validationSchema={FormValidate}
        >
          {({errors,values}) => (
            <>
              <FormTariff errors={errors} values={values} btnTitle="افزودن تعرفه" onClose={onClose} />
            </>
          )}
        </Formik>
      )}
    </Modal>
  );
}

export default CreateTariffModal;
