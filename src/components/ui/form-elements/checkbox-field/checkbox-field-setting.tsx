import {
  HelpCircle,
  ListCheck,
  TextCursorInputIcon,
  ToggleLeft,
} from "lucide-react";
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

const CheckBoxSetting: FC<FormElementProps> = ({elementInstance}) => {
  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const element = elementInstance as CheckboxCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(element.extraAttributes);

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
        title="Checkbox setting"
        description="Tune the settings"
        icon={ToggleLeft}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        icon={TextCursorInputIcon}
        label="label"
        value={extraAttributes.label}
        onChange={(value) => handleChange("label", value)}
      />

      <InputTile
        icon={HelpCircle}
        label="helper text"
        value={extraAttributes.helperText}
        onChange={(value) => handleChange("helperText", value)}
      />

      <RequiredCheckTile
        label="Required"
        helperText="Must be check before submiting"
        onChange={(value) => handleChange("required", value)}
        icon={ListCheck}
        checked={extraAttributes.required}
      />

      <SettingFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </SettingWrapper>
  );
};

export default CheckBoxSetting;
