import { ElementLayerTile } from "../../elements-reusable-comp"
import { FC } from "react"
import { FormElementProps } from "@/utility/ts-types"
import { FormHeaderCustomInstance } from "./form-header-prop-attributes"

const FormHeaderTile: FC<FormElementProps> = ({elementInstance}) =>{
    const { extraAttributes } = elementInstance as FormHeaderCustomInstance; 

    return (
        <ElementLayerTile label={extraAttributes.formHeader} typeLabel="Form header"/>
    )
}

export default FormHeaderTile; 