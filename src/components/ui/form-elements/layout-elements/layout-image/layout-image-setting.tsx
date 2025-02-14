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
import { Image, Loader, TextCursorInputIcon, X } from "lucide-react";
import useElements from "@/utility/useElements-hook";
import { LayoutImageCustomInstance } from "./layout-image-prop-attributes";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";
import ImageKitFileUpload from "@/components/ui/imagekit-file-uploader";
import axios from "axios";
import { handleAxiosError } from "@/utility/axios-err-handler";

const LayoutImageSetting: FC<FormElementProps> = ({ elementInstance }) => {
  const element = elementInstance as LayoutImageCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const handleChange = createUpdateSettingHandler(setExtraAttributes);

  const handleSave = () => {
    const updatedElement = {
      ...element,
      extraAttributes,
    };

    updateElementInstance(element.id, updatedElement);
    setSelectedElementInstance(null);
  };

  const handleRemoveUrl = async () => {
    const [, fileId] = extraAttributes.url?.split("::") as [string, string];

    try {
      setErrorMsg(null);
      setIsLoading(true);

      await axios.delete("/api/imagekit-auth", {
        data: {
          fileId,
        },
      });

      setIsLoading(false);
      handleChange("url", "");
    } catch (error) {
      setErrorMsg(handleAxiosError(error));
      setIsLoading(false);
    }
  };

  return (
    <SettingWrapper>
      <SettingHeader
        title="Layout Image setting"
        description="Upload an image"
        icon={Image}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Image layout name"
        icon={TextCursorInputIcon}
        value={extraAttributes.label}
        onChange={(value) => handleChange("label", value)}
      />

      {extraAttributes.url && (
        <p className="border px-2 border-black flex justify-between items-center overflow-hidden text-ellipsis whitespace-nowrap">
          {extraAttributes.url?.split("::")[0]}
          <span onClick={handleRemoveUrl}>
            {isLoading ? <Loader className="animate-spin" /> : <X />}
          </span>
        </p>
      )}

      {!extraAttributes.url && (
        <ImageKitFileUpload
          fileType="image"
          onSuccess={(res) => handleChange("url", `${res.url}::${res.fileId}`)}
        />
      )}

      {errorMsg && <p>{errorMsg}</p>}

      <SelectTile
        label="Image Sizes"
        placeholder="Select image sizes"
        options={extraAttributes.height}
        value={extraAttributes.selectedHeight}
        icon={Image}
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
