import { Dispatch, SetStateAction } from "react";

const createUpdateSettingHandler = <T>(setState: Dispatch<SetStateAction<T>>) => <K extends keyof T>(key: K, value: string | boolean)  => {
    setState((prev) => ({
        ...prev,
        [key]: value
    }))
}

export default createUpdateSettingHandler; 