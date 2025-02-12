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
import { Calendar, HelpCircle, ListCheck, TextCursorInputIcon } from "lucide-react";
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
        title="Date field setting"
        description="Edit on your own"
        icon={Calendar}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        icon={TextCursorInputIcon}
        label="Date label"
        helperText="Edit on your own"
        value={extraAttributes.label}
        placeholder="label"
        onChange={(value) => handleChange("label", value)}
      />

      <InputTile
        icon={HelpCircle}
        label="edit helper text"
        helperText="Edit on your own"
        value={extraAttributes.helperText}
        placeholder="helper text"
        onChange={(value) => handleChange("helperText", value)}
      />

      <RequiredCheckTile
        icon={ListCheck}
        label="Required Field"
        checked={extraAttributes.required}
        onChange={(checked) => handleChange("required", checked)}
        helperText="User must provide value to submit form"
      />

      <SettingFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={saveHandler}
      />
    </SettingWrapper>
  );
};

export default DateSetting;
