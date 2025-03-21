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
import {
  FileCogIcon,
  FileDownIcon,
  HelpCircle,
  ListCheck,
  TextCursorInput,
} from "lucide-react";
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
        title="File uplaod element setting"
        icon={FileDownIcon}
        description="Tune up your uplaod element"
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="File uplaod label"
        helperText="edit for specific file"
        placeholder="type here..."
        value={extraAttributes.label}
        icon={TextCursorInput}
        onChange={(value) => handleChange("label", value)}
      />

      <InputTile
        label="helper text"
        helperText="appare down element"
        placeholder="type here..."
        value={extraAttributes.helperText}
        icon={HelpCircle}
        onChange={(value) => handleChange("helperText", value)}
      />

      <SelectTile
        label="Select file type"
        options={extraAttributes.fileTypes}
        icon={FileCogIcon}
        value={extraAttributes.selectedFileType}
        onChange={(value) => handleChange("selectedFileType", value)}
      />

      <RequiredCheckTile
        icon={ListCheck}
        label="Required Field"
        checked={extraAttributes.required}
        onChange={(checked) => handleChange("required", checked)}
        helperText="User must provide value to submit form"
      />

      <SettingFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </SettingWrapper>
  );
};

export default FileUploadSetting;
