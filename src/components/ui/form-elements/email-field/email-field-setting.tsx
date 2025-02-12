import { FormElementProps } from "@/utility/ts-types";
import { FC, useState } from "react";
import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import { HelpCircle, ListCheck, Mail, TextCursorInput } from "lucide-react";
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
        description="Edit email form"
        icon={Mail}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Email label"
        helperText="Edit email label"
        value={extraAttributes.label}
        icon={TextCursorInput}
        placeholder="type..."
        onChange={(value) => handleChange("label", value)}
      />

   <InputTile
        label="Edit placeholder text"
        helperText=""
        value={extraAttributes.placeHolder}
        icon={HelpCircle}
        placeholder="place holder..."
        onChange={(value) => handleChange("placeHolder", value)}
      />

      <InputTile
        label="Edit helper text"
        helperText=""
        value={extraAttributes.helperText}
        icon={HelpCircle}
        placeholder="helper text..."
        onChange={(value) => handleChange("helperText", value)}
      />

      <RequiredCheckTile
        label="Must be check if required"
        checked={extraAttributes.required}
        onChange={(checked) => handleChange("required", checked)}
        icon={ListCheck}
      />

      <SettingFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </SettingWrapper>
  );
};

export default EmailSetting;
