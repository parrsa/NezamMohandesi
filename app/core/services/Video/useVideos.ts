import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateVideoApi, AllVideoListApi, UpdateVideoApi, DeletedVideoApi } from "./useVideosApi";
import { VideosKeys } from "./useVideoKey";

export const useGetAllVideos = (PageNumber?: any, PageSize?: any) => {
    return useQuery({
        queryKey: VideosKeys.Videos(PageNumber, PageSize),
        queryFn: () => AllVideoListApi(PageNumber, PageSize),
    });
};
export const useCreateVideos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: CreateVideoApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: VideosKeys.all });
        },
    });
};

export const useUpdateVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UpdateVideoApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: VideosKeys.all });
        },
    });
};

export const useDeletedVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: DeletedVideoApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: VideosKeys.all });
        },
    });
};
export const useVideosMutations = () => {
    const createMutation = useCreateVideos();
    return {
        createVideos: createMutation.mutateAsync,
        isLoading: createMutation.isPending
    };
};
