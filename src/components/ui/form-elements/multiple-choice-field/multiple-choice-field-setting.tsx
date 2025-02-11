"use client";

import { FC, useState } from "react";
import { MultipleChoiceFieldCustomInstance } from "./multiple-choice-prop-attributes";
import {
  InputTile,
  PropertiesFooter,
  PropertiesHeader,
  PropertiesWrapper,
  RequiredCheckTile,
} from "../property-reusable-comp";
import { HelpCircle, ListCheck, MousePointer2, PenBoxIcon, X } from "lucide-react";
import useElements from "@/utility/useElements-hook";
import { FormElementProps } from "@/utility/ts-types";


const MultipleChoiceSetting: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as MultipleChoiceFieldCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState(
    element.extraAttributes
  );
  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const [optionValue, setOptionValue] = useState<string>("");

  const handleInputChange = (
    key: keyof typeof element.extraAttributes,
    value: string | boolean
  ) => {
    setExtraAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
    <PropertiesWrapper>
      <PropertiesHeader
        title="Multiple choice Element setting"
        description="Tune your options"
        icon={MousePointer2}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Enter Multiple choice label"
        value={extraAttributes.label}
        placeholder="Enter label for select"
        icon={MousePointer2}
        onChange={(value) => handleInputChange("label", value)}
      />

      <InputTile
        label="Enter helper text"
        value={extraAttributes.helperText || ""}
        placeholder="Enter helper text"
        helperText="Clear the text to remove"
        onChange={(value) => handleInputChange("helperText", value)}
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
          onChange={(checked) => handleInputChange("required", checked)}
          helperText="User must provide value to submit form"
        />


          <PropertiesFooter
          onCancel={() => setSelectedElementInstance(null)}
          onSave={handleSave}
          />

    </PropertiesWrapper>
  );
};

export default MultipleChoiceSetting;


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
