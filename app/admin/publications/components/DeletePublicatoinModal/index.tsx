import Modal from "@/app/components/Modal";
import ModalProps from "@/app/components/Modal/type";
import { toastify } from "@/app/components/Toasts";
import { useDeletePublication } from "@/app/core/services/Publications/mutation";
import { showErrorToasts } from "@/app/lib/showErrorToastify";
import { X } from "lucide-react";
import { useState } from "react";

interface IDeletePublicationProps extends ModalProps {
  publicationId: string;
  publicationTitle: string;
  refetch?: any
}

const DeletePublicationModal = ({
  onClose,
  isVisible,
  publicationId,
  refetch,
  publicationTitle,
}: IDeletePublicationProps) => {
  const deletePublicationMutation = useDeletePublication();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (!publicationId) {
      toastify("error", "شناسه نشریه مشخص نیست");
      return;
    }
    setIsDeleting(true);
    const formData = new FormData();
    formData.append('publicationId', publicationId);

    deletePublicationMutation.mutate(formData, {
      onSuccess: () => {
        toastify("success", '✅ ویدیو با موفقیت حذف شد');
        onClose();
        setIsDeleting(false);
        refetch()
      },
      onError: (error: any) => {
        showErrorToasts(error);
        setIsDeleting(false);
      }
    });
  };



  return (
    <Modal
      headerProps={{ title: "حذف نشریه" }}
      height={"fit-content"}
      className="w-full md:w-[25%]  h-[95vh] backdrop-blur-xl bg-white rounded-3xl shadow-2xl border border-gray-200"
      onClose={onClose}
      isVisible={isVisible}
    >
      <div className="p-6">
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center">
            <p className="text-red-700 text-center flex items-center gap-2">
              آیا از حذف نشریه
              <p className="font-bold">{publicationTitle}</p>
              مطمئن هستید؟
            </p>
          </div>

          <p className="text-gray-600 text-sm">
            این عمل قابل بازگشت نیست. تمام اطلاعات مرتبط با این نشریه از
            جمله فایل‌ها و آمارها حذف خواهند شد.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            disabled={isDeleting}
          >
            انصراف
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>در حال حذف...</>
            ) : (
              <>
                <X size={18} />
                حذف نشریه
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePublicationModal;
