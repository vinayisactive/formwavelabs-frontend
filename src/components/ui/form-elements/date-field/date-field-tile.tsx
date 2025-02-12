import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { DateFieldCustomElement } from "./date-prop-attributes";
import { ElementLayerTile } from "../elements-reusable-comp";

const DateFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as DateFieldCustomElement).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Date Picker" />;
};

export default DateFieldTile;