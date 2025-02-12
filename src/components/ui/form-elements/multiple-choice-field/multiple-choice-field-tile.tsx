import { FC } from "react";
import { FormElementProps } from "@/utility/ts-types";
import { MultipleChoiceFieldCustomInstance } from "./multiple-choice-prop-attributes";
import { ElementLayerTile } from "../elements-reusable-comp";

const MultipleChoiceFieldTile: FC<FormElementProps> = ({ elementInstance }) => {
  const { label } = (elementInstance as MultipleChoiceFieldCustomInstance).extraAttributes;

  return <ElementLayerTile label={label} typeLabel="Checkbox Group" />;
};

export default MultipleChoiceFieldTile;