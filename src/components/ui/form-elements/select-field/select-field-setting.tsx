"use client";

import { FC, useState } from "react";
import { selectFieldCustomInstance } from "./select-prop-attributes";
import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import { HelpCircle, ListCheck, MousePointer2, PenBoxIcon, X } from "lucide-react";
import useElements from "@/utility/useElements-hook";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";


const SelectSetting: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as selectFieldCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );
  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const [optionValue, setOptionValue] = useState<string>("");

  const handleChange = createUpdateSettingHandler(setExtraAttributes); 

  const handleOptionAdd = () => {
    if (!optionValue.trim()) return;
    setExtraAttributes((prev) => ({
      ...prev,
      options: [...prev.options, optionValue],
    }));
    setOptionValue("");
  };

  const removeOption = (optionToRemove: string) => {
    setExtraAttributes((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option !== optionToRemove),
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
    <SettingWrapper>
      <SettingHeader
        title="Select Element setting"
        description="Tune your options"
        icon={MousePointer2}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Enter select label"
        value={extraAttributes.label}
        placeholder="Enter label for select"
        icon={MousePointer2}
        onChange={(value) => handleChange("label", value)}
      />

      <InputTile
        label="Enter helper text"
        value={extraAttributes.helperText || ""}
        placeholder="Enter helper text"
        helperText="Clear the text to remove"
        onChange={(value) => handleChange("helperText", value)}
        icon={HelpCircle}
      />

      <InputTile
        label="Enter select placeholder"
        value={extraAttributes.selectPlaceHolder}
        placeholder="Enter select placeholder"
        onChange={(value) => handleChange("selectPlaceHolder", value)}
        icon={HelpCircle}
      />

      <div className="flex flex-col justify-center gap-2">
        <div className="flex flex-col gap-2 ">
          <InputTile
            label="Enter option"
            value={optionValue}
            placeholder="Enter here..."
            icon={PenBoxIcon}
            onChange={(value) => setOptionValue(value)}
          />

          <button
            onClick={handleOptionAdd}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>


        <div className="text-sm mt-2 flex gap-5 flex-wrap">
          {extraAttributes.options.map((option) => (
            <OptionsButton key={option} option={option} removeHandler={removeOption}/>
          ))}
        </div>
      </div>

      <RequiredCheckTile
          icon={ListCheck}
          label="Required Field"
          checked={extraAttributes.required}
          onChange={(checked) => handleChange("required", checked)}
          helperText="User must provide value to submit form"
        />


          <SettingFooter
          onCancel={() => setSelectedElementInstance(null)}
          onSave={handleSave}
          />

    </SettingWrapper>
  );
};

export default SelectSetting;


interface OptionsButtonProps{
  option : string, 
  removeHandler: (option: string) => void; 
}

const OptionsButton : FC<OptionsButtonProps> = ({option, removeHandler}) => {
  return(
    <button
              className=" px-5 py-2 bg-black/20 text-white relative rounded-md"
            >
              <span className=" absolute -top-2 -right-2 bg-red-300 rounded-full" onClick={() => removeHandler(option)}>
                <X />
              </span>
              <span className="text-black">{option}</span>
            </button>
  )
}
