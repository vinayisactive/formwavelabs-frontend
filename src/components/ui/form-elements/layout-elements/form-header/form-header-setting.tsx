import { FC, useState } from "react";
import {
  InputTile,
  SelectTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../../elements-reusable-comp";
import { FormHeaderCustomInstance } from "./form-header-prop-attributes";
import useElements from "@/utility/useElements-hook";
import {
  FileClockIcon,
  Layout,
  Text,
  TextCursorInput,
  Type,
} from "lucide-react";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";
import { FormElementProps } from "@/utility/ts-types";

const FormHeaderSetting: FC<FormElementProps> = ({ elementInstance }) => {
  const element = elementInstance as FormHeaderCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );

  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const handleChange = createUpdateSettingHandler(setExtraAttributes);

  const saveHandler = () => {
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
        title="Form header setting"
        description="Layout element"
        icon={Layout}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Form header"
        helperText="edit for header"
        placeholder="type here..."
        icon={TextCursorInput}
        onChange={(value) => handleChange("formHeader", value)}
        value={extraAttributes.formHeader}
      />

    <SelectTile
        label="Mobile font size"
        placeholder="Select font size"
        options={extraAttributes.fontSize}
        value={extraAttributes.selectedFontSizeForMobile}
        icon={FileClockIcon}
        onChange={(value) => handleChange("selectedFontSizeForMobile", value)}
      />

      <SelectTile
        label="Desktop font size"
        placeholder="Select font size"
        options={extraAttributes.fontSize}
        value={extraAttributes.selectedFontSizeForDesktop}
        icon={FileClockIcon}
        onChange={(value) => handleChange("selectedFontSizeForDesktop", value)}
      />

      <SelectTile
        label="Edit font Weight"
        placeholder="Select font weight"
        options={extraAttributes.fontWeight}
        value={extraAttributes.selectedFontWeight}
        icon={Type}
        onChange={(value) => handleChange("selectedFontWeight", value)}
      />

      <SelectTile
        label="Edit font Position"
        placeholder="Select position"
        options={extraAttributes.position}
        value={extraAttributes.selectedPosition}
        icon={Text}
        onChange={(value) => handleChange("selectedPosition", value)}
      />

      <SettingFooter
        onSave={saveHandler}
        onCancel={() => setSelectedElementInstance(null)}
      />
    </SettingWrapper>
  );
};

export default FormHeaderSetting;
