import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    AllNewsListApi,
    GetNewsByIdApi,
    CreateNewsApi,
    UpdateNewsApi,
    DeleteNewsApi,
    downloadFile
} from "./useNewsApi";
import { NewsKeys } from "./useNewsKey";

export const useGetAllNews = (pageNumber: number = 0, pageSize: number = 12) => {
    return useQuery({
        queryKey: NewsKeys.list(pageNumber, pageSize),
        queryFn: () => AllNewsListApi(pageNumber, pageSize),
    });
};
export const useDownloadFile = () => {
    return useMutation({
        mutationFn: (fileId: string) => downloadFile(fileId),
    });
};

export const useGetNewsById = (newsId: string) => {
    return useQuery({
        queryKey: NewsKeys.detail(newsId),
        queryFn: () => GetNewsByIdApi(newsId),
        enabled: !!newsId,
    });
};

export const useCreateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: CreateNewsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NewsKeys.all });
        },
    });
};

export const useUpdateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UpdateNewsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NewsKeys.all });
        },
    });
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: DeleteNewsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NewsKeys.all });
        },
    });
};