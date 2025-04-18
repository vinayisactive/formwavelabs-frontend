  import {
    InputTile,
    RequiredCheckTile,
    SettingFooter,
    SettingHeader,
    SettingWrapper,
  } from "../elements-reusable-comp";
  import useElements from "@/utility/useElements-hook";
  import { YesAndNoFieldCustomInstance } from "./yes-n-no-prop-attributes";
  import { FC, useState } from "react";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";
  
  const YesAndNoSetting : FC<FormElementProps> = ({
    elementInstance,
  }) => {
    const element = elementInstance as YesAndNoFieldCustomInstance;
    const [extraAttributes, setExtraAttributes] = useState({
      ...element.extraAttributes,
    });
    const { setSelectedElementInstance, updateElementInstance } = useElements();
  
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
          title="Yes / No setting"
          onClose={() => setSelectedElementInstance(null)}
        />
  
        <InputTile
          label="Yes / No label"
          placeholder="label.."
          value={extraAttributes.label}
          onChange={(value) => handleChange("label", value)}
        />
  
        <InputTile
          label="Helper text"
          placeholder="helper text..."
          value={extraAttributes.helperText ?? ""}
          onChange={(value) => handleChange("helperText", value)}
        />
    
        <RequiredCheckTile
          onChange={(value) => handleChange("required", value)}
          checked={extraAttributes.required}
        />
  
        <SettingFooter
          onCancel={() => setSelectedElementInstance(null)}
          onSave={handleSave}
        />
      </SettingWrapper>
    );
  };
  
  export default YesAndNoSetting;  