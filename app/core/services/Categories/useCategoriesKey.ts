export const CategoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...CategoriesKeys.all, "list"] as const,
  list: (pageNumber: number, pageSize: number) =>
    [...CategoriesKeys.lists(), { pageNumber, pageSize }] as const,
  details: () => [...CategoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...CategoriesKeys.details(), id] as const,
};
