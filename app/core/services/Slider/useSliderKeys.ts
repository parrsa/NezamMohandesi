export const SliderKeys = {
  all: ["slider"] as const,
  lists: () => [...SliderKeys.all, "list"] as const,
  list: () => [...SliderKeys.lists()] as const,
  details: () => [...SliderKeys.all, "detail"] as const,
  detail: (id: string) => [...SliderKeys.details(), id] as const,
};
