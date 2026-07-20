import { ParamValue } from "next/dist/server/request/params";

export const ContentsKeys = {
  all: ["contents"] as const,
  lists: () => [...ContentsKeys.all, "list"] as const,
  list: (
    pageNumber: number,
    pageSize: number,
    isActive: boolean | null,
    categoryId: string | null | ParamValue,
  ) =>
    [
      ...ContentsKeys.lists(),
      { pageNumber, pageSize, isActive, categoryId },
    ] as const,
  details: () => [...ContentsKeys.all, "detail"] as const,
  detail: (id: string) => [...ContentsKeys.details(), id] as const,
};
