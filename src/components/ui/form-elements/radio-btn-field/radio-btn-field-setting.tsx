import {
  HelpCircle,
  ListCheck,
  MousePointer2,
  PenBoxIcon,
  TextCursorInputIcon,
  X,
} from "lucide-react";
import {
  InputTile,
  RequiredCheckTile,
  SettingFooter,
  SettingHeader,
  SettingWrapper,
} from "../elements-reusable-comp";
import useElements from "@/utility/useElements-hook";
import { RadioButtonCustomInstance } from "./radio-btn-prop-attributes";
import { FC, useState } from "react";
import { FormElementProps } from "@/utility/ts-types";
import createUpdateSettingHandler from "@/utility/generic-update-setting-fn";

const RadioBtnSetting: FC<FormElementProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as RadioButtonCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState({
    ...element.extraAttributes,
    options: element.extraAttributes.options ?? [],
  });
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
    setSelectedElementInstance(null)
  };

  return (
    <SettingWrapper>
      <SettingHeader
        title="Radio Button setting"
        description="Set Radio button setting"
        icon={MousePointer2}
        onClose={() => setSelectedElementInstance(null)}
      />

      <InputTile
        label="Label for Radio button"
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
          {extraAttributes.options?.map((option) => (
            <OptionsButton key={option} option={option} removeHandler={removeOption}/>
          ))}
        </div>
      </div>

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

export default RadioBtnSetting;


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
