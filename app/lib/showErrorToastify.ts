import { toastify } from "../components/Toasts";

export const showErrorToasts = (error: any) => {
    if (error?.messages && Array.isArray(error.messages)) {
        error.messages.forEach((msg: string) => {
            toastify("error", msg);
        });
    } else if (error?.message) {
        toastify("error", error.message);
    } else {
        toastify("error", 'خطا ');
    }
};