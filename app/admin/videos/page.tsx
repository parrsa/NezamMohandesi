'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Video,
    Plus,
    Play,
    Eye,
    ThumbsUp,
    ThumbsDown,
    Calendar,
    User,
    Edit,
    Trash2,
    AlertCircle,
    Loader2,
    Image as ImageIcon,
    Film,
    Clock,
    Server,
    RefreshCw,
    Scale,
    TrendingUp,
    Award,
    Shield,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/app/components/button/Button';
import Pagination from '@/app/components/Pagination';
import AddVideos from './Components/AddVideos';
import EditVideos from './Components/EditVideos';
import { useCreateVideos, useDeletedVideo, useGetAllVideos, useUpdateVideo } from '@/app/core/services/Video/useVideos';
import { generatePageNumbers } from '@/app/lib/generatePageNumbers';
import useTruncateText from '@/app/lib/useTruncateText';
import { Video as VideoType, VideoWithMedia } from './types';
import Image from 'next/image';
import DeleteConfirmModal from './Components/DeleteConfirmationModal';
import { useHeaderAction } from '@/app/core/provider/HeaderActionProvider/HeaderAction';
import { toastify } from '@/app/components/Toasts';
import { showErrorToasts } from '@/app/lib/showErrorToastify';

const isApiBusinessError = (error: any): boolean => {
    if (error?.response?.data?.isDone === false) {
        return true;
    }
    if (error?.isDone === false) {
        return true;
    }
    return false;
};

const getBusinessErrorMessage = (error: any): string => {
    if (error?.response?.data?.messages?.[0]) {
        return error.response.data.messages[0];
    }
    if (error?.messages?.[0]) {
        return error.messages[0];
    }
    return "خطایی رخ داده است";
};

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, {
            threshold: 0.1,
            rootMargin: "0px",
            ...options
        });

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [ref, options]);

    return { ref, isIntersecting };
};

interface StatCardProps {
    title: string;
    value: number;
    icon: any;
    color: string;
    trend?: string;
}

const StatCard = ({ title, value, icon: Icon, color, trend }: StatCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative group overflow-hidden"
    >
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="relative bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-xs font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        {value.toLocaleString('fa-IR')}
                    </h3>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            <TrendingUp size={12} className="text-emerald-500" />
                            <span className="text-emerald-600 text-xs font-medium">{trend}</span>
                            <span className="text-slate-400 text-xs">نسبت به ماه قبل</span>
                        </div>
                    )}
                </div>
                <div className={`relative p-4 rounded-2xl bg-linear-to-br ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    </motion.div>
);

interface VideoPlayerProps {
    videoFileId: string;
    coverFileId: string;
    title: string;
}

const VideoPlayer = ({ videoFileId, coverFileId, title }: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [showCover, setShowCover] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { ref: inViewRef, isIntersecting } = useIntersectionObserver({
        threshold: 0.1,
    });

    const setRefs = useCallback((node: HTMLDivElement | null) => {
        inViewRef.current = node;
    }, [inViewRef]);

    useEffect(() => {
        const loadCover = async () => {
            if (!coverFileId || coverUrl || !isIntersecting) return;

            try {
                const response = await fetch(
                    `http://10.0.1.141:8082/Api/File/DownloadFileById?fileId=${coverFileId}`,
                    { method: 'POST' }
                );
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setCoverUrl(url);
                }
            } catch (error) {
                showErrorToasts(error);
            }
        };

        loadCover();

        return () => {
            if (coverUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(coverUrl);
            }
        };
    }, [coverFileId, isIntersecting]);

    const loadVideo = async () => {
        if (!videoFileId || videoUrl || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://10.0.1.141:8082/Api/Video/DownloadVideoyId?videoId=${videoFileId}`,
                { method: 'POST' }
            );

            if (!response.ok) {
                throw new Error('Failed to load video');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
        } catch (err: any) {
            showErrorToasts(error);
            setError(err.message || 'خطا در بارگذاری ویدیو');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlay = async () => {
        if (!videoUrl) {
            await loadVideo();
        }
        setShowCover(false);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }, 100);
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
        setShowCover(true);
    };

    const handleStop = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
            setShowCover(true);
        }
    };

    useEffect(() => {
        return () => {
            if (videoUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [videoUrl]);

    if (error) {
        return (
            <div ref={setRefs} dir='rtl' className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle size={24} className="text-red-500" />
                    </div>
                    <p className="text-red-500 font-medium mb-2">خطا در بارگذاری</p>
                    <button
                        onClick={loadVideo}
                        className="mt-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
                    >
                        تلاش مجدد
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={setRefs} className="relative w-full h-full rounded-2xl overflow-hidden group bg-linear-to-br from-slate-800 to-slate-900">
            {showCover && coverUrl && (
                <div className="relative w-full h-full">
                    <Image
                        width={800}
                        height={700}
                        src={coverUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    {/* دکمه پخش */}
                    {!isLoading && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlay}
                            disabled={isLoading}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <div className="bg-linear-to-r from-slate-700 to-slate-800 p-5 rounded-full shadow-2xl transform transition-all duration-300">
                                <Play size={32} className="text-white" />
                            </div>
                        </motion.button>
                    )}

                    {isLoading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Loader2 size={40} className="text-white" />
                            </motion.div>
                        </div>
                    )}

                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Clock size={10} />
                        <span>برای پخش کلیک کنید</span>
                    </div>
                </div>
            )}

            {!showCover && videoUrl && (
                <div className="relative w-full h-full">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-contain bg-black"
                        controls
                        autoPlay
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={handleVideoEnded}
                        onError={handleStop}
                        playsInline
                        src={videoUrl}
                    />
                    <button
                        onClick={handleStop}
                        className="absolute top-3 left-3 bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 rounded-md text-xs transition-colors z-10 flex items-center gap-1"
                    >
                        <ImageIcon size={12} />
                        <span>بازگشت</span>
                    </button>
                </div>
            )}
        </div>
    );
};

interface VideoCardProps {
    video: VideoType;
    onEdit: (video: VideoType) => void;
    onDelete: (id: string) => void;
}

const VideoCard = ({ video, onEdit, onDelete }: VideoCardProps) => {
    const [showActions, setShowActions] = useState(false);
    const description = useTruncateText(video.description, 100);
    const title = useTruncateText(video.title, 50);

    const formatDate = (timestamp: number) => {
        if (!timestamp) return 'نامشخص';
        const date = new Date(timestamp);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'امروز';
        if (diffDays === 1) return 'دیروز';
        if (diffDays < 7) return `${diffDays} روز پیش`;
        return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="group"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* نوار بالایی */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-slate-700 to-slate-800 z-10" />

                {/* بخش ویدیو */}
                <div className="relative h-56 overflow-hidden">
                    <VideoPlayer
                        videoFileId={video.videoFileId}
                        coverFileId={video.coverFileId}
                        title={video.title}
                    />

                    {/* آمار بازدید */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1"
                    >
                        <Eye size={10} />
                        <span>{video.viewCount.toLocaleString('fa-IR')}</span>
                    </motion.div>

                    {/* دکمه‌های اکشن */}
                    <AnimatePresence>
                        {showActions && (
                            <motion.div
                                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
                            >
                                <motion.button
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onEdit(video)}
                                    className="p-2.5 bg-white rounded-xl shadow-lg"
                                >
                                    <Edit size={16} className="text-emerald-600" />
                                </motion.button>
                                <motion.button
                                    initial={{ scale: 0, rotate: 180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onDelete(video.id)}
                                    className="p-2.5 bg-white rounded-xl shadow-lg"
                                >
                                    <Trash2 size={16} className="text-red-600" />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* محتوای کارت */}
                <div className="p-4">
                    <h3 className="font-bold text-slate-800 text-base line-clamp-2 leading-relaxed mb-2 group-hover:text-slate-600 transition-colors">
                        {title}
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                        {description || 'توضیحی برای این ویدیو ثبت نشده است.'}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                <User size={10} className="text-white" />
                            </div>
                            <span className="font-medium">{video.creatorName || 'سامانه نظام'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={9} />
                            <span>{formatDate(video.createDate ?? Date.now())}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 text-emerald-600 text-[10px] font-medium">
                            <ThumbsUp size={10} />
                            <span>{video.likes.toLocaleString('fa-IR')}</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 text-red-600 text-[10px] font-medium">
                            <ThumbsDown size={10} />
                            <span>{video.disLikes.toLocaleString('fa-IR')}</span>
                        </motion.div>
                        <div className="mr-auto px-2 py-0.5 rounded-md bg-slate-100">
                            <span className="text-slate-400 text-[9px] font-mono">{video.code}</span>
                        </div>
                    </div>
                </div>

                {/* نوار پیشرفت */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min((video.viewCount / 10000) * 100, 100)}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-linear-to-r from-slate-600 to-slate-700"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default function VideoManagementPage() {
    const { setAction, setActionSecound } = useHeaderAction();
    const deleteVideo = useDeletedVideo();

    const [modalState, setModalState] = useState({
        isAddModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
    });

    const [selectedVideo, setSelectedVideo] = useState<VideoWithMedia | null>(null);
    const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
    const [videosWithMedia, setVideosWithMedia] = useState<VideoType[]>([]);
    const [uploadedCoverFile, setUploadedCoverFile] = useState<File | null>(null);
    const [uploadedVideoFile, setUploadedVideoFile] = useState<File | null>(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode] = useState<'grid' | 'list'>('grid');

    const [hasInitialError, setHasInitialError] = useState(false);
    const [businessErrorMessage, setBusinessErrorMessage] = useState<string | null>(null);

    const { data, isLoading, error, refetch } = useGetAllVideos(currentPage, 12);
    const createVideo = useCreateVideos();
    const updateVideo = useUpdateVideo();

    useEffect(() => {
        if (error && isApiBusinessError(error)) {
            const message = getBusinessErrorMessage(error);
            setBusinessErrorMessage(message);
            setHasInitialError(false);
        }
        else if (error && !isApiBusinessError(error) && !hasInitialError) {
            setHasInitialError(true);
            setBusinessErrorMessage(null);
        }
        else if (data) {
            setBusinessErrorMessage(null);
            setHasInitialError(false);
        }
    }, [error, data, hasInitialError]);

    useEffect(() => {
        if (data?.data) {
            setVideosWithMedia(data.data);
        }
    }, [data]);

    useEffect(() => {
        setAction(
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
            >
                <div className="p-2.5 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 shadow-lg">
                    <Scale size={22} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        مدیریت ویدیوها
                    </h1>
                    <p className="text-xs text-slate-500">مدیریت ویدیوهای آموزشی و اطلاعیه‌های قضایی</p>
                </div>
            </motion.div>
        );

        setActionSecound(
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalState(prev => ({ ...prev, isAddModalOpen: true }))}
                className="relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm font-medium"
            >
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Plus size={16} />
                <span>ویدیو جدید</span>
            </motion.button>
        );

        return () => {
            setAction(null);
            setActionSecound(null);
        };
    }, [setAction, setActionSecound]);

    const stats = {
        total: data?.totalRecord || 0,
        totalViews: videosWithMedia.reduce((acc, curr) => acc + curr.viewCount, 0),
        totalLikes: videosWithMedia.reduce((acc, curr) => acc + curr.likes, 0),
        avgViews: videosWithMedia.length
            ? Math.round(videosWithMedia.reduce((acc, curr) => acc + curr.viewCount, 0) / videosWithMedia.length)
            : 0,
    };

    const handleEdit = (video: VideoType) => {
        setSelectedVideo({ ...video, videoSrc: null, coverSrc: null });
        setUploadedVideoFile(null);
        setUploadedCoverFile(null);
        setModalState(prev => ({ ...prev, isEditModalOpen: true }));
    };

    const handleDelete = (id: string) => {
        setVideoToDelete(id);
        setModalState(prev => ({ ...prev, isDeleteModalOpen: true }));
    };

    const handleAddSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        if (uploadedVideoFile) formData.append('Video', uploadedVideoFile);
        if (uploadedCoverFile) formData.append('Cover', uploadedCoverFile);

        createVideo.mutate(formData, {
            onSuccess: () => {
                toastify("success", '🎬 ویدیو با موفقیت اضافه شد');
                setModalState(prev => ({ ...prev, isAddModalOpen: false }));
                setUploadedVideoFile(null);
                setUploadedCoverFile(null);
                refetch();
            },
            onError: (error: any) => {
                if (isApiBusinessError(error)) {
                    toastify("error", getBusinessErrorMessage(error));
                } else {
                    showErrorToasts(error);
                }
            }
        });
    };

    const handleEditSubmit = async (values: any) => {
        if (!selectedVideo) return;

        const formData = new FormData();
        formData.append('id', selectedVideo.id);
        formData.append('title', values.title);
        formData.append('description', values.description);
        if (uploadedVideoFile) formData.append('Video', uploadedVideoFile);
        if (uploadedCoverFile) formData.append('Cover', uploadedCoverFile);

        updateVideo.mutate(formData, {
            onSuccess: () => {
                toastify("success", '✅ ویدیو با موفقیت بروزرسانی شد');
                setModalState(prev => ({ ...prev, isEditModalOpen: false }));
                setSelectedVideo(null);
                setUploadedVideoFile(null);
                setUploadedCoverFile(null);
                refetch();
            },
            onError: (error: any) => {
                if (isApiBusinessError(error)) {
                    toastify("error", getBusinessErrorMessage(error));
                } else {
                    showErrorToasts(error);
                }
            }
        });
    };

    const handleConfirmDelete = async () => {
        if (videoToDelete) {
            const formData = new FormData();
            formData.append('videoId', videoToDelete);

            deleteVideo.mutate(formData, {
                onSuccess: () => {
                    toastify("success", '✅ ویدیو با موفقیت حذف شد');
                    setModalState(prev => ({ ...prev, isDeleteModalOpen: false }));
                    setVideoToDelete(null);
                    refetch();
                },
                onError: (error: any) => {
                    if (isApiBusinessError(error)) {
                        toastify("error", getBusinessErrorMessage(error));
                    } else {
                        showErrorToasts(error);
                    }
                }
            });
        }
    };

    const totalPages = data ? Math.ceil(data.totalRecord / data.pageSize) : 1;
    const pageNumbers = generatePageNumbers(totalPages, currentPage + 1);

    const shouldShowSystemError = error && !data && hasInitialError && !businessErrorMessage;

    if (shouldShowSystemError) {
        return (
            <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-100 p-4" dir="rtl">
                <div className="flex flex-col items-center justify-center py-20">
                    <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">خطا در بارگذاری</h2>
                    <p className="text-slate-600 mb-4">{error?.message || 'خطای ناشناخته'}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setHasInitialError(false);
                                refetch();
                            }}
                            className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors"
                        >
                            تلاش مجدد
                        </button>
                        <button
                            onClick={() => setModalState(prev => ({ ...prev, isAddModalOpen: true }))}
                            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                        >
                            ایجاد ویدیو جدید
                        </button>
                    </div>
                </div>

                <AddVideos
                    showModalAddVideos={modalState.isAddModalOpen}
                    isVisible={modalState.isAddModalOpen}
                    onClose={() => setModalState(prev => ({ ...prev, isAddModalOpen: false }))}
                    uploadedCoverFile={uploadedCoverFile}
                    setUploadedCoverFile={setUploadedCoverFile}
                    uploadedVideoFile={uploadedVideoFile}
                    setUploadedVideoFile={setUploadedVideoFile}
                    handleSubmit={handleAddSubmit}
                    isSubmitting={createVideo.isPending}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-100" dir="rtl">
            <div className="p-6">
                {/* دکمه موبایل */}
                <div className="md:hidden flex justify-end mb-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setModalState(prev => ({ ...prev, isAddModalOpen: true }))}
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-lg shadow-md text-sm"
                    >
                        <Plus size={16} />
                        <span>ویدیو جدید</span>
                    </motion.button>
                </div>

                {/* کارت‌های آماری */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                    <StatCard title="کل ویدیوها" value={stats.total} icon={Video} color="from-slate-600 to-slate-700" trend="+8.5%" />
                    <StatCard title="تعداد بازدیدها" value={stats.totalViews} icon={Eye} color="from-emerald-500 to-teal-500" trend="+22.1%" />
                    <StatCard title="مجموع لایک‌ها" value={stats.totalLikes} icon={ThumbsUp} color="from-amber-500 to-orange-500" trend="+15.3%" />
                    <StatCard title="میانگین بازدید" value={stats.avgViews} icon={TrendingUp} color="from-blue-500 to-indigo-500" trend="+12.7%" />
                </div>

                {/* لیست ویدیوها */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 size={48} className="text-slate-400" />
                        </motion.div>
                        <p className="text-slate-500 mt-4">در حال بارگذاری ویدیوها...</p>
                    </div>
                ) : businessErrorMessage ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <div className="w-24 h-24 mx-auto bg-linear-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
                            <Server size={48} className="text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700 mb-3">بدون داده</h3>
                        <p className="text-slate-500 mb-4 text-center max-w-md">{businessErrorMessage}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => refetch()}
                                className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                <RefreshCw size={20} />
                                تلاش مجدد
                            </button>
                            <button
                                onClick={() => setModalState(prev => ({ ...prev, isAddModalOpen: true }))}
                                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                <Plus size={20} />
                                افزودن ویدیو
                            </button>
                        </div>
                    </motion.div>
                ) : (!data?.data || data.data.length === 0) ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 mx-auto bg-linear-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
                            <Film size={48} className="text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700 mb-3">ویدیویی یافت نشد</h3>
                        <p className="text-slate-500 mb-8">هنوز هیچ ویدیویی اضافه نکرده‌اید</p>
                        <Button
                            onClick={() => setModalState(prev => ({ ...prev, isAddModalOpen: true }))}
                            className="mx-auto flex items-center gap-2 bg-linear-to-r from-slate-700 to-slate-800"
                        >
                            <Plus size={20} />
                            افزودن اولین ویدیو
                        </Button>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {data.data.map((video: VideoType, index: number) => (
                                    <motion.div
                                        key={video.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <VideoCard
                                            video={video}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* صفحه‌بندی */}
                        {data && data.totalRecord > data.pageSize && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-10"
                            >
                                <Pagination
                                    pageNumbers={pageNumbers}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* مودال‌ها */}
            <AddVideos
                showModalAddVideos={modalState.isAddModalOpen}
                isVisible={modalState.isAddModalOpen}
                onClose={() => setModalState(prev => ({ ...prev, isAddModalOpen: false }))}
                uploadedCoverFile={uploadedCoverFile}
                setUploadedCoverFile={setUploadedCoverFile}
                uploadedVideoFile={uploadedVideoFile}
                setUploadedVideoFile={setUploadedVideoFile}
                handleSubmit={handleAddSubmit}
                isSubmitting={createVideo.isPending}
            />

            {selectedVideo && (
                <EditVideos
                    showModalAddVideos={modalState.isEditModalOpen}
                    isVisible={modalState.isEditModalOpen}
                    onClose={() => {
                        setModalState(prev => ({ ...prev, isEditModalOpen: false }));
                        setSelectedVideo(null);
                        setUploadedVideoFile(null);
                        setUploadedCoverFile(null);
                    }}
                    item={selectedVideo}
                    uploadedCoverFile={uploadedCoverFile}
                    setUploadedCoverFile={setUploadedCoverFile}
                    uploadedVideoFile={uploadedVideoFile}
                    setUploadedVideoFile={setUploadedVideoFile}
                    handleSubmit={handleEditSubmit}
                    isSubmitting={updateVideo.isPending}
                />
            )}

            <DeleteConfirmModal
                isOpen={modalState.isDeleteModalOpen}
                onClose={() => {
                    setModalState(prev => ({ ...prev, isDeleteModalOpen: false }));
                    setVideoToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                isDeleting={deleteVideo.isPending}
            />
        </div>
    );
}