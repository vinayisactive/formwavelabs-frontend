"use client";
import { FormElementProps } from "@/utility/ts-types";
import { FC, useState } from "react";
import {
  InputTile,
  SelectTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../../elements-reusable-comp";
import { Loader2 } from "lucide-react";
import useElements from "@/utility/useElements-hook";
import { LayoutImageCustomInstance } from "./layout-image-prop-attributes";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";
import { useQuery } from "@tanstack/react-query";
import WorkspaceAsset from "@/components/ui/workspace/workspace-asset";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const LayoutImageSetting: FC<FormElementProps> = ({
  elementInstance,
  workspaceId,
}) => {
  const element = elementInstance as LayoutImageCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );
  const session = useSession().data;


  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const handleChange = createUpdateSettingHandler(setExtraAttributes);

  const [selectImage, setSelectedImage] = useState<string| null>(null)

  const handleSave = () => {
    const updatedElement = {
      ...element,
      extraAttributes,
    };

    updateElementInstance(element.id, updatedElement);
    setSelectedElementInstance(null);
  };

  const { data: workspaceAssets, isLoading } = useQuery({
    queryKey: ["workspaceAssets"],
    queryFn: async () => {
      const { data } = await axios.get<{ data: WorkspaceAsset[] }>(
        `https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/workspaces/${workspaceId}/assets`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  return (
    <SettingWrapper>
      <SettingHeader
        title="Layout image setting"
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Layout Image label"
        placeholder="label..."
        value={extraAttributes.label}
        onChange={(value) => handleChange("label", value)}
      />

      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 size={20} className="animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {workspaceAssets?.data.map((asset) => (
              <div
                key={asset.id}
                className={`group relative aspect-square cursor-pointer rounded-md overflow-hidden ${selectImage === asset.id ? "border-4 border-blue-400 p-2" : "border border-gray-200"} hover:border-blue-400 transition-all`}
                onClick={() =>{ 
                  setSelectedImage(asset.id)
                  handleChange("url", asset.imageUrl)
                }}
              >
                <Image
                  src={asset.imageUrl}
                  alt="Workspace asset"
                  fill
                  sizes="(max-width: 768px) 100px, 150px"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  quality={60}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>

      <SelectTile
        label="Image Sizes"
        placeholder="Select image sizes"
        options={extraAttributes.height}
        value={extraAttributes.selectedHeight}
        onChange={(value) => handleChange("selectedHeight", value)}
      />

      <SettingFooter
        onSave={handleSave}
        onCancel={() => setSelectedElementInstance(null)}
      />
    </SettingWrapper>
  );
};

export default LayoutImageSetting;
