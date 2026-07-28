import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SliderKeys } from "./useSliderKeys";
import {
  CreateSliderApi,
  DeleteSliderApi,
  GetAllSliderApi,
} from "./useSliderApi";

export const useGetAllSlider = () => {
  return useQuery({
    queryKey: SliderKeys.list(),
    queryFn: GetAllSliderApi,
  });
};

export const useCreateSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateSliderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SliderKeys.all });
    },
  });
};

export const useDeleteSlider = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteSliderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SliderKeys.all });
    },
  });
};
