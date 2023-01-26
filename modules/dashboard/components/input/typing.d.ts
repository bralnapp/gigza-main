import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
    id: string;
    type: HTMLInputTypeAttribute;
    label: string;
    placeholder: string;
    name: string;
    labelClassName?: string;
    className?: string;
    [x: string]: any;
}