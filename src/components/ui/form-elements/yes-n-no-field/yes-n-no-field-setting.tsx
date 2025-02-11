import {
    HelpCircle,
    ListCheck,
    MousePointer2,
    TextCursorInputIcon,
  } from "lucide-react";
  import {
    InputTile,
    PropertiesFooter,
    PropertiesHeader,
    PropertiesWrapper,
    RequiredCheckTile,
  } from "../property-reusable-comp";
  import useElements from "@/utility/useElements-hook";
  import { YesAndNoFieldCustomInstance } from "./yes-n-no-prop-attributes";
  import { FC, useState } from "react";
import { FormElementProps } from "@/utility/ts-types";
  
  const YesAndNoSetting : FC<FormElementProps> = ({
    elementInstance,
  }) => {
    const element = elementInstance as YesAndNoFieldCustomInstance;
    const [extraAttributes, setExtraAttributes] = useState({
      ...element.extraAttributes,
    });
    const { setSelectedElementInstance, updateElementInstance } = useElements();
  
    const changeHandler = (
      key: keyof typeof extraAttributes,
      value: string | boolean
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
      setSelectedElementInstance(null)
    };
  
    return (
      <PropertiesWrapper>
        <PropertiesHeader
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
          onChange={(value) => changeHandler("label", value)}
        />
  
        <InputTile
          label="Helper text"
          placeholder="type here..."
          helperText="Helper text here "
          value={extraAttributes.helperText ?? ""}
          icon={HelpCircle}
          onChange={(value) => changeHandler("helperText", value)}
        />
    
        <RequiredCheckTile
          label="Required"
          helperText="Must be check before submiting"
          onChange={(value) => changeHandler("required", value)}
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
  
  export default YesAndNoSetting;  