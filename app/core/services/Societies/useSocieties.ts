import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SocietiesKeys } from "./useSocietiesKeys";
import {
  AllSocietiesListApi,
  CreateSocietiesApi,
  DeleteSocietiesApi,
  EditSocietiesApi,
  GetSocietiesByIdApi,
} from "./useSocietiesApi";

export const useGetAllSocieties = () => {
  return useQuery({
    queryKey: SocietiesKeys.list(),
    queryFn: () => AllSocietiesListApi(),
  });
};

export const useGetSocietiesById = (id: string) => {
  return useQuery({
    queryKey: SocietiesKeys.detail(id),
    queryFn: () => GetSocietiesByIdApi(id),
    enabled: !!id,
  });
};

export const useCreateSocieties = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateSocietiesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SocietiesKeys.all });
    },
  });
};

export const useUpdateSocieties = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: any }) =>
      EditSocietiesApi(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SocietiesKeys.all });
    },
  });
};

export const useDeleteSocieties = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteSocietiesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SocietiesKeys.all });
    },
  });
};
