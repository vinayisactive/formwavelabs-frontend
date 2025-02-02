export type ElementsType = "TextFiled" | "SelectField" | "CheckboxField" | "RadioButtonField"

export type FormElemetInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type FormElement = {
  construct: (id: string) => FormElemetInstance;
  type: ElementsType;
  builderComponent: React.FC<{
    elementInstance: FormElemetInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElemetInstance;
  }>;
  submitComponent: React.FC<{
    elementInstance: FormElemetInstance;
    handleValues?: submitValueType;
    formValues?: React.RefObject<{ [key: string]: string }>;
  }>;
  elementButton: {
    label: string;
  };
};

export type submitValueType = (key: string, value: string) => void;

export type FormElemetsType = {
    [key in ElementsType]: FormElement;
  };


