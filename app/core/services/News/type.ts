export interface News {
    id: string;
    code: number;
    body: string;
    leadParagraph: string;
    caption: string;
    credit: string;
    headline: string;
    shortTitle: string;
    seoTitle: string;
    isExclusive: boolean;
    isSticky: boolean;
    publishDate: number;
    publishDateDisplay: string | null;
    publishTime: number;
    publishTimeDisplay: string | null;
    expireDate: number;
    expireDateDisplay: string | null;
    expireTime: number;
    expireTimeDisplay: string | null;
    newsFileId: string | null;
    viewCount: number;
    likes: number;
    disLikes: number;
}

export interface NewsResponse {
    data: News[];
    totalRecord: number;
    pageNumber: number;
    pageSize: number;
    isDone: boolean;
    messages: string[];
}

export interface SingleNewsResponse {
    data: News;
    isDone: boolean;
    messages: string[];
}

export interface NewsWithImage extends News {
    imageSrc: string | null;
}

export interface ApiResponse {
    isDone: boolean;
    messages: string[];
}