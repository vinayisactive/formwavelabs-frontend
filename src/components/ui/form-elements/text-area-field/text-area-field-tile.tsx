import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { TextAreaCustomInstance } from "./text-area-prop-attributes";
import { ElementLayerTile } from "../elements-reusable-comp";

const TextAreaTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as TextAreaCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Text Area" />;
};

export default TextAreaTile;