import api from "../../config/api";
export interface GetAllVideoList {
    PageNumber: number | string | any
    PageSize?: number | string
}
export const AllVideoListApi = async (PageNumber?: any, PageSize?: any): Promise<any> => {
    try {
        const response = await api.get(`Video/GetVideoList?PageNumber=${PageNumber}&PageSize=${PageSize}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch current week data:', error);
        throw error;
    }
};

export const CreateVideoApi = async (formData: any): Promise<any> => {
    try {
        const response = await api.post(
            `Video/AddVideo`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to create AddVideo:', error);
        throw error;
    }
};

export const UpdateVideoApi = async (formData: any): Promise<any> => {
    try {
        const response = await api.put(
            `Video/EditVideo`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to create EditVideo:', error);
        throw error;
    }
};

export const DeletedVideoApi = async (formData: any): Promise<any> => {
    try {
        const response = await api.delete(
            `Video/DeleteVideo`,
            {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to deleted DeleteVideo:', error);
        throw error;
    }
};

