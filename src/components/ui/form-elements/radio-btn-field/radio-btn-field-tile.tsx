import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { RadioButtonCustomInstance } from "./radio-btn-prop-attributes";
import ElementLayerTile from "../property-reusable-comp";

const RadioBtnFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as RadioButtonCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Radio Group" />;
};

export default RadioBtnFieldTile;