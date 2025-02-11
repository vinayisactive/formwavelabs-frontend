import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { TextCustomInstance } from "./text-prop-attributes";
import ElementLayerTile from "../property-reusable-comp";

const TextFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const element = elementInstance as TextCustomInstance;
  const { label } = element.extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Text field" />;
};

export default TextFieldTile;