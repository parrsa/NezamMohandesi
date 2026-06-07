export interface Video {
  id: string;
  title: string;
  description: string;
  coverFileId: string;
  videoFileId: string;
  likes: number;
  disLikes: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  
  code?: string; 
  creatorId?: string;
  creatorName?: string;
  createDate?: number; 
  updateDate?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  tags?: string[];
  category?: string;
  duration?: number; 
  size?: number; 
  format?: string; 
  resolution?: string; 
  status?: 'draft' | 'published' | 'archived';
}

export interface VideoWithMedia extends Video {
  videoSrc?: string | null; 
  coverSrc?: string | null; 
  isVideoLoaded?: boolean; 
  isCoverLoaded?: boolean; 
  videoBlob?: Blob | null; 
  coverBlob?: Blob | null; 
}

export interface VideoResponse {
  data: Video[];
  totalRecord: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export interface VideoFormData {
  title: string;
  description: string;
  tags?: string[];
  category?: string;
  isActive?: boolean;
}

export interface VideoUploadResponse {
  id: string;
  title: string;
  description: string;
  coverFileId: string;
  videoFileId: string;
  message?: string;
  success: boolean;
}

export interface VideoStats {
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
  averageViews: number;
  mostViewedVideo?: Video;
  mostLikedVideo?: Video;
}

export const isVideoWithMedia = (video: Video | VideoWithMedia): video is VideoWithMedia => {
  return 'videoSrc' in video || 'coverSrc' in video;
};

export type VideoStatus = 'draft' | 'published' | 'archived';
export type VideoSortField = 'createdAt' | 'viewCount' | 'likes' | 'title';
export type VideoSortOrder = 'asc' | 'desc';

export interface VideoQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: VideoSortField;
  sortOrder?: VideoSortOrder;
  status?: VideoStatus;
  category?: string;
  tags?: string[];
  fromDate?: number;
  toDate?: number;
}

export interface VideoError {
  message: string;
  code?: string;
  details?: any;
  field?: string;
}

export interface VideoCache {
  [key: string]: {
    video: Video;
    expiresAt: number;
  };
}