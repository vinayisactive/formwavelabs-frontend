"use client";
import { FormElemetInstance } from "@/utility/ts-types";
import { TextAreaCustomInstance } from "./text-area-prop-attributes";
import { FC, useState } from "react";
import useElements from "@/utility/useElements-hook";

import { TextCursorInput, HelpCircle, ListChecks } from "lucide-react";

import {
  InputTile,
  PropertiesFooter,
  PropertiesHeader,
  PropertiesWrapper,
  RequiredCheckTile,
} from "../property-reusable-comp";

interface TextAreaPropertiesComponentInterface {
  elementInstance: FormElemetInstance;
}

const TextAreaPropertiesComponent: FC<TextAreaPropertiesComponentInterface> = ({
  elementInstance,
}) => {
  const currentElement = elementInstance as TextAreaCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    currentElement.extraAttributes
  );
  const { updateElementInstance, setSelectedElementInstance } = useElements();

  const handleInputChange = (
    key: keyof typeof currentElement.extraAttributes,
    value: string | boolean
  ) => {
    setExtraAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const updatedElement = {
      ...currentElement,
      extraAttributes,
    };

    updateElementInstance(currentElement.id, updatedElement);
    setSelectedElementInstance(null);
  };

  return (
    <PropertiesWrapper>
      <PropertiesHeader
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
          onChange={(value) => handleInputChange("label", value)}
          placeholder="Enter field label"
        />

        <InputTile
          icon={HelpCircle}
          label="Helper Text"
          value={extraAttributes.helperText}
          onChange={(value) => handleInputChange("helperText", value)}
          placeholder="Enter helper text"
          helperText="Appears below the input field"
        />

        <InputTile
          icon={TextCursorInput}
          label="Placeholder Text"
          value={extraAttributes.placeholder}
          onChange={(value) => handleInputChange("placeholder", value)}
          placeholder="Enter placeholder text"
        />

        <RequiredCheckTile
          icon={ListChecks}
          label="Required Field"
          checked={extraAttributes.required}
          onChange={(checked) => handleInputChange("required", checked)}
          helperText="User must provide value to submit form"
        />
      </div>

      <PropertiesFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </PropertiesWrapper>
  );
};

export default TextAreaPropertiesComponent;
