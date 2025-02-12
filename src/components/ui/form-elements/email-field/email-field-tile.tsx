import { FC } from "react"
import { ElementLayerTile } from "../elements-reusable-comp"
import { FormElementProps } from "@/utility/ts-types"
import { EmailCustomInstance } from "./email-prop-attributes"

const EmailFieldTile: FC<FormElementProps> = ({elementInstance}) => {
    const { label } = (elementInstance as EmailCustomInstance).extraAttributes

    return <ElementLayerTile label={label} typeLabel="Email" />
}

export default EmailFieldTile