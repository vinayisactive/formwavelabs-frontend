"use client"
import { handleAxiosError } from "@/utility/axios-err-handler";
import axios, { AxiosProgressEvent } from "axios";
import { Folder, Upload } from "lucide-react";
import React, { FC, useState, ChangeEvent } from "react";

export interface SaveAssetType {
  assetUrl: string,
  assetPublicId: string
}

interface FileUploaderProps {
    fileType: "PDF" | "IMAGE";
    type: "FORM" | "WORKSPACE";
    id: string;
    onUploadComplete: ({assetUrl, assetPublicId}: SaveAssetType) => void; 
}

const FileUploader: FC<FileUploaderProps> = ({ fileType, type, id, onUploadComplete }) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        
        if (fileType === "IMAGE" && !selectedFile.type.startsWith('image/')) {
          setError('Please select an image file');
          return;
        }
        
        if (fileType === "PDF" && selectedFile.type !== 'application/pdf') {
          setError('Please select a PDF file');
          return;
        }
        
        setFile(selectedFile);
        setError(null);
    };
    
    const handleUpload = async () => {
        if (!file) {
          setError('Please select a file first');
          return;
        }
        
        setLoading(true);
        setProgress(0);
        setError(null);
        
        try {
          const { data: uploadData } = await axios.post('https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/media/signed-url', {
           fileType,
           type,
           id
          });
          
          const formData = new FormData();
          
          Object.keys(uploadData.data.formData).forEach(key => {
            if (key !== 'file') {
              formData.append(key, uploadData.data.formData[key]);
            }
          });
          
          formData.append('file', file);
          
          const response = await axios.post(uploadData.data.uploadUrl, formData, {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
              setProgress(percentCompleted);
            }
          });
          
         onUploadComplete({
            assetUrl: response.data.secure_url,
            assetPublicId: response.data.public_id
          });
          
          setFile(null);
        } catch (err) {
          console.error(handleAxiosError(err));
          setError('Failed to upload file. Please try again.');
        } finally {
          setLoading(false);
        }
    };

    return (
      <div className="w-full max-w-xs space-y-2">
        {!loading ? (
          <>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-xl border-2 border-gray-300 hover:border-black transition-colors">
                <Folder size={15} className="text-gray-700" />
                <span className="truncate max-w-[120px] text-gray-700 text-sm">
                  {file ? file.name : `Choose ${fileType}`}
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept={fileType === "IMAGE" ? 'image/*' : 'application/pdf'} 
                  onChange={handleFileChange}
                />
              </label>
              
              <button
                onClick={handleUpload}
                disabled={!file}
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                <Upload size={14} />
              </button>
            </div>
            {error && (
              <div className="text-red-600 text-xs font-medium px-2">{error}</div>
            )}
          </>
        ) : (
          <div className="space-y-1">
            <div className="text-xs text-gray-500 text-right">{progress}%</div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
};

export default FileUploader;