// import { ShabnamFa } from "@/utils/font";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastify = (type: any, message: any) => {
  toast(message, {
    position: "top-center",
    type: type,
    pauseOnFocusLoss: false,
    closeButton: false,
    rtl: true,
    autoClose: 1000,
    hideProgressBar: true,
    className: ` customToast`,
  });
};

