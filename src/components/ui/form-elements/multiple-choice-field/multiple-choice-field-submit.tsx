"use client";
import { submitCompPropsType } from "@/utility/ts-types";
import { FC, useState } from "react";
import { MultipleChoiceFieldCustomInstance } from "./multiple-choice-prop-attributes";
import {
  SplitSubmitComponentWrapper,
  SubmitComponentWrapper,
} from "../elements-reusable-comp";
import useMediaQuery from "@/utility/useMediaQuery-hook";
import { Check } from "lucide-react";

const MultipleChoiceSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
  theme,
}) => {
  const { id, extraAttributes } =
    elementInstance as MultipleChoiceFieldCustomInstance;
  const { label, helperText, options, required } = extraAttributes;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
    const storedValue = formValues?.[id]?.value;
    return typeof storedValue === "string" && storedValue !== ""
      ? storedValue.split(",")
      : [];
  });

  const handleChange = (option: string) => {
    setSelectedOptions((prev) => {
      const cleanPrev = prev.filter(Boolean);
      const newOptions = cleanPrev.includes(option)
        ? cleanPrev.filter((opt) => opt !== option)
        : [...cleanPrev, option];

      handleValues?.(id, {
        id,
        value: newOptions.join(","),
        label: extraAttributes.label,
      });

      if (required) {
        const isValid = newOptions.length > 0;
        setElementsToValidate?.((prev) => ({
          ...prev,
          [id]: isValid ? undefined : "",
        }));
      }

      return newOptions;
    });
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
            handleChange={handleChange}
            theme={theme}
            selectedOptions={selectedOptions}
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
            handleChange={handleChange}
            theme={theme}
            selectedOptions={selectedOptions}
          />
        </SplitSubmitComponentWrapper>
      )}
    </div>
  );
};

const OptionsContainer = ({
  options,
  handleChange,
  theme,
  selectedOptions,
}: {
  options: string[];
  handleChange: (option: string) => void;
  theme: "BOXY" | "ROUNDED" | undefined;
  selectedOptions: string[];
}) => {
  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      {options?.map((option) => (
        <label
          key={option}
          className={`cursor-pointer group border-2 rounded-lg ${selectedOptions.includes(option) ? "border-black" : "border-gray-200"} `}
          onClick={(e) => {
            e.preventDefault();
            handleChange(option);
          }}
        >
          <div
            className={`px-4 py-2.5 text-sm flex items-center transition-all duration-200
              ${
                theme === "BOXY"
                  ? ""
                  : "rounded-lg "
              }

              ${selectedOptions.includes(option) ? "bg-gray-100" : "text-white"}
              group-hover:bg-gray-100`}
          >
            <span className={` flex justify-start items-center gap-2 ${selectedOptions.includes(option) ? "font-semibold text-black" : "text-gray-700"}`}>{option}
               {selectedOptions.includes(option) && <Check size={18} />}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default MultipleChoiceSubmit;
