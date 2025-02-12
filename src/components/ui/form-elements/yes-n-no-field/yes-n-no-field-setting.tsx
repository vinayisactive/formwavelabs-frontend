import {
    HelpCircle,
    ListCheck,
    MousePointer2,
    TextCursorInputIcon,
  } from "lucide-react";
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
          title="Yes and No setting"
          description="Set Yes and No setting"
          icon={MousePointer2}
          onClose={() => setSelectedElementInstance(null)}
        />
  
        <InputTile
          label="Label for Yes and No"
          placeholder="type here..."
          helperText="enter label"
          value={extraAttributes.label}
          icon={TextCursorInputIcon}
          onChange={(value) => handleChange("label", value)}
        />
  
        <InputTile
          label="Helper text"
          placeholder="type here..."
          helperText="Helper text here "
          value={extraAttributes.helperText ?? ""}
          icon={HelpCircle}
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
  
  export default YesAndNoSetting;  