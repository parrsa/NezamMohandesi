// import React, { useEffect, useState } from "react";
// import Modal from "@/app/components/Modal";
// import * as yup from "yup";
// import { Field, Form, Formik } from "formik";
// import VideoPlayers from "../videoplayers";
// import { Input } from "@/app/components/Input";
// import { Button } from "@/app/components/button/Button";
// import Icons from "@/app/components/Icons";
// import { X } from "lucide-react";

// const validationSchema = yup.object().shape({
//   title: yup.string().required("وارد کردن عنوان الزامی است"),
//   description: yup.string().required("توضیحات را وارد کنید"),
// });

// const AddVideos = ({
//   showModalAddVideos,
//   variant,
//   uploadedCoverFile,
//   setUploadedCoverFile,
//   uploadedVideoFile,
//   setUploadedVideoFile,
//   onClose,
//   isVisible,
//   handleSubmit,
//   logos,
//   Close_Icon,
// }: any) => {
//   const [animationClass, setAnimationClass] = useState("");
//   const [showModal, setShowModal] = useState(isVisible);

//   const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
//   const [videoImageURL, setVideoImageURL] = useState<string | null>(null);

//   useEffect(() => {
//     if (isVisible) {
//       setShowModal(true);
//       setTimeout(() => setAnimationClass("modal-enter-active"), 100);
//     } else {
//       setAnimationClass("modal-exit-active");
//       const timer = setTimeout(() => setShowModal(false), 200);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible]);

//   const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files?.length) return;
//     const file = e.target.files[0];
//     setUploadedCoverFile(file);
//     setCoverImageURL(URL.createObjectURL(file));
//   };

//   const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files?.length) return;
//     const file = e.target.files[0];
//     setUploadedVideoFile(file);
//     setVideoImageURL(URL.createObjectURL(file));
//   };

//   const resetCoverImage = () => {
//     setUploadedCoverFile(null);
//     setCoverImageURL(null);
//   };

//   const resetVideo = () => {
//     setUploadedVideoFile(null);
//     setVideoImageURL(null);
//   };

//   const handleModalClose = () => {
//     onClose();
//     resetCoverImage();
//     resetVideo();
//   };

//   return (
//     <>
//       {showModalAddVideos && (
//         <Modal
//           isVisible={isVisible}
//           animate={animationClass}
//           variant={variant}
//           auth
//           className="w-[45%] h-[92%] backdrop-blur-xl bg-white rounded-3xl shadow-2xl"
//           onClose={handleModalClose}
//           logos={logos}
//           headerProps={{
//             ColorText: "#fff",
//             bgColor: "#1E40AF",
//             title: "اضافه کردن ویدیو",
//             Close_Icon: Close_Icon,
//           }}
//         >
//           {/* Header */}
//           {/* <div className="w-full px-8 py-3  rounded-t-3xl text-">
//             <h2 className="text-xl font-bold">🎬 افزودن ویدیوی جدید</h2>
//             <p className="text-sm opacity-80 mt-1">
//               اطلاعات و فایل‌های ویدیو را بارگذاری کنید
//             </p>
//           </div> */}

//           <Formik
//             initialValues={{ title: "", description: "" }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting, errors, touched }) => (
//               <Form className="p-6 flex flex-col gap-6 h-full overflow-auto">
//                 {/* Top Section */}
//                 <div className="grid grid-cols-3 gap-6">
//                   {/* Cover Upload */}
//                   <div className="col-span-1">
//                     {!coverImageURL ? (
//                       <label className="group cursor-pointer h-48 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 hover:border-[#007C9A] transition">
//                         <Icons name="IconImageDropDown" width="50" height="50" />
//                         <span className="text-sm text-gray-500">
//                           آپلود کاور ویدیو
//                         </span>
//                         <input hidden type="file" accept="image/*" onChange={handleCoverFileUpload} />
//                       </label>
//                     ) : (
//                       <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
//                         <button
//                           type="button"
//                           onClick={resetCoverImage}
//                           className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow"
//                         >
//                           <X />
//                         </button>
//                         <img
//                           src={coverImageURL}
//                           className="w-full h-full object-cover"
//                           alt="cover"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {/* Inputs */}
//                   <div className="col-span-2 flex flex-col gap-4">
//                     <Field
//                       as={Input}
//                       id="title"
//                       name="title"
//                       placeholder="عنوان ویدیو"
//                       error={touched.title && Boolean(errors.title)}
//                       bgcolor="#F1F5F9"
//                       height="48px"
//                       borderradius="14px"
//                     />

//                     <Field
//                       as="textarea"
//                       id="description"
//                       name="description"
//                       placeholder="توضیحات ویدیو..."
//                       className={`h-32 rounded-2xl bg-[#F1F5F9] p-4 resize-none outline-none ${touched.description && errors.description
//                         ? "border border-red-500"
//                         : "border border-transparent"
//                         }`}
//                     />
//                   </div>
//                 </div>

//                 {/* Video Upload */}
//                 <div className="w-full">
//                   {!videoImageURL ? (
//                     <label className="cursor-pointer h-56 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 hover:border-[#007C9A] transition">
//                       <Icons name="Videos" width="60" height="60" />
//                       <span className="text-sm text-gray-500">آپلود فایل ویدیو</span>
//                       <input hidden type="file" accept="video/*" onChange={handleVideoFileUpload} />
//                     </label>
//                   ) : (
//                     <div className="relative rounded-2xl overflow-hidden shadow-xl">
//                       <button
//                         type="button"
//                         onClick={resetVideo}
//                         className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow"
//                       >
//                         <X />
//                       </button>
//                       <VideoPlayers
//                         src={videoImageURL}
//                         cover={coverImageURL}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-4 pt-4">
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 cursor-pointer h-12 rounded-xl bg-linear-to-r from-[#007C9A] to-[#00B4D8] text-white font-bold shadow-lg"
//                   >
//                     {isSubmitting ? <span className="loader"></span> : "🚀 ایجاد ویدیو"}
//                   </Button>

//                   <Button
//                     type="button"
//                     onClick={handleModalClose}
//                     className="flex-1 h-12 rounded-xl bg-gray-200"
//                   >
//                     بازگشت
//                   </Button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default AddVideos;

// 'use client';

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import * as yup from "yup";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// import VideoPlayers from "../videoplayers";
// import { Input, TextArea } from "@/app/components/Input";
// import { Button } from "@/app/components/button/Button";
// import { X, Upload, ImageIcon, VideoIcon, Save, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

// const validationSchema = yup.object().shape({
//   title: yup.string().required("وارد کردن عنوان الزامی است"),
//   description: yup.string().required("توضیحات را وارد کنید"),
// });

// interface AddVideosProps {
//   showModalAddVideos: boolean;
//   variant?: string;
//   uploadedCoverFile: File | null;
//   setUploadedCoverFile: (file: File | null) => void;
//   uploadedVideoFile: File | null;
//   setUploadedVideoFile: (file: File | null) => void;
//   onClose: () => void;
//   isVisible: boolean;
//   handleSubmit: (values: any, helpers: any) => void;
//   logos?: React.ReactNode;
//   Close_Icon?: React.ReactNode;
//   isSubmitting?: boolean;
// }

// const AddVideos = ({
//   showModalAddVideos,
//   variant,
//   uploadedCoverFile,
//   setUploadedCoverFile,
//   uploadedVideoFile,
//   setUploadedVideoFile,
//   onClose,
//   isVisible,
//   handleSubmit,
//   logos,
//   Close_Icon,
//   isSubmitting = false,
// }: AddVideosProps) => {
//   const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
//   const [videoImageURL, setVideoImageURL] = useState<string | null>(null);

//   useEffect(() => {
//     if (uploadedCoverFile) {
//       setCoverImageURL(URL.createObjectURL(uploadedCoverFile));
//     } else {
//       setCoverImageURL(null);
//     }
//   }, [uploadedCoverFile]);

//   useEffect(() => {
//     if (uploadedVideoFile) {
//       setVideoImageURL(URL.createObjectURL(uploadedVideoFile));
//     } else {
//       setVideoImageURL(null);
//     }
//   }, [uploadedVideoFile]);

//   const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
//     if (!e.target.files?.length) return;
//     const file = e.target.files[0];
//     setUploadedCoverFile(file);
//     setFieldValue('coverFile', file);
//   };

//   const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
//     if (!e.target.files?.length) return;
//     const file = e.target.files[0];
//     setUploadedVideoFile(file);
//     setFieldValue('videoFile', file);
//   };

//   const resetCoverImage = (setFieldValue: any) => {
//     setUploadedCoverFile(null);
//     setFieldValue('coverFile', null);
//   };

//   const resetVideo = (setFieldValue: any) => {
//     setUploadedVideoFile(null);
//     setFieldValue('videoFile', null);
//   };

//   const handleModalClose = () => {
//     onClose();
//   };

//   if (!showModalAddVideos) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
//         onClick={handleModalClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, y: 20 }}
//           animate={{ scale: 1, y: 0 }}
//           exit={{ scale: 0.9, y: 20 }}
//           className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
//             <div className="flex items-center gap-3">
//               <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500">
//                 <VideoIcon size={24} className="text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">افزودن ویدیوی جدید</h2>
//                 <p className="text-gray-500 text-sm">ایجاد ویدیوی جدید در سیستم</p>
//               </div>
//             </div>
//             <button
//               onClick={handleModalClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X size={24} className="text-gray-500" />
//             </button>
//           </div>

//           <Formik
//             initialValues={{ title: "", description: "", coverFile: null, videoFile: null }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ errors, touched, setFieldValue, values }) => (
//               <Form className="p-6 space-y-6">
//                 {/* بخش آپلود تصویر کاور */}
//                 <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
//                   <label className="cursor-pointer w-full">
//                     <div className="flex flex-col items-center">
//                       {coverImageURL ? (
//                         <div className="relative w-full max-w-md">
//                           <img
//                             src={coverImageURL}
//                             alt="Cover Preview"
//                             className="w-full h-48 object-cover rounded-xl"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => resetCoverImage(setFieldValue)}
//                             className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
//                             <ImageIcon size={32} className="text-blue-500" />
//                           </div>
//                           <p className="text-gray-700 font-medium mb-2">
//                             تصویر کاور ویدیو را آپلود کنید
//                           </p>
//                           <p className="text-gray-500 text-sm mb-4">
//                             فرمت‌های مجاز: JPG، PNG، GIF (حداکثر 5MB)
//                           </p>
//                           <span className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-colors">
//                             انتخاب فایل
//                           </span>
//                         </>
//                       )}
//                       <input
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={(e) => handleCoverFileUpload(e, setFieldValue)}
//                       />
//                     </div>
//                   </label>
//                 </div>

//                 {/* بخش آپلود فایل ویدیو */}
//                 <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
//                   <label className="cursor-pointer w-full">
//                     <div className="flex flex-col items-center">
//                       {videoImageURL ? (
//                         <div className="relative w-full">
//                           <button
//                             type="button"
//                             onClick={() => resetVideo(setFieldValue)}
//                             className="absolute top-2 right-2 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
//                           >
//                             <X size={16} />
//                           </button>
//                           <div className="bg-gray-900 rounded-xl overflow-hidden">
//                             <VideoPlayers
//                               src={videoImageURL}
//                               cover={coverImageURL || undefined}
//                             />
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
//                             <VideoIcon size={32} className="text-purple-500" />
//                           </div>
//                           <p className="text-gray-700 font-medium mb-2">
//                             فایل ویدیو را آپلود کنید
//                           </p>
//                           <p className="text-gray-500 text-sm mb-4">
//                             فرمت‌های مجاز: MP4، MOV، AVI (حداکثر 500MB)
//                           </p>
//                           <span className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
//                             انتخاب فایل
//                           </span>
//                         </>
//                       )}
//                       <input
//                         type="file"
//                         className="hidden"
//                         accept="video/*"
//                         onChange={(e) => handleVideoFileUpload(e, setFieldValue)}
//                       />
//                     </div>
//                   </label>
//                 </div>

//                 {/* فرم اطلاعات */}
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       عنوان ویدیو *
//                     </label>
//                     <Field
//                       name="title"
//                       type="text"
//                       as={Input}
//                       variant="form"
//                       rounded="xl"
//                       inputSize="lg"
//                       error={touched.title && errors.title}
//                       placeholder="عنوان ویدیو را وارد کنید..."
//                     />
//                     <ErrorMessage name="title">
//                       {(msg) => (
//                         <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={14} />
//                           {msg}
//                         </p>
//                       )}
//                     </ErrorMessage>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       توضیحات ویدیو *
//                     </label>
//                     <Field
//                       as={TextArea}
//                       name="description"
//                       rows={4}
//                       rounded="xl"
//                       inputSize="lg"
//                       error={touched.description && errors.description}
//                       placeholder="توضیحات کامل ویدیو را اینجا بنویسید..."
//                     />
//                     <ErrorMessage name="description">
//                       {(msg) => (
//                         <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                           <AlertCircle size={14} />
//                           {msg}
//                         </p>
//                       )}
//                     </ErrorMessage>
//                   </div>
//                 </div>

//                 {/* دکمه‌های اقدام */}
//                 <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={handleModalClose}
//                     className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     انصراف
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-8 py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center gap-2"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 size={20} className="animate-spin" />
//                         <span>در حال ایجاد...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Save size={20} />
//                         <span>ایجاد ویدیو</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default AddVideos;

'use client';

import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import VideoPlayers from "../videoplayers";
import { Input, TextArea } from "@/app/components/Input";
import Modal from "@/app/components/Modal";
import { X, Upload, ImageIcon, VideoIcon, Save, AlertCircle, Loader2 } from "lucide-react";

const validationSchema = yup.object().shape({
  title: yup.string().required("وارد کردن عنوان الزامی است"),
  description: yup.string().required("توضیحات را وارد کنید"),
});

interface AddVideosProps {
  showModalAddVideos: boolean;
  variant?: string;
  uploadedCoverFile: File | null;
  setUploadedCoverFile: (file: File | null) => void;
  uploadedVideoFile: File | null;
  setUploadedVideoFile: (file: File | null) => void;
  onClose: () => void;
  isVisible: boolean;
  handleSubmit: (values: any, helpers: any) => void;
  logos?: React.ReactNode;
  Close_Icon?: React.ReactNode;
  isSubmitting?: boolean;
}

const AddVideos = ({
  showModalAddVideos,
  variant = "addchargemodal",
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
}: AddVideosProps) => {
  const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
  const [videoImageURL, setVideoImageURL] = useState<string | null>(null);

  useEffect(() => {
    if (uploadedCoverFile) {
      if (coverImageURL?.startsWith('blob:')) {
        URL.revokeObjectURL(coverImageURL);
      }
      const url = URL.createObjectURL(uploadedCoverFile);
      setCoverImageURL(url);
    } else {
      setCoverImageURL(null);
    }

    return () => {
      if (coverImageURL?.startsWith('blob:')) {
        URL.revokeObjectURL(coverImageURL);
      }
    };
  }, [uploadedCoverFile]);

  useEffect(() => {
    if (uploadedVideoFile) {
      if (videoImageURL?.startsWith('blob:')) {
        URL.revokeObjectURL(videoImageURL);
      }
      const url = URL.createObjectURL(uploadedVideoFile);
      setVideoImageURL(url);
    } else {
      setVideoImageURL(null);
    }

    return () => {
      if (videoImageURL?.startsWith('blob:')) {
        URL.revokeObjectURL(videoImageURL);
      }
    };
  }, [uploadedVideoFile]);

  useEffect(() => {
    if (!isVisible) {
      if (coverImageURL?.startsWith('blob:')) {
        URL.revokeObjectURL(coverImageURL);
      }
      if (videoImageURL?.startsWith('blob:')) {
        URL.revokeObjectURL(videoImageURL);
      }
      setUploadedCoverFile(null);
      setUploadedVideoFile(null);
      setCoverImageURL(null);
      setVideoImageURL(null);
    }
  }, [isVisible]);

  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setUploadedCoverFile(file);
    setFieldValue('coverFile', file);
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setUploadedVideoFile(file);
    setFieldValue('videoFile', file);
  };

  const resetCoverImage = (setFieldValue: any) => {
    if (coverImageURL?.startsWith('blob:')) {
      URL.revokeObjectURL(coverImageURL);
    }
    setUploadedCoverFile(null);
    setCoverImageURL(null);
    setFieldValue('coverFile', null);
  };

  const resetVideo = (setFieldValue: any) => {
    if (videoImageURL?.startsWith('blob:')) {
      URL.revokeObjectURL(videoImageURL);
    }
    setUploadedVideoFile(null);
    setVideoImageURL(null);
    setFieldValue('videoFile', null);
  };

  const handleModalClose = () => {
    onClose();
  };

  if (!showModalAddVideos) return null;

  const headerProps = {
    title: "🎬 افزودن ویدیوی جدید",
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
      <Formik
        initialValues={{ title: "", description: "", coverFile: null, videoFile: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
              <label className="cursor-pointer w-full">
                <div className="flex flex-col items-center">
                  {coverImageURL ? (
                    <div className="relative w-full max-w-md">
                      <img
                        src={coverImageURL}
                        alt="Cover Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => resetCoverImage(setFieldValue)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="حذف تصویر"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                        <ImageIcon size={32} className="text-blue-500" />
                      </div>
                      <p className="text-gray-700 font-medium mb-2">
                        تصویر کاور ویدیو را آپلود کنید
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        فرمت‌های مجاز: JPG، PNG، GIF (حداکثر 5MB)
                      </p>
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

            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
              <label className="cursor-pointer w-full">
                <div className="flex flex-col items-center">
                  {videoImageURL ? (
                    <div className="relative w-full">
                      <button
                        type="button"
                        onClick={() => resetVideo(setFieldValue)}
                        className="absolute top-2 right-2 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="حذف ویدیو"
                      >
                        <X size={16} />
                      </button>
                      <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <VideoPlayers
                          src={videoImageURL}
                          cover={coverImageURL || undefined}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                        <VideoIcon size={32} className="text-purple-500" />
                      </div>
                      <p className="text-gray-700 font-medium mb-2">
                        فایل ویدیو را آپلود کنید
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        فرمت‌های مجاز: MP4، MOV، AVI (حداکثر 500MB)
                      </p>
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

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleModalClose}
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
                    <span>در حال ایجاد...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>ایجاد ویدیو</span>
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddVideos;