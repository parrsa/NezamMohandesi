'use client';

import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import VideoPlayers from '../videoplayers';
import { Input, TextArea } from '@/app/components/Input';
import Modal from '@/app/components/Modal';
import { X, ImageIcon, VideoIcon, Save, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  title: yup.string().required('وارد کردن عنوان الزامی است'),
  description: yup.string().required('توضیحات را وارد کنید'),
});

interface EditVideosProps {
  showModalAddVideos: boolean;
  isVisible: boolean;
  onClose: () => void;
  item: any;
  uploadedCoverFile: File | null;
  setUploadedCoverFile: (file: File | null) => void;
  uploadedVideoFile: File | null;
  setUploadedVideoFile: (file: File | null) => void;
  handleSubmit: (values: any, helpers: any) => void;
  variant?: string;
  logos?: React.ReactNode;
  Close_Icon?: React.ReactNode;
  isSubmitting?: boolean;
}

const EditVideos = ({
  showModalAddVideos,
  item,
  variant = "editchargemodal",
  uploadedCoverFile,
  setUploadedCoverFile,
  uploadedVideoFile,
  setUploadedVideoFile,
  onClose,
  isVisible,
  handleSubmit,
  logos,
  Close_Icon,
  isSubmitting = false,
}: EditVideosProps) => {
  const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
  const [videoImageURL, setVideoImageURL] = useState<string | null>(null);
  const [currentCoverUrl, setCurrentCoverUrl] = useState<string | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [isLoadingCover, setIsLoadingCover] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoverImage = async () => {
      if (!item?.coverFileId || !isVisible || currentCoverUrl) return;

      setIsLoadingCover(true);
      setCoverError(null);

      try {
        const response = await fetch(
          `http://10.0.1.141:8082/Api/File/DownloadFileById?fileId=${item.coverFileId}`,
          { method: 'POST' }
        );

        if (!response.ok) {
          throw new Error('خطا در دریافت تصویر کاور');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCurrentCoverUrl(url);
        setCoverImageURL(url);
      } catch (error: any) {
        console.error('Failed to load cover image:', error);
        setCoverError(error.message || 'خطا در بارگذاری تصویر');
        toast.error('خطا در بارگذاری تصویر کاور');
      } finally {
        setIsLoadingCover(false);
      }
    };

    loadCoverImage();

    return () => {
      if (currentCoverUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentCoverUrl);
      }
    };
  }, [item?.coverFileId, isVisible]);

  useEffect(() => {
    const loadVideo = async () => {
      if (!item?.videoFileId || !isVisible || currentVideoUrl) return;

      setIsLoadingVideo(true);
      setVideoError(null);

      try {
        const response = await fetch(
          `http://10.0.1.141:8082/Api/Video/DownloadVideoyId?videoId=${item.videoFileId}`,
          { method: 'POST' }
        );

        if (!response.ok) {
          throw new Error('خطا در دریافت ویدیو');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCurrentVideoUrl(url);
        setVideoImageURL(url);
      } catch (error: any) {
        console.error('Failed to load video:', error);
        setVideoError(error.message || 'خطا در بارگذاری ویدیو');
        toast.error('خطا در بارگذاری ویدیو');
      } finally {
        setIsLoadingVideo(false);
      }
    };

    loadVideo();

    return () => {
      if (currentVideoUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentVideoUrl);
      }
    };
  }, [item?.videoFileId, isVisible]);

  useEffect(() => {
    if (uploadedCoverFile) {
      if (coverImageURL?.startsWith('blob:') && coverImageURL !== currentCoverUrl) {
        URL.revokeObjectURL(coverImageURL);
      }
      const url = URL.createObjectURL(uploadedCoverFile);
      setCoverImageURL(url);
    } else if (!uploadedCoverFile && currentCoverUrl) {
      setCoverImageURL(currentCoverUrl);
    }
  }, [uploadedCoverFile, currentCoverUrl]);

  useEffect(() => {
    if (uploadedVideoFile) {
      if (videoImageURL?.startsWith('blob:') && videoImageURL !== currentVideoUrl) {
        URL.revokeObjectURL(videoImageURL);
      }
      const url = URL.createObjectURL(uploadedVideoFile);
      setVideoImageURL(url);
    } else if (!uploadedVideoFile && currentVideoUrl) {
      setVideoImageURL(currentVideoUrl);
    }
  }, [uploadedVideoFile, currentVideoUrl]);

  useEffect(() => {
    if (!isVisible) {
      if (coverImageURL?.startsWith('blob:') && coverImageURL !== currentCoverUrl) {
        URL.revokeObjectURL(coverImageURL);
      }
      if (videoImageURL?.startsWith('blob:') && videoImageURL !== currentVideoUrl) {
        URL.revokeObjectURL(videoImageURL);
      }
      if (currentCoverUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentCoverUrl);
      }
      if (currentVideoUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentVideoUrl);
      }

      setUploadedCoverFile(null);
      setUploadedVideoFile(null);
      setCoverImageURL(null);
      setVideoImageURL(null);
      setCurrentCoverUrl(null);
      setCurrentVideoUrl(null);
      setCoverError(null);
      setVideoError(null);
    }
  }, [isVisible]);

  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setUploadedCoverFile(file);
    setFieldValue('coverFile', file);
    setCoverError(null);
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setUploadedVideoFile(file);
    setFieldValue('videoFile', file);
    setVideoError(null);
  };

  const resetCoverImage = (setFieldValue: any) => {
    if (coverImageURL?.startsWith('blob:') && coverImageURL !== currentCoverUrl) {
      URL.revokeObjectURL(coverImageURL);
    }
    setUploadedCoverFile(null);
    setCoverImageURL(currentCoverUrl);
    setFieldValue('coverFile', null);
  };

  const resetVideo = (setFieldValue: any) => {
    if (videoImageURL?.startsWith('blob:') && videoImageURL !== currentVideoUrl) {
      URL.revokeObjectURL(videoImageURL);
    }
    setUploadedVideoFile(null);
    setVideoImageURL(currentVideoUrl);
    setFieldValue('videoFile', null);
  };

  const handleClearCover = (setFieldValue: any) => {
    if (coverImageURL?.startsWith('blob:')) {
      URL.revokeObjectURL(coverImageURL);
    }
    if (currentCoverUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(currentCoverUrl);
    }
    setUploadedCoverFile(null);
    setCoverImageURL(null);
    setCurrentCoverUrl(null);
    setFieldValue('coverFile', null);
  };

  const handleClearVideo = (setFieldValue: any) => {
    if (videoImageURL?.startsWith('blob:')) {
      URL.revokeObjectURL(videoImageURL);
    }
    if (currentVideoUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(currentVideoUrl);
    }
    setUploadedVideoFile(null);
    setVideoImageURL(null);
    setCurrentVideoUrl(null);
    setFieldValue('videoFile', null);
  };

  if (!showModalAddVideos || !isVisible) return null;

  const isLoading = isLoadingCover || isLoadingVideo;

  const headerProps = {
    title: "✏️ ویرایش ویدیو",
    ColorText: "#1e293b",
    bgColor: "transparent",
    Close_Icon: Close_Icon,
    className: "border-b border-gray-200 py-4",
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      auth
      className="w-full md:w-[45%]  h-[95vh] backdrop-blur-xl bg-white rounded-3xl shadow-2xl border border-gray-200"
      logos={logos}
      showHeader={true}
      headerProps={headerProps}
    >
      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center">
          <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">در حال بارگذاری اطلاعات ویدیو...</p>
        </div>
      ) : (
        <Formik
          initialValues={{
            title: item?.title || '',
            description: item?.description || '',
            coverFile: null,
            videoFile: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="p-6 space-y-6">
              {/* Cover Image Upload */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                <label className="cursor-pointer w-full">
                  <div className="flex flex-col items-center">
                    {coverImageURL ? (
                      <div className="relative w-full max-w-md">
                        <img
                          src={coverImageURL}
                          alt="Cover Preview"
                          className="w-full h-48 object-cover rounded-xl"
                          onError={() => setCoverError('خطا در نمایش تصویر')}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          {uploadedCoverFile && currentCoverUrl && (
                            <button
                              type="button"
                              onClick={() => resetCoverImage(setFieldValue)}
                              className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                              title="بازگشت به تصویر قبلی"
                            >
                              <X size={16} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleClearCover(setFieldValue)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            title="حذف تصویر"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {uploadedCoverFile ? 'تصویر جدید' : 'تصویر فعلی'}
                        </div>
                      </div>
                    ) : coverError ? (
                      <div className="text-center py-8">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                        <p className="text-red-500 mb-2">{coverError}</p>
                        <p className="text-gray-500 text-sm">لطفا تصویر جدیدی انتخاب کنید</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                          <ImageIcon size={32} className="text-blue-500" />
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          {currentCoverUrl ? 'تغییر تصویر کاور' : 'افزودن تصویر کاور'}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          فرمت‌های مجاز: JPG، PNG، GIF (حداکثر 5MB)
                        </p>
                        {!currentCoverUrl && (
                          <p className="text-amber-600 text-sm mb-2">
                            این ویدیو تصویر کاور ندارد
                          </p>
                        )}
                        <span className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-colors">
                          انتخاب فایل
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleCoverFileUpload(e, setFieldValue)}
                    />
                  </div>
                </label>
              </div>

              {/* Video File Upload */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
                <label className="cursor-pointer w-full">
                  <div className="flex flex-col items-center">
                    {videoImageURL ? (
                      <div className="relative w-full">
                        <div className="absolute top-2 right-2 flex gap-2 z-20">
                          {uploadedVideoFile && currentVideoUrl && (
                            <button
                              type="button"
                              onClick={() => resetVideo(setFieldValue)}
                              className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                              title="بازگشت به ویدیوی قبلی"
                            >
                              <X size={16} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleClearVideo(setFieldValue)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            title="حذف ویدیو"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {uploadedVideoFile ? 'ویدیوی جدید' : 'ویدیوی فعلی'}
                        </div>
                        <div className=" rounded-xl overflow-hidden">
                          <VideoPlayers
                            src={videoImageURL}
                            cover={coverImageURL || undefined}
                          />
                        </div>
                      </div>
                    ) : videoError ? (
                      <div className="text-center py-8">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                        <p className="text-red-500 mb-2">{videoError}</p>
                        <p className="text-gray-500 text-sm">لطفا ویدیوی جدیدی انتخاب کنید</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                          <VideoIcon size={32} className="text-purple-500" />
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          {currentVideoUrl ? 'تغییر فایل ویدیو' : 'افزودن فایل ویدیو'}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          فرمت‌های مجاز: MP4، MOV، AVI (حداکثر 500MB)
                        </p>
                        {!currentVideoUrl && (
                          <p className="text-amber-600 text-sm mb-2">
                            این ویدیو فایل ندارد
                          </p>
                        )}
                        <span className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
                          انتخاب فایل
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={(e) => handleVideoFileUpload(e, setFieldValue)}
                    />
                  </div>
                </label>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان ویدیو *
                  </label>
                  <Field
                    name="title"
                    type="text"
                    as={Input}
                    variant="form"
                    rounded="xl"
                    inputSize="lg"
                    error={touched.title && errors.title}
                    placeholder="عنوان ویدیو را وارد کنید..."
                  />
                  <ErrorMessage name="title">
                    {(msg) => (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات ویدیو *
                  </label>
                  <Field
                    as={TextArea}
                    name="description"
                    rows={4}
                    rounded="xl"
                    inputSize="lg"
                    error={touched.description && errors.description}
                    placeholder="توضیحات کامل ویدیو را اینجا بنویسید..."
                  />
                  <ErrorMessage name="description">
                    {(msg) => (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>در حال بروزرسانی...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>بروزرسانی ویدیو</span>
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default EditVideos;