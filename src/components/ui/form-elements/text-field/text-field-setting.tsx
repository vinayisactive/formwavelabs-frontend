"use client";
import { TextCustomInstance } from "./text-prop-attributes";
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

const TextFieldSetting: FC<FormElementProps> = ({ elementInstance }) => {
  const currentElement = elementInstance as TextCustomInstance;
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
        title="Text field setting"
        onClose={() => setSelectedElementInstance(null)}
      />

      <div className="space-y-4">
        <InputTile
          label="Text-field label"
          value={extraAttributes?.label}
          onChange={(value) => handleChange("label", value)}
          placeholder="label..."
        />

        <InputTile
          label="Placeholder text"
          value={extraAttributes?.placeholder}
          onChange={(value) => handleChange("placeholder", value)}
        />

        <InputTile
          label="Helper text"
          value={extraAttributes?.helperText}
          onChange={(value) => handleChange("helperText", value)}
          placeholder="Enter helper text"
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

export default TextFieldSetting;
