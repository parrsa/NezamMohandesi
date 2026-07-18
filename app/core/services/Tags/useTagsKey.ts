export const TagsKeys = {
  all: ["tags"] as const,
  lists: () => [...TagsKeys.all, "list"] as const,
  list: () => [...TagsKeys.lists()] as const,
  details: () => [...TagsKeys.all, "detail"] as const,
  detail: (id: string) => [...TagsKeys.details(), id] as const,
};
