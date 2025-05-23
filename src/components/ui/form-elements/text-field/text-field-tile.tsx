import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { TextCustomInstance } from "./text-prop-attributes";
import { ElementLayerTile } from "../elements-reusable-comp";

const TextFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const element = elementInstance as TextCustomInstance;
  const { label } = element.extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Text Input" />;
};

export default TextFieldTile;