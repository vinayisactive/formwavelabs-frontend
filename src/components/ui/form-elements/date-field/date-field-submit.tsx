import { submitCompPropsType } from "@/utility/ts-types";
import { DateFieldCustomElement } from "./date-prop-attributes";
import { FC, useState, useEffect } from "react";
import { SubmitComponentWrapper } from "../elements-reusable-comp";
import { CalendarIcon } from "lucide-react";

const DateFieldSubmit: FC<submitCompPropsType> = ({
  elementInstance,
  handleValues,
  formValues,
  elementsToValidate,
  setElementsToValidate,
  isFormError,
}) => {
  const element = elementInstance as DateFieldCustomElement;
  const { label, helperText, required } = element.extraAttributes;

  const formatDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : null;
    return date && !isNaN(date.getTime())
      ? date.toISOString().split("T")[0]
      : "";
  };

  const [inputDate, setInputDate] = useState(() =>
    formatDate(formValues?.[element.id]?.value)
  );

  useEffect(() => {
    setInputDate(formatDate(formValues?.[element.id]?.value));
  }, [formValues, element.id]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;

    if (dateValue === "") {
      setInputDate("");
      handleValues?.(element.id, { id: element.id, value: "", label });

      if (required) {
        setElementsToValidate?.((prev) => ({
          ...prev,
          [element.id]: "",
        }));
      }
    } else {
      const date = new Date(dateValue);
      const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).replace(/ /g, " ");

      setInputDate(dateValue);
      handleValues?.(element.id, {
        id: element.id,
        value: formattedDate,
        label,
      });

      if (required) {
        setElementsToValidate?.((prev) => ({
          ...prev,
          [element.id]: undefined,
        }));
      }
    }
  };

  const triggerDatePicker = () => {
    const dateInput = document.getElementById(
      `date-picker-${element.id}`
    ) as HTMLInputElement | null;

    if (dateInput) {
      if (typeof dateInput.showPicker === "function") {
        dateInput.showPicker();
      } else {
        dateInput.click();
      }
    }
  };

  return (
    <SubmitComponentWrapper
      id={element.id}
      label={label}
      helperText={helperText}
      isFormError={isFormError}
      required={required}
      currentElementToValidate={elementsToValidate?.[element.id]}
    >
      <div className="relative w-full">
        <div
          onClick={triggerDatePicker}
          className="flex items-center justify-between gap-2 pr-2 py-1 text-sm border-b-2 border-gray-300 cursor-pointer transition hover:border-black"
        >
          <span className={`${inputDate ? "text-black" : "text-gray-700"}`}>
            {inputDate
              ? new Date(inputDate)
                  .toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/ /g,  " ")
              : "Select a date"}
          </span>
          <CalendarIcon className=" text-gray-400" size={15} />
        </div>

        <input
          id={`date-picker-${element.id}`}
          type="date"
          required={required}
          value={inputDate}
          onChange={handleDateChange}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        />
      </div>
    </SubmitComponentWrapper>
  );
};

export default DateFieldSubmit;
