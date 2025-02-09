import { Dispatch, SetStateAction } from "react";

export type ElementsType = "TextFiled" | "SelectField" | "CheckboxField" | "RadioButtonField"  | "TextAreaField" | "YesAndNoField" | "MultipleChoiceField" | "DateField" | "FileUploadField"

export type FormElemetInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type FormElement = {
  construct: (id: string) => FormElemetInstance;
  type: ElementsType;
  builderComponent: React.FC<FormElementProps>;
  propertiesComponent: React.FC<FormElementProps>;
  submitComponent: React.FC<submitCompPropsType>;
  elementButton: {
    label: string;
  };
};

export interface FormElementProps {
  elementInstance: FormElemetInstance;
}

export type submitCompPropsType = {
  elementInstance: FormElemetInstance;
    handleValues?: submitValueType;
    formValues?: React.RefObject<{ [key: string]: string }>;
    elementsToValidate?: Record<string, string | undefined>; 
    setElementsToValidate?: Dispatch<SetStateAction<Record<string, string | undefined>>>
    isFormError?: boolean;
    theme? : "BOXY" | "ROUNDED" | undefined
}

export type submitValueType = (key: string, value: string) => void;

export type FormElemetsType = {
    [key in ElementsType]: FormElement;
  };

