import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AllPublicationsKey, PublicationKey } from "./key";
import {
  CreatePublicationFn,
  DeletePublicationFn,
  UpdatePublicationFn,
} from "./api";

export const useCreatePublication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => CreatePublicationFn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AllPublicationsKey(),
      });
    },
  });
};

export const useUpdatePublication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      UpdatePublicationFn({ id, formData }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: AllPublicationsKey(),
      });
      queryClient.invalidateQueries({
        queryKey: PublicationKey(variables.id),
      });
    },
  });
};

export const useDeletePublication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeletePublicationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AllPublicationsKey(),
      });
    },
  });
};
