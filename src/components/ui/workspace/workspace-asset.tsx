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

const WorkspaceAssetHeader: FC<{
  workspaceName?: string;
  onClose: () => void;
}> = ({ workspaceName, onClose }) => (
  <div className="flex justify-between items-start px-5 pt-5">
    <div className="mb-2 space-y-3">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6 text-black" />
        <h1 className="text-2xl font-bold text-black">Workspace assets</h1>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 pr-4 w-max rounded-xl bg-green-200 text-black">
        <div className="w-2 h-2 bg-green-600 rounded-full" />
        <p className="text-xs font-medium text-gray-700">{workspaceName}</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="p-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
    >
      <X size={18} />
    </button>
  </div>
);

const AssetItem: FC<{
  asset: WorkspaceAsset;
  isDeleting: boolean;
  onDelete: (assetId: string) => void;
  isSelected: boolean;
  onSelect: (assetId: string | null) => void;
}> = ({ asset, isDeleting, onDelete, isSelected, onSelect }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(asset.id);
  };

  return (
    <div
      className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
      onClick={() => onSelect(asset.id)}
    >
      <Image
        src={asset.imageUrl}
        alt="Workspace asset"
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover rounded-lg transition-opacity hover:opacity-90"
      />

      {isSelected && (
        <div
          className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(null);
          }}
        >
          <button
            className="p-2 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-colors border-2 border-gray-100"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="text-gray-600 animate-spin" size={17} />
            ) : (
              <Trash2 className="text-black" size={17} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const AssetGrid: FC<{
  assets: WorkspaceAsset[];
  deletingAssets: string[];
  onAssetDelete: (assetId: string) => void;
  selectedAssetId: string | null;
  setSelectedAssetId: (id: string | null) => void;
}> = ({
  assets,
  deletingAssets,
  onAssetDelete,
  selectedAssetId,
  setSelectedAssetId,
}) => (
  <div className="grid grid-cols-4 gap-3">
    {assets.map((asset) => (
      <AssetItem
        key={asset.id}
        asset={asset}
        isDeleting={deletingAssets.includes(asset.id)}
        onDelete={onAssetDelete}
        isSelected={selectedAssetId === asset.id}
        onSelect={(id) => setSelectedAssetId(id)}
      />
    ))}
  </div>
);

const UploadSection: FC<{
  wsId: string;
  assetCount: number;
  onUploadComplete: (data: SaveAssetType) => void;
}> = ({ wsId, assetCount, onUploadComplete }) => (
  <>
    {assetCount === 10 ? (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/20 text-black/50">
        <Ban className="w-5 h-5" />
        <span className="text-sm font-medium">Limit reached</span>
      </div>
    ) : (
      <FileUploader
        fileType="IMAGE"
        type="WORKSPACE"
        id={wsId}
        onUploadComplete={onUploadComplete}
      />
    )}
  </>
);

const UsageStats: FC<{ assetCount: number }> = ({ assetCount }) => (
  <div className="flex flex-col gap-2 items-center justify-between text-sm text-gray-700">
    <span className="font-medium">{assetCount}/10 images used</span>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gray-900 transition-all duration-300"
        style={{ width: `${(assetCount / 10) * 100}%` }}
      />
    </div>
  </div>
);

const WorkspaceAsset: FC<WorkspaceAssetProps> = ({
  workspaceName,
  wsId,
  setAssetModal,
}) => {
  const session = useSession().data;
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [deletingAssets, setDeletingAssets] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: workspaceAssets, isLoading } = useQuery({
    queryKey: ["workspaceAssets"],
    queryFn: async () => {
      const { data } = await axios.get<{ data: WorkspaceAsset[] }>(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/assets`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
      return data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const handleAssetDelete = useMutation({
    mutationFn: async (assetId: string) => {
      setDeletingAssets((prev) => [...prev, assetId]);
      await axios.delete(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/assets?assetId=${assetId}`,
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceAssets"] });
    },
    onSettled: (_, __, assetId) => {
      setDeletingAssets((prev) => prev.filter((id) => id !== assetId));
      setSelectedAssetId(null);
    },
    onError: (error: AxiosError) => console.log(handleAxiosError(error)),
  });

  const handleAssetUpload = useMutation({
    mutationFn: async ({ assetUrl, assetPublicId }: SaveAssetType) => {
      await axios.post(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${wsId}/assets`,
        { assetUrl, assetPublicId },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceAssets"] });
    },
    onError: (error: AxiosError) => console.log(handleAxiosError(error)),
  });

  const assetCount = workspaceAssets?.data.length || 0;

  return (
    <div className="w-full max-w-xl h-full max-h-[70%] bg-white rounded-xl border border-gray-200 shadow-xl flex flex-col">
      <WorkspaceAssetHeader
        workspaceName={workspaceName}
        onClose={() => setAssetModal(false)}
      />

      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4">
            {workspaceAssets?.data && (
              <AssetGrid
                assets={workspaceAssets.data}
                deletingAssets={deletingAssets}
                onAssetDelete={(assetId) => handleAssetDelete.mutate(assetId)}
                selectedAssetId={selectedAssetId}
                setSelectedAssetId={setSelectedAssetId}
              />
            )}
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex justify-between items-center">
        <div className="w-1/2">
          <UploadSection
            wsId={wsId}
            assetCount={assetCount}
            onUploadComplete={(data) => handleAssetUpload.mutate(data)}
          />
        </div>

        <UsageStats assetCount={assetCount} />
      </div>
    </div>
  );
};

export default WorkspaceAsset;
