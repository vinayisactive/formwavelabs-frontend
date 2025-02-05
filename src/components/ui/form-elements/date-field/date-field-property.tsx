"use client"

import { FC, useState } from "react";
import { DateFieldCustomElement } from "./date-prop-attributes";
import {
    FormElementPropertyProps,
  InputTile,
  PropertiesFooter,
  PropertiesHeader,
  PropertiesWrapper,
  RequiredCheckTile,
} from "../property-reusable-comp";
import { Calendar, HelpCircle, ListCheck, TextCursorInputIcon } from "lucide-react";
import useElements from "@/utility/useElements-hook";



const DateFieldPropertyComp: FC<FormElementPropertyProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as DateFieldCustomElement;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );

  const { setSelectedElementInstance, updateElementInstance } = useElements();

  const changeHandler = (
    key: keyof typeof element.extraAttributes,
    value: string | boolean
  ) => {
    setExtraAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveHandler = () => {
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
        onChange={(value) => changeHandler("label", value)}
      />

      <InputTile
        icon={HelpCircle}
        label="edit helper text"
        helperText="Edit on your own"
        value={extraAttributes.helperText}
        placeholder="helper text"
        onChange={(value) => changeHandler("helperText", value)}
      />

      <RequiredCheckTile
        icon={ListCheck}
        label="Required Field"
        checked={extraAttributes.required}
        onChange={(checked) => changeHandler("required", checked)}
        helperText="User must provide value to submit form"
      />

      <PropertiesFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={saveHandler}
      />
    </PropertiesWrapper>
  );
};

export default DateFieldPropertyComp;
