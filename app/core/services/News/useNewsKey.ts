export const NewsKeys = {
    all: ['news'] as const,
    lists: () => [...NewsKeys.all, 'list'] as const,
    list: (pageNumber: number, pageSize: number) =>
        [...NewsKeys.lists(), { pageNumber, pageSize }] as const,
    details: () => [...NewsKeys.all, 'detail'] as const,
    detail: (id: string) => [...NewsKeys.details(), id] as const,
};