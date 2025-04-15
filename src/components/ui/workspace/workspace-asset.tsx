"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import FileUploader, { SaveAssetType } from "../file-uploader";
import { handleAxiosError } from "@/utility/axios-err-handler";
import { Loader2, LayoutDashboard, Ban, Trash2, X } from "lucide-react";
import Image from "next/image";

interface WorkspaceAsset {
  id: string;
  imageUrl: string;
  assetPublicId: string;
  createdAt: string;
}

interface WorkspaceAssetProps {
  workspaceName: string | undefined;
  wsId: string;
  setAssetModal: Dispatch<SetStateAction<boolean>>;
}

const WorkspaceAsset: FC<WorkspaceAssetProps> = ({workspaceName, wsId, setAssetModal}) => {
  const session = useSession().data;
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: workspaceAssets, isLoading } = useQuery({
    queryKey: ["workspaceAssets"],
    queryFn: async () => {
      const { data } = await axios.get<{ data: WorkspaceAsset[] }>(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/assets`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  const deleteWorkspaceAssetMutation = useMutation({
    mutationFn: async (assetId: string) => {
      await axios.delete(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/assets?assetId=${assetId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceAssets"] });
      setSelectedAssetId(null);
    },
    onError: (error: AxiosError) => console.log(handleAxiosError(error)),
  });

  const addWorkspaceAssetMutation = useMutation({
    mutationFn: async ({ assetUrl, assetPublicId }: SaveAssetType) => {
      await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/assets`,
        { assetUrl, assetPublicId },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceAssets"] });
    },
    onError: (error: AxiosError) => console.log(handleAxiosError(error)),
  });

  const assetCount = workspaceAssets?.data.length || 0;

  return (
    <div className="w-full max-w-xl h-full max-h-[70%] bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-800">
          <LayoutDashboard className="w-5 h-5" />
          <h3 className="font-medium">{workspaceName}</h3>
        </div>

        <div className="flex items-center gap-3">
          {!isLoading && (
            <div className="flex items-center gap-2">
              {workspaceAssets?.data.length === 10 ? (
                <div className="flex items-center gap-1 text-red-600">
                  <Ban className="w-5 h-5" />
                  <span className="text-sm">Limit reached</span>
                </div>
              ) : (
                <FileUploader
                  fileType="IMAGE"
                  type="WORKSPACE"
                  id={wsId}
                  onUploadComplete={(data) => addWorkspaceAssetMutation.mutate(data)}
                />
              )}
            </div>
          )}
          
          <button
            onClick={() => setAssetModal(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4">
            <div className="grid grid-cols-3 gap-4">
              {workspaceAssets?.data.map((asset) => (
                <div
                  key={asset.id}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedAssetId(asset.id)}
                >
                  <Image
                    src={asset.imageUrl}
                    alt="Workspace asset"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-lg transition-opacity hover:opacity-90"
                  />

                  {selectedAssetId === asset.id && (
                    <div
                      className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAssetId(null);
                      }}
                    >
                      <button
                        className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWorkspaceAssetMutation.mutate(asset.id);
                        }}
                      >
                        {deleteWorkspaceAssetMutation.isPending ? (
                          <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5 text-red-600" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{assetCount}/10 images used</span>
          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(assetCount / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceAsset;