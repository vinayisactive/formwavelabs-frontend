"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { YesAndNoFieldCustomInstance } from "./yes-n-no-prop-attributes";
import {
  SplitSubmitComponentWrapper,
  SubmitComponentWrapper,
} from "../elements-reusable-comp";
import useMediaQuery from "@/utility/useMediaQuery-hook";
import { Check } from "lucide-react";

const YesAndNoFieldSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } =
    elementInstance as YesAndNoFieldCustomInstance;
  const { label, helperText, options, required } = extraAttributes;
  const [inputValue, setInputValue] = useState<string>(
    formValues?.[id]?.value || ""
  );

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChange = (clicked: string) => {
    const isDeselect = inputValue === clicked;
    const newValue = isDeselect ? "" : clicked;
  
    setInputValue(newValue);
  
    if (required) {
      setElementsToValidate?.((prev) => ({
        ...prev,
        [id]: newValue === "" ? "" : undefined,
      }));
    }
  
    handleValues?.(id, { id, value: newValue, label: extraAttributes.label });
  };

  return (
    <div>
      {isMobile ? (
        <SubmitComponentWrapper
          id={id}
          label={label}
          helperText={helperText}
          required={required}
          currentElementToValidate={elementsToValidate?.[id]}
          isFormError={isFormError}
        >
          <OptionsContainer
            options={options}
            inputValue={inputValue}
            handleChange={handleChange}
            theme={theme}
          />
        </SubmitComponentWrapper>
      ) : (
        <SplitSubmitComponentWrapper
          id={id}
          label={label}
          helperText={helperText}
          required={required}
          currentElementToValidate={elementsToValidate?.[id]}
          isFormError={isFormError}
        >
          <OptionsContainer
            options={options}
            inputValue={inputValue}
            handleChange={handleChange}
            theme={theme}
          />
        </SplitSubmitComponentWrapper>
      )}
    </div>
  );
};

const OptionsContainer = ({
  options,
  inputValue,
  handleChange,
  theme,
}: {
  options: string[];
  inputValue: string;
  handleChange: (option: string) => void;
  theme: "BOXY" | "ROUNDED" | undefined;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      {options.map((option) => (
        <label
          key={option}
          className={`cursor-pointer group border-2 rounded-lg ${
            option === inputValue ? "border-black" : "border-gray-200"
          } `}
          onClick={(e) => {
            e.preventDefault();
            handleChange(option);
          }}
        >
          <div
            className={`px-4 py-2.5 text-sm flex items-center transition-all duration-200
                  ${theme === "BOXY" ? "" : "rounded-lg "}
    
                  ${option === inputValue ? "bg-gray-100" : "text-white"}
                  group-hover:bg-gray-100`}
          >
            <span
              className={` flex justify-start items-center gap-2 ${
                option === inputValue
                  ? "font-semibold text-black"
                  : "text-gray-700"
              }`}
            >
              {option}
              {option === inputValue && <Check size={18} />}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default YesAndNoFieldSubmit;
