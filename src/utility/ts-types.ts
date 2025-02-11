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
  tile: React.FC<FormElementProps>;
  setting: React.FC<FormElementProps>;
  submit: React.FC<submitCompPropsType>;
  elementButton: string;
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

