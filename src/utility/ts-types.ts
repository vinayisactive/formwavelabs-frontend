export interface NavItemsInterface {
  label: string;
  routeTo: string;
}

export type ElementsType = "TextFiled";

export type FormElemetInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type FormElemet = {
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
    [key in ElementsType]: FormElemet;
  };


