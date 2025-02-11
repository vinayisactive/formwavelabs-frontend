import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { YesAndNoFieldCustomInstance } from "./yes-n-no-prop-attributes";
import ElementLayerTile from "../property-reusable-comp";

const YesAndNoFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as YesAndNoFieldCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Yes/No" />;
};

export default YesAndNoFieldTile;