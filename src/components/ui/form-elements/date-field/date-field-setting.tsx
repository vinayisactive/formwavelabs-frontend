"use client"

import { FC, useState } from "react";
import { DateFieldCustomElement } from "./date-prop-attributes";
import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import useElements from "@/utility/useElements-hook";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";



const DateSetting: FC<FormElementProps> = ({elementInstance}) => {
  const element = elementInstance as DateFieldCustomElement;
  const [extraAttributes, setExtraAttributes] = useState(element.extraAttributes);

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
        title="Date input setting"
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Date label"
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
        onSave={saveHandler}
      />
    </SettingWrapper>
  );
};

export default DateSetting;
