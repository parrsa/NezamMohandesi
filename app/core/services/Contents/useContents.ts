import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ContentsKeys } from "./useContentKeys";
import {
  AllContentsListApi,
  ContentByIdApi,
  CreateContentApi,
  DeleteContentApi,
  EditContentApi,
} from "./useContentsApi";
import { ParamValue } from "next/dist/server/request/params";

export const useGetAllContents = (
  pageNumber: number = 1,
  pageSize: number = 20,
  isActive: boolean | null,
  categoryId: ParamValue | string | null,
) => {
  return useQuery({
    queryKey: ContentsKeys.list(pageNumber, pageSize, isActive, categoryId),
    queryFn: () =>
      AllContentsListApi(pageNumber, pageSize, isActive, categoryId),
  });
};

export const useGetContentById = (categoryId: string | null) => {
  return useQuery({
    queryKey: ContentsKeys.detail(categoryId),
    queryFn: () => ContentByIdApi(categoryId),
    enabled: !!categoryId,
  });
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateContentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ContentsKeys.all });
    },
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      EditContentApi(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ContentsKeys.all });
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteContentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ContentsKeys.all });
    },
  });
};
