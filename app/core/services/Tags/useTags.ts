import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TagsKeys } from "./useTagsKey";
import {
  AllTagListApi,
  CreateTagsApi,
  DeleteTagApi,
  TagByIdApi,
  UpdateTagsApi,
} from "./useTagsApi";

export const useGetAllTags = () => {
  return useQuery({
    queryKey: TagsKeys.list(),
    queryFn: () => AllTagListApi(),
  });
};

export const useGetTagById = (id: string) => {
  return useQuery({
    queryKey: TagsKeys.detail(id),
    queryFn: () => TagByIdApi(id),
    enabled: !!id,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateTagsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TagsKeys.all });
    },
  });
};

export const useUpdateTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: any }) =>
      UpdateTagsApi(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TagsKeys.all });
    },
  });
};

export const useDeleteTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteTagApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TagsKeys.all });
    },
  });
};
