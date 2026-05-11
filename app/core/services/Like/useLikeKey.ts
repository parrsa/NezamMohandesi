export const VideoFeedbackKeys = {
    all: ['videoFeedback'] as const,
    likes: (videoId: string) => ['videoFeedback', 'likes', videoId] as const,
    dislikes: (videoId: string) => ['videoFeedback', 'dislikes', videoId] as const,
    stats: (videoId: string) => ['videoFeedback', 'stats', videoId] as const,
};