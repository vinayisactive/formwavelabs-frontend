import { FormElementProps } from "@/utility/ts-types";
import { FC, useState } from "react";
import { FileUploadCustomInstance } from "./file-upload-prop-attributes";
import {
  InputTile,
  RequiredCheckTile,
  SelectTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import useElements from "@/utility/useElements-hook";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";

const FileUploadSetting: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as FileUploadCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );
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

  return (
    <SettingWrapper>
      <SettingHeader
        title="Upload file setting"
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Upload file label"
        placeholder="label..."
        value={extraAttributes.label}
        onChange={(value) => handleChange("label", value)}
      />

      <InputTile
        label="Helper text"
        placeholder="type here..."
        value={extraAttributes.helperText}
        onChange={(value) => handleChange("helperText", value)}
      />

      <SelectTile
        label="Select file type"
        options={extraAttributes.fileTypes}
        value={extraAttributes.selectedFileType}
        onChange={(value) => handleChange("selectedFileType", value)}
      />

      <RequiredCheckTile
        checked={extraAttributes.required}
        onChange={(checked) => handleChange("required", checked)}
      />

      <SettingFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </SettingWrapper>
  );
};

export default FileUploadSetting;
