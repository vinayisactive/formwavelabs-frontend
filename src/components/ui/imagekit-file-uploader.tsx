"use client";
import React, { FC, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface ImagekitFileUploadProps {
  onSuccess?: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "pdf" | "video";
  className?: string
}

const ImageKitFileUpload: FC<ImagekitFileUploadProps> = ({
  onSuccess,
  onProgress,
  fileType = "image",
  className
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const maxSize = fileType === "pdf" ? 30 : fileType === "video" ? 50 : 10;

  const validateFile = (file: File) => {
    if (
      (fileType === "pdf" && file.type !== "application/pdf") ||
      (fileType === "image" && !file.type.startsWith("image/")) ||
      (fileType === "video" && !file.type.startsWith("video/"))
    ) {
      setError(`Invalid ${fileType} file`);
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File must be under ${maxSize}MB`);
      return false;
    }

    return true;
  };

  return (
    <div className="text-sm">
      <label className={`flex items-center gap-2 border p-2 cursor-pointer ${className}`}>
        <IKUpload
          className="hidden"
          fileName={fileType}
          validateFile={validateFile}
          onError={(e) => {
            setError(e.message);
            setIsUploading(false);
          }}
          onSuccess={(res) => {
            setIsUploading(false);
            setError("");
            onSuccess?.(res);
          }}
          onUploadProgress={(e) => {
            if (e.lengthComputable) {
              const p = Math.round((e.loaded / e.total) * 100);
              setProgress(p);
              onProgress?.(p);
            }
          }}
          onUploadStart={() => {
            setIsUploading(true);
            setError("");
          }}
        />

        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{progress}%</span>
          </>
        ) : (
          <span>Upload {fileType} (Max {maxSize}MB)</span>
        )}
      </label>
      
      {error && <div className="mt-1">{error}</div>}
    </div>
  );
};

export default ImageKitFileUpload;