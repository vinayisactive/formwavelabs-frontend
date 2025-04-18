import { FormElementProps } from "@/utility/ts-types";
import { FC, useState } from "react";
import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import useElements from "@/utility/useElements-hook";
import { EmailCustomInstance } from "./email-prop-attributes";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";

const EmailSetting: FC<FormElementProps> = ({ elementInstance }) => {
  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const element = elementInstance as EmailCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );

  const handleChange = createUpdateSettingHandler(setExtraAttributes); 

  const handleSave = () => {
    const updatedElement = {
      ...element,
      extraAttributes,
    };

    updateElementInstance(element.id, updatedElement);
    setSelectedElementInstance(null)
  };

  return (
    <SettingWrapper>
      <SettingHeader
        title="Email settings"
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Email label"
        value={extraAttributes.label}
        placeholder="label..."
        onChange={(value) => handleChange("label", value)}
      />

   <InputTile
        label="Placeholder"
        value={extraAttributes.placeHolder}
        placeholder="placeholder..."
        onChange={(value) => handleChange("placeHolder", value)}
      />

      <InputTile
        label="Edit helper text"
        value={extraAttributes.helperText}
        placeholder="helper text..."
        onChange={(value) => handleChange("helperText", value)}
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

export default EmailSetting;
