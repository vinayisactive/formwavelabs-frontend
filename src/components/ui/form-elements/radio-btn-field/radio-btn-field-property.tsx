import {
  HelpCircle,
  ListCheck,
  MousePointer2,
  PenBoxIcon,
  TextCursorInputIcon,
  X,
} from "lucide-react";
import {
  FormElementPropertyProps,
  InputTile,
  PropertiesFooter,
  PropertiesHeader,
  PropertiesWrapper,
  RequiredCheckTile,
} from "../property-reusable-comp";
import useElements from "@/utility/useElements-hook";
import { RadioButtonCustomInstance } from "./radio-btn-prop-attributes";
import { FC, useState } from "react";

const RadioBtnFieldPropertiesComp: FC<FormElementPropertyProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as RadioButtonCustomInstance;
  const [extraAttributes, setExtraAttributes] = useState({
    ...element.extraAttributes,
    options: element.extraAttributes.options ?? [],
  });
  const { setSelectedElementInstance, updateElementInstance } = useElements();
  const [optionValue, setOptionValue] = useState<string>("");

  const changeHandler = (
    key: keyof typeof extraAttributes,
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
    setSelectedElementInstance(null)
  };

  return (
    <PropertiesWrapper>
      <PropertiesHeader
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

export default RadioBtnFieldPropertiesComp;


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
