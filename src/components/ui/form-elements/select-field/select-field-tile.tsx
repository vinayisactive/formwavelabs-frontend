import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { selectFieldCustomInstance } from "./select-prop-attributes";
import ElementLayerTile from "../property-reusable-comp";

const SelectFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as selectFieldCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Dropdown" />;
};

export default SelectFieldTile;