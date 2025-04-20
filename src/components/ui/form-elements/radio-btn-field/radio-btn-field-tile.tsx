import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { RadioButtonCustomInstance } from "./radio-btn-prop-attributes";
import { ElementLayerTile } from "../elements-reusable-comp";

const RadioBtnFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as RadioButtonCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Single Selection" />;
};

export default RadioBtnFieldTile;