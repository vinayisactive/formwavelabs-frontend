"use client";
import { TextAreaCustomInstance } from "./text-area-prop-attributes";
import { FC, useState } from "react";
import useElements from "@/utility/useElements-hook";
import { TextCursorInput, HelpCircle, ListChecks } from "lucide-react";
import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";


const TextAreaSetting: FC<FormElementProps> = ({
  elementInstance,
}) => {
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
        title="TextArea Field Settings"
        description="Configure text area properties"
        onClose={() => setSelectedElementInstance(null)}
        icon={TextCursorInput}
      />

      <div className="space-y-2">
        <InputTile
          icon={TextCursorInput}
          label="Field Label"
          value={extraAttributes.label}
          onChange={(value) => handleChange("label", value)}
          placeholder="Enter field label"
        />

        <InputTile
          icon={HelpCircle}
          label="Helper Text"
          value={extraAttributes.helperText}
          onChange={(value) => handleChange("helperText", value)}
          placeholder="Enter helper text"
          helperText="Appears below the input field"
        />

        <InputTile
          icon={TextCursorInput}
          label="Placeholder Text"
          value={extraAttributes.placeholder}
          onChange={(value) => handleChange("placeholder", value)}
          placeholder="Enter placeholder text"
        />

        <RequiredCheckTile
          icon={ListChecks}
          label="Required Field"
          checked={extraAttributes.required}
          onChange={(checked) => handleChange("required", checked)}
          helperText="User must provide value to submit form"
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
