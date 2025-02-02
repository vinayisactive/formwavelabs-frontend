import {
  HelpCircle,
  ListCheck,
  TextCursorInputIcon,
  ToggleLeft,
} from "lucide-react";
import {
  InputTile,
  PropertiesFooter,
  PropertiesHeader,
  PropertiesWrapper,
  RequiredCheckTile,
} from "../property-reusable-comp";
import useElements from "@/utility/useElements-hook";
import { FormElemetInstance } from "@/utility/ts-types";
import { CheckboxCustomInstance } from "./checkbox-prop-attributes";
import { useState } from "react";

const CheckBoxPropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElemetInstance;
}) => {
  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const element = elementInstance as CheckboxCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );

  const handleChange = (
    key: keyof typeof element.extraAttributes,
    value: boolean | string
  ) => {
    setExtraAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const updatedElement = {
      ...element,
      extraAttributes,
    };

    updateElementInstance(element.id, updatedElement);
    setSelectedElementInstance(null);
  };

  return (
    <PropertiesWrapper>
      <PropertiesHeader
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

      <PropertiesFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </PropertiesWrapper>
  );
};

export default CheckBoxPropertiesComponent;
