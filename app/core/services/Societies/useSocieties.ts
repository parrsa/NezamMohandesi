import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SocietiesKeys } from "./useSocietiesKeys";
import {
  AllSocietiesListApi,
  CreateSocietiesApi,
  CreateSocietyNoticesApi,
  DeleteSocietiesApi,
  DeleteSocietiesNoticesApi,
  EditSocietiesApi,
  GetAllSocietyNoticesApi,
  GetSocietyByIdApi,
  GetSocietyNoticesByIdApi,
} from "./useSocietiesApi";
import { ParamValue } from "next/dist/server/request/params";

export const useGetAllSocieties = () => {
  return useQuery({
    queryKey: SocietiesKeys.list(),
    queryFn: () => AllSocietiesListApi(),
  });
};

export const useGetSocietiesById = (id: string) => {
  return useQuery({
    queryKey: SocietiesKeys.detail(id),
    queryFn: () => GetSocietyByIdApi(id),
    enabled: !!id,
  });
};

export const useGetSocietyNoticesById = (id: string) => {
  return useQuery({
    queryKey: SocietiesKeys.detail(id),
    queryFn: () => GetSocietyNoticesByIdApi(id),
    enabled: !!id,
  });
};

export const useGetSocietiesNotices = (id: ParamValue) => {
  return useQuery({
    queryKey: SocietiesKeys.detail(String(id)),
    queryFn: () => GetAllSocietyNoticesApi(id),
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

export const useCreateSocietiesNotices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => CreateSocietyNoticesApi(formData),
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

export const useDeleteSocietiesNotices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteSocietiesNoticesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SocietiesKeys.all });
    },
  });
};
