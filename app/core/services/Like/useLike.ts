import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeApi, DislikeApi } from "./useLikeApi";
import { VideoFeedbackKeys } from "./useLikeKey";
import { toastify } from "@/app/components/Toasts";

export const useLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (videoId: string) => LikeApi(videoId),
        onSuccess: (data, videoId) => {
            queryClient.invalidateQueries({
                queryKey: VideoFeedbackKeys.stats(videoId)
            });
        },
        onError: (error: any) => {
            toastify("error", error?.message || 'خطا در ثبت لایک');
        },
    });
};

export const useDislike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (videoId: string) => DislikeApi(videoId),
        onSuccess: (data, videoId) => {
            queryClient.invalidateQueries({
                queryKey: VideoFeedbackKeys.stats(videoId)
            });
        },
        onError: (error: any) => {
            toastify("error", error?.message || 'خطا در ثبت دیس‌لایک');
        },
    });
};
