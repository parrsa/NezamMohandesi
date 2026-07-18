import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoriesKeys } from "./useCategoriesKey";
import {
  AllCategoriesListApi,
  CreateCategoriesApi,
  DeleteCategories,
  GetCategoryByIdApi,
  UpdateCategoriesApi,
} from "./useCategoriesApi";

export const useGetAllCategories = (
  pageNumber: number = 1,
  pageSize: number = 20,
) => {
  return useQuery({
    queryKey: CategoriesKeys.list(pageNumber, pageSize),
    queryFn: () => AllCategoriesListApi(pageNumber, pageSize),
  });
};

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: CategoriesKeys.detail(id),
    queryFn: () => GetCategoryByIdApi(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateCategoriesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CategoriesKeys.all });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: any }) =>
      UpdateCategoriesApi(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CategoriesKeys.all });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CategoriesKeys.all });
    },
  });
};
