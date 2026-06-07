"use client"

import FormTariff from "../FormTariff";
import { FormValidate } from "../CreateTariffModal";
import { XIcon } from "lucide-react";
import Modal from "@/app/components/Modal";
import { Formik } from "formik";
import { AdvertisingsItemType } from "../../types";
interface ModalProps {
  setIsOpenEditModal: any;
  isOpenEditModal: boolean;
  advertisingData:AdvertisingsItemType|null;
}
function EditTariffModal({setIsOpenEditModal,isOpenEditModal,advertisingData}:ModalProps) {
  const onClose = () => {
    setIsOpenEditModal(false);
  };
  const onSubmit = (values:any) => {
    console.log(values);
  };
  return (
    <Modal
      isVisible={isOpenEditModal}
      auth
      onClose={onClose}
      headerProps={{
        ColorText: "#fff",
        bgColor: "#1E40AF",
        title: "ویرایش تعرفه",
        Close_Icon: <XIcon className="text-black" />,
      }}
      className="w-[95%] h-[95%] sm:h-[95%] md:h-fit sm:w-[80%] md:w-[60%] xl:w-[50%] no-scrollbar"
    >
      {isOpenEditModal && (
        <Formik
          initialValues={{
            title: advertisingData?.title ?? "",
            description: advertisingData?.description ?? "",
            price: advertisingData?.price ?? null,
            duration: advertisingData?.duration ?? "ماهانه",
            features: advertisingData?.features ?? [""],
            isActive: advertisingData?.isActive ?? true,
          }}
          onSubmit={onSubmit}
          validationSchema={FormValidate}
        >
          {({errors,values}) => (
            <>
              <FormTariff errors={errors} values={values} btnTitle="ذخیره تغییرات" onClose={onClose} />
            </>
          )}
        </Formik>
      )}
    </Modal>
  );
}

export default EditTariffModal
