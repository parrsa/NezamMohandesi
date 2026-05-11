export const VideosKeys = {
    all: ['allVideos'] as const,
    Videos: (PageNumber?: any, PageSize?: any) => ['allVideos', PageNumber, PageSize] as const,
};
