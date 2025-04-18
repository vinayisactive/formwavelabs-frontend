import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import useElements from "@/utility/useElements-hook";
import { CheckboxCustomInstance } from "./checkbox-prop-attributes";
import { FC, useState } from "react";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";

const CheckBoxSetting: FC<FormElementProps> = ({ elementInstance }) => {
  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const element = elementInstance as CheckboxCustomInstance;
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
    setSelectedElementInstance(null);
  };

  return (
    <SettingWrapper>
      <SettingHeader
        title="Check-box setting"
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Check-box label"
        value={extraAttributes.label}
        placeholder="label..."
        onChange={(value) => handleChange("label", value)}
      />

      <InputTile
        label="Helper text"
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

export default CheckBoxSetting;
