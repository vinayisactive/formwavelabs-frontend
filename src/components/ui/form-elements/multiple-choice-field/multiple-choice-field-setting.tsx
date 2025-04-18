"use client";

import { FC, useState } from "react";
import { MultipleChoiceFieldCustomInstance } from "./multiple-choice-prop-attributes";
import {
  InputTile,
  OptionsButton,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import useElements from "@/utility/useElements-hook";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";

const MultipleChoiceSetting: FC<FormElementProps> = ({ elementInstance }) => {
  const element = elementInstance as MultipleChoiceFieldCustomInstance;
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
        title="Multi selection setting"
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Multi selection label"
        value={extraAttributes.label}
        placeholder="label..."
        onChange={(value) => handleChange("label", value)}
      />

      <InputTile
        label="Helper text"
        value={extraAttributes.helperText || ""}
        placeholder="Enter helper text"
        onChange={(value) => handleChange("helperText", value)}
      />

      <div className="flex flex-col justify-center gap-2 pt-2">
        <div className="flex justify-between items-end gap-2 ">
          <InputTile
            label="Enter option"
            value={optionValue}
            placeholder="Enter here..."
            onChange={(value) => setOptionValue(value)}
          />

          <button
            onClick={handleOptionAdd}
            className="py-3 px-4 bg-black text-white text-xs rounded-lg hover:bg-black/85"
          >
            Add
          </button>
        </div>

        <div className="text-sm py-2">
          {extraAttributes.options?.length === 0 ? (
            <div className="w-full text-xs text-black">
              options will appear here...
            </div>
          ) : (
            <div className="flex gap-5 flex-wrap ">
              {extraAttributes.options.map((option) => (
                <OptionsButton
                  key={option}
                  option={option}
                  removeHandler={removeOption}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <RequiredCheckTile
        checked={extraAttributes.required}
        onChange={(checked) => handleChange("required", checked)}
      />

      <SettingFooter
        onCancel={() => setSelectedElementInstance(null)}
        onSave={handleSave}
      />
    </SettingWrapper>
  );
};

export default MultipleChoiceSetting;