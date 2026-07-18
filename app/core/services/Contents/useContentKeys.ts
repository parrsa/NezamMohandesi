export const ContentsKeys = {
  all: ["contents"] as const,
  lists: () => [...ContentsKeys.all, "list"] as const,
  list: (pageNumber: number, pageSize: number) =>
    [...ContentsKeys.lists(), { pageNumber, pageSize }] as const,
  details: () => [...ContentsKeys.all, "detail"] as const,
  detail: (id: string) => [...ContentsKeys.details(), id] as const,
};
