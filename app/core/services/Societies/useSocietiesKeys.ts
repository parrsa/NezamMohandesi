export const SocietiesKeys = {
  all: ["societies"] as const,
  lists: () => [...SocietiesKeys.all, "list"] as const,
  list: () => [...SocietiesKeys.lists()] as const,
  details: () => [...SocietiesKeys.all, "detail"] as const,
  detail: (id: string) => [...SocietiesKeys.details(), id] as const,
};
