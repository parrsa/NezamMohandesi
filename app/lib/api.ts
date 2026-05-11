export interface VideoResponse {
    id: string;
    title: string;
    description: string;
    videoFileId: string;
    coverFileId: string;
    likes: number;
    disLikes: number;
    viewCount: number;
}

export interface ApiResponse {
    isDone: boolean;
    messages: string[];
    data: VideoResponse[];
    totalRecord: number;
    pageNumber: number;
    pageSize: number;
}


export interface Publication {
    id: string;
    publicationTitle: string;
    description: string;
    issueNumber: string;
    volume: string;
    publicationDate: number;
    publicationDateDisplay: string;
    managingPublisher: string;
    editorInChief: string;
    likes: number;
    disLikes: number;
    publicationFileId: string;
    coverFileId: string;
    downloadCount: number;
}

export interface PublicationsApiResponse {
    isDone: boolean;
    messages: string[];
    data: Publication[];
    totalRecord: number;
    pageNumber: number;
    pageSize: number;
}

export async function fetchPublications(pageNumber: number = 0, pageSize: number = 9) {
    try {
        const response = await fetch(
            `http://10.0.1.141:8082/Api/Publication/GetPublicationList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
            {
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PublicationsApiResponse = await response.json();

        return {
            publications: data.data || [],
            totalRecord: data.totalRecord || 0,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize || pageSize
        };
    } catch (error) {
        console.error('Error in fetchPublications:', error);
        return {
            publications: [],
            totalRecord: 0,
            pageNumber,
            pageSize
        };
    }
}
export async function fetchPublicationDetail(publicationId: string): Promise<any | null> {
    try {
        const response = await fetch(
            `http://10.0.1.141:8082/Api/Publication/GetPublicationById?publicationId=${publicationId}`,
            {
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || null;
    } catch (error) {
        return null;
    }
}

export async function fetchVideos(pageNumber: number = 0, pageSize: number = 10): Promise<{
    videos: VideoResponse[];
    totalRecord: number;
    pageNumber: number;
    pageSize: number;
}> {
    try {
        const response = await fetch(
            `http://10.0.1.141:8082/Api/Video/GetVideoList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
            {
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        return {
            videos: data.data || [],
            totalRecord: data.totalRecord || 0,
            pageNumber: data.pageNumber || pageNumber,
            pageSize: data.pageSize || pageSize
        };
    } catch (error) {
        return {
            videos: [],
            totalRecord: 0,
            pageNumber,
            pageSize
        };
    }
}
export async function fetchNews(pageNumber: number = 0, pageSize: number = 10): Promise<{
    news: any[];
    totalRecord: number;
    pageNumber: number;
    pageSize: number;
}> {
    try {
        const response = await fetch(
            `http://10.0.1.141:8082/Api/News/GetNewsList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
            {
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();

        return {
            news: data.data || [],
            totalRecord: data.totalRecord || 0,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize || pageSize
        };
    } catch (error) {
        return {
            news: [],
            totalRecord: 0,
            pageNumber,
            pageSize
        };
    }
}
export async function fetchNewsDetail(newsId: string): Promise<any | null> {
    try {
        const response = await fetch(
            `http://10.0.1.141:8082/Api/News/GetNewsById?newsId=${newsId}`,
            {
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || null;
    } catch (error) {
        return null;
    }
}