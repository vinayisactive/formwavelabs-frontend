"use client";
import React, { FC, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, FileImage, FileText, Video, CloudUpload, XCircle } from "lucide-react";

interface ImagekitFileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "pdf" | "video";
}

const ImageKitFileUpload: FC<ImagekitFileUploadProps> = ({
  onSuccess,
  onProgress,
  fileType = "image",
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>("");
  const [progress, setProgress] = useState(0);

  const handleError = (err: { message: string }) => {
    setErrMsg(err.message);
    setIsUploading(false);
    setProgress(0);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    setIsUploading(false);
    setErrMsg(null);
    setProgress(0);
    onSuccess(res);
  };

  const handleUploadProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      const roundedProgress = Math.round(percentComplete);
      setProgress(roundedProgress);
      onProgress(roundedProgress);
    }
  };

  const handleUploadStart = () => {
    setErrMsg(null);
    setIsUploading(true);
    setProgress(0);
  };

  const getTypeIcon = () => {
    switch (fileType) {
      case "pdf":
        return <FileText className="w-12 h-12 text-purple-500" />;
      case "video":
        return <Video className="w-12 h-12 text-blue-500" />;
      default:
        return <FileImage className="w-12 h-12 text-green-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (fileType) {
      case "pdf":
        return "PDF File";
      case "video":
        return "Video File";
      default:
        return "Image File";
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "pdf") {
      if (file.type !== "application/pdf") {
        setErrMsg("Please upload a PDF file");
        return false;
      }
      if (file.size > 30 * 1024 * 1024) {
        setErrMsg("File must be under 30MB");
        return false;
      }
      return true;
    } else if (fileType === "image") {
      if (!file.type.startsWith("image/")) {
        setErrMsg("Please upload an image file");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrMsg("Image must be under 10MB");
        return false;
      }
      return true; 
    } else if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setErrMsg("Please upload a video file");
        return false;
      }
      if (file.size > 50 * 1024 * 1024) {
        setErrMsg("Video must be under 50MB");
        return false;
      }
      return true; 
    }
    setErrMsg("Unsupported file type");
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <label
        className={`
          group relative flex flex-col items-center justify-center
          w-full h-64 border-4 border-dashed rounded-2xl
          transition-all cursor-pointer
          ${isDragging ? "border-purple-500 bg-purple-50/50" : "border-gray-300 hover:border-purple-300"}
          ${errMsg ? "border-red-500 bg-red-50/50" : ""}
          ${isUploading ? "opacity-75 pointer-events-none" : ""}
          bg-gradient-to-br from-white to-gray-50
          shadow-sm hover:shadow-md
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
      >
        <IKUpload
          className="hidden"
          fileName={fileType}
          useUniqueFileName={true}
          validateFile={validateFile}
          onError={handleError}
          onSuccess={handleSuccess}
          onUploadProgress={handleUploadProgress}
          onUploadStart={handleUploadStart}
        />

        <div className="flex flex-col items-center justify-center space-y-4 text-center px-8">
          {isUploading ? (
            <>
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
              <span className="text-gray-600 font-medium">
                Uploading... {progress}%
              </span>
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <CloudUpload className="w-16 h-16 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <div className="absolute -right-2 -bottom-2 bg-white p-1.5 rounded-full shadow-sm">
                  {getTypeIcon()}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Drag & Drop {getTypeLabel()}
                </h3>
                <p className="text-gray-500">
                  or{" "}
                  <span className="text-purple-600 font-medium hover:text-purple-700">
                    browse files
                  </span>{" "}
                  from your device
                </p>
                <div className="pt-4 text-sm text-gray-400">
                  <p>
                    Supported formats:{" "}
                    {fileType === "pdf" ? "PDF" 
                    : fileType === "video" ? "MP4, MOV, AVI" 
                    : "JPEG, PNG, GIF"}
                  </p>
                  <p>
                    Max size: {fileType === "pdf" ? "30MB" 
                    : fileType === "video" ? "50MB" 
                    : "10MB"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {!isUploading && isDragging && (
          <div className="absolute inset-0 bg-purple-500/5 backdrop-blur-sm rounded-2xl" />
        )}
      </label>

      {errMsg && (
        <div className="mt-4 flex items-center gap-2 text-red-600 animate-pulse">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{errMsg}</span>
        </div>
      )}

      {!isUploading && !errMsg && (
        <p className="mt-4 text-sm text-center text-gray-400">
          Secure cloud storage powered by{" "}
          <span className="text-purple-500 font-medium">ImageKit.io</span>
        </p>
      )}
    </div>
  );
};

export default ImageKitFileUpload;