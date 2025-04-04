"use client"
import { handleAxiosError } from "@/utility/axios-err-handler";
import axios, { AxiosProgressEvent } from "axios";
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
      <div className="w-full">
        <div className="flex items-center space-x-3">
          <label className="flex justify-center items-center px-4 py-2 bg-white text-blue-500 rounded-md border border-blue-500 cursor-pointer hover:bg-blue-50">
            <span>{file ? file.name : `Select ${fileType === "IMAGE" ? 'Image' : 'PDF'}`}</span>
            <input 
              type="file" 
              className="hidden" 
              accept={fileType === "IMAGE" ? 'image/*' : 'application/pdf'} 
              onChange={(e) => {
                e.stopPropagation(); 
                handleFileChange(e); 
              }}
              disabled={loading}
            />
          </label>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleUpload(); 
            }}
            disabled={!file || loading}
            className={`px-4 py-2 rounded-md ${
              !file || loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
        
        {loading && (
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500 text-right">{progress}%</div>
          </div>
        )}
      </div>
    );
};

export default FileUploader;