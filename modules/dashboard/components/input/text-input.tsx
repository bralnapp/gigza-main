import { InputProps } from "./typing";


const TextInput = ({ id, type, placeholder, label, name, value, labelClassName, className, handleTextChange, ...props }: InputProps) => {
    return (
        <div className="">
            <label htmlFor={id} className={`text-b1 text-base leading-[19px] capitalize ${labelClassName}`}>{label}</label>
            <input
                {...{ name, type, id, placeholder, value, ...props }}
                onChange={handleTextChange}
                className={`block py-2 px-3 placeholder:text-[#979797] text-sm bg-[#FCFDFD] mt-2 rounded-[5px] border border-[#E8E8EF] focus:outline-none w-full ${className}`}
            />
        </div>
    )
}

export default TextInput