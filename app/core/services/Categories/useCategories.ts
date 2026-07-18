import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoriesKeys } from "./useCategoriesKey";
import {
  AllCategoriesListApi,
  CreateCategoriesApi,
  DeleteCategories,
  GetCategoriesTreeApi,
  GetCategoryByIdApi,
  GetSubCategoriesApi,
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

export const useGetSubCategories = (id: string) => {
  return useQuery({
    queryKey: CategoriesKeys.detail(id),
    queryFn: () => GetSubCategoriesApi(id),
    enabled: !!id,
  });
};

export const useGetCategoriesTree = () => {
  return useQuery({
    queryKey: CategoriesKeys.list(1, 20),
    queryFn: () => GetCategoriesTreeApi(),
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
