import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { CheckboxCustomInstance } from "./checkbox-prop-attributes";
import { ElementLayerTile } from "../elements-reusable-comp";

const CheckBoxFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as CheckboxCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Checkbox" />;
};

export default CheckBoxFieldTile;
