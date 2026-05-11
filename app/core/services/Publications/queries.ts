import { useQuery } from "@tanstack/react-query";
import { AllPublicationsKey, PublicationKey } from "./key";
import { getAllPublicationsList, getPublicationById } from "./api";

export const GetAllPublications = ({ PageNumber = 0, PageSize = 10 }) => {
  const result = useQuery({
    queryKey: AllPublicationsKey(),
    queryFn: () => getAllPublicationsList({ PageNumber, PageSize }),
  });
  return result;
};

export const useGetPublication = (id: string) => {
  return useQuery({
    queryKey: PublicationKey(id),
    queryFn: () => getPublicationById(id),
    enabled: !!id,
  });
};
