import api from "../../config/api";

export const AllNewsListApi = async (PageNumber: number = 0, PageSize: number = 12) => {
    try {
        const response = await api.get(`News/GetNewsList?PageNumber=${PageNumber}&PageSize=${PageSize}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch news list:', error);
        throw error;
    }
};
export async function downloadFile(fileId: string): Promise<Blob> {
    try {
        const response = await fetch(
            `http://10.0.1.141:8082/Api/File/DownloadFileById?fileId=${fileId}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to download file');
        }

        return await response.blob();
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}

export const GetNewsByIdApi = async (newsId: string) => {
    try {
        const response = await api.get(`News/GetNewsById?newsId=${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch news by ID:', error);
        throw error;
    }
};

export const CreateNewsApi = async (formData: FormData) => {
    try {
        const response = await api.post('News/AddNews', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create news:', error);
        throw error;
    }
};

export const UpdateNewsApi = async (formData: FormData) => {
    try {
        const response = await api.put('News/EditNews', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update news:', error);
        throw error;
    }
};

export const DeleteNewsApi = async (newsId: string): Promise<any> => {
    try {
        const formData = new FormData();
        formData.append('newsId', newsId);

        const response = await api.delete(`News/DeleteNews`, {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete news:', error);
        throw error;
    }
};