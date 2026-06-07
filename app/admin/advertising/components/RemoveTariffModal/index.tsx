"use client"

import { Button } from "@/app/components/button/Button"
import Modal from "@/app/components/Modal"
interface ModalProps {
    isOpenRemoveModal:boolean;
setIsOpenRemoveModal:any;
onRemoveTariff: () => void
}
function RemoveTariffModal({isOpenRemoveModal,setIsOpenRemoveModal,onRemoveTariff}:ModalProps) {
  return (
    <Modal
            isVisible={isOpenRemoveModal}
            auth
            onClose={() => setIsOpenRemoveModal(false)}
            headerProps={{
              ColorText: "#fff",
              bgColor: "#1E40AF",
              title: "حذف تعرفه",
              className: "justify-center",
              Close_Icon: <></>,
            }}
            className="w-[95%] h-[95%] sm:h-[95%] md:h-fit sm:w-[500px]"
          >
            {isOpenRemoveModal && (
              <div className="flex flex-col gap-4 px-3">
                <p className="text-base font-medium flex justify-center">
                  آیا از حذف این تعرفه مطمئن هستید ؟
                </p>
                <div className="flex gap-3 ">
                  <Button
                    type="button"
                    onClick={onRemoveTariff}
                    className="w-1/2 rounded-xl bg-red-500 text-white h-12 text-lg font-medium cursor-pointer hover:bg-red-400 transition-all"
                  >
                    حذف
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsOpenRemoveModal(false)}
                    className="w-1/2 rounded-xl bg-zinc-300 text-zinc-600 h-12 text-lg font-medium cursor-pointer"
                  >
                    انصراف
                  </Button>
                </div>
              </div>
            )}
          </Modal>
  )
}

export default RemoveTariffModal
