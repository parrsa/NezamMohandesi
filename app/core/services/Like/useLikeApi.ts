import api from "../../config/api";

export interface LikeResponse {
    isDone: boolean;
    messages: string[];
    data: any;
}

export const LikeApi = async (videoId: string): Promise<LikeResponse> => {
    try {
        const response = await api.post(`UserFeedBack/Like?id=${videoId}`, null, {
            headers: {
                'accept': 'text/plain',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to like video:', error);
        throw error;
    }
};

export const DislikeApi = async (videoId: string): Promise<LikeResponse> => {
    try {
        const response = await api.post(`UserFeedBack/DsiLike?id=${videoId}`, null, {
            headers: {
                'accept': 'text/plain',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to dislike video:', error);
        throw error;
    }
};