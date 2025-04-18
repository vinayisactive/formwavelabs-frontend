"use client";
import { TextAreaCustomInstance } from "./text-area-prop-attributes";
import { FC, useState } from "react";
import useElements from "@/utility/useElements-hook";
import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";

const TextAreaSetting: FC<FormElementProps> = ({ elementInstance }) => {
  const currentElement = elementInstance as TextAreaCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    currentElement.extraAttributes
  );
  const { updateElementInstance, setSelectedElementInstance } = useElements();

  const handleChange = createUpdateSettingHandler(setExtraAttributes);

  const handleSave = () => {
    const updatedElement = {
      ...currentElement,
      extraAttributes,
    };

    updateElementInstance(currentElement.id, updatedElement);
    setSelectedElementInstance(null);
  };

  return (
    <SettingWrapper>
      <SettingHeader
        title="TextArea field settings"
        onClose={() => setSelectedElementInstance(null)}
      />

      <div className="space-y-2">
        <InputTile
          label="Text-area label"
          value={extraAttributes.label}
          onChange={(value) => handleChange("label", value)}
          placeholder="label..."
        />

        <InputTile
          label="Placeholder"
          value={extraAttributes.placeholder}
          onChange={(value) => handleChange("placeholder", value)}
          placeholder="placeholder..."
        />

        <InputTile
          label="Helper"
          value={extraAttributes.helperText}
          onChange={(value) => handleChange("helperText", value)}
          placeholder="helper text..."
        />

        <RequiredCheckTile
          checked={extraAttributes.required}
          onChange={(checked) => handleChange("required", checked)}
        />
      </div>

      <SettingFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </SettingWrapper>
  );
};

export default TextAreaSetting;
