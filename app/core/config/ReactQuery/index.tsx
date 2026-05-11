import { toastify } from "@/app/components/Toasts";

const STALETIME = 1000 * 5 * 60;
// const STALETIME = 0;

export const queryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 0,
            retry: 0,
        },
        mutation: {
            onError: (error: any) => {
                toastify("error", error.message)
            }
        }
    }
}
