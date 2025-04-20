
"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { RadioButtonCustomInstance } from "./radio-btn-prop-attributes";
import {
  SplitSubmitComponentWrapper,
  SubmitComponentWrapper,
} from "../elements-reusable-comp";
import useMediaQuery from "@/utility/useMediaQuery-hook";
import { Check } from "lucide-react";

const RadioBtnSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } = elementInstance as RadioButtonCustomInstance;
  const { label, helperText, options, required } = extraAttributes;
  const [selected, setSelected] = useState<string>(
    formValues?.[id]?.value || ""
  );

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChange = (option: string) => {
    const isSame = selected === option;
    const newValue = isSame ? "" : option;

    setSelected(newValue);

    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: newValue === "" ? "" : undefined,
      }));
    }

    handleValues?.(id, { id, value: newValue, label: extraAttributes.label });
  };

  const Wrapper = isMobile ? SubmitComponentWrapper : SplitSubmitComponentWrapper;

  return (
    <Wrapper
      id={id}
      label={label}
      helperText={helperText}
      required={required}
      currentElementToValidate={elementsToValidate?.[id]}
      isFormError={isFormError}
    >
      <OptionsContainer
        options={options}
        selected={selected}
        handleChange={handleChange}
        theme={theme}
      />
    </Wrapper>
  );
};

const OptionsContainer = ({
  options,
  selected,
  handleChange,
  theme,
}: {
  options: string[];
  selected: string;
  handleChange: (option: string) => void;
  theme: "ROUNDED" | "BOXY" | undefined;
}) => (
  <div className="flex flex-col gap-2 w-full mt-2">
    {options.map((option) => (
      <label
        key={option}
        className={`cursor-pointer group border-2 rounded-lg transition-colors duration-200 \
          ${option === selected ? "border-black bg-gray-100" : "border-gray-200"}`}
        onClick={(e) => {
          e.preventDefault();
          handleChange(option);
        }}
      >
        <div
          className={`px-4 py-2.5 text-sm flex items-center gap-2 \
            ${theme === "BOXY" ? "" : "rounded-lg"} \
            ${option === selected ? "font-semibold text-black" : "text-gray-700"}`}
        >
          {option}
          {option === selected && <Check size={18} />}
        </div>
      </label>
    ))}
  </div>
);

export default RadioBtnSubmit;
