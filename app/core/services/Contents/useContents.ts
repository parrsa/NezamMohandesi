import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ContentsKeys } from "./useContentKeys";
import {
  AllContentsListApi,
  ContentByIdApi,
  CreateContentApi,
  DeleteContentApi,
  EditContentApi,
} from "./useContentsApi";

export const useGetAllContents = (
  pageNumber: number = 1,
  pageSize: number = 20,
  isActive: boolean,
  categoryId: string,
) => {
  return useQuery({
    queryKey: ContentsKeys.list(pageNumber, pageSize),
    queryFn: () =>
      AllContentsListApi(pageNumber, pageSize, isActive, categoryId),
  });
};

export const useGetContentById = (categoryId: string) => {
  return useQuery({
    queryKey: ContentsKeys.detail(categoryId),
    queryFn: () => ContentByIdApi(categoryId),
    enabled: !!categoryId,
  });
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  useMutation({
    mutationFn: CreateContentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ContentsKeys.all });
    },
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: any }) =>
      EditContentApi(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ContentsKeys.all });
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  useMutation({
    mutationFn: ({ id }: { id: string }) => DeleteContentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ContentsKeys.all });
    },
  });
};
