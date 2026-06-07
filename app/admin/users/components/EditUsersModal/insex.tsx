"use client";

import Modal from "@/app/components/Modal";
import { Formik } from "formik";
import { XIcon } from "lucide-react";
import FormUsers from "../FormUsers/insex";
import { FormValidate } from "../CreateUsersModal";
import { User } from "../../types";


interface ModalProps {
  setIsOpenEditModal: any;
  isOpenEditModal: boolean;
  userData:User | null;
}
function EditUsersModal({
  setIsOpenEditModal,
  isOpenEditModal,
  userData
}: ModalProps) {
  const onClose = () => {
    setIsOpenEditModal(false);
  };
  const onSubmit = (values: any) => {
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
        title: "ویرایش اطلاعات کاربر",
        Close_Icon: <XIcon className="text-black" />,
      }}
      className="w-[95%] h-[95%] sm:h-[95%] md:h-fit sm:w-[80%] md:w-[60%] xl:w-[45%] 2xl:w-[35%] no-scrollbar"
    >
      {isOpenEditModal && (
        <Formik
          initialValues={{
            fullName: userData?.fullName ?? "",
            email: userData?.email ?? "",
            area: userData?.area ?? "",
            role: userData?.role ?? "",
            publicationsCount: userData?.publications ?? null,
            membershipDate: userData?.membershipDate ?? "",
          }}
          onSubmit={onSubmit}
          validationSchema={FormValidate}
        >
          {({ errors, values }) => (
            <>
              <FormUsers
                errors={errors}
                values={values}
                btnTitle="ذخیره تغییرات"
                onClose={onClose}
              />
            </>
          )}
        </Formik>
      )}
    </Modal>
  );
}

export default EditUsersModal;
