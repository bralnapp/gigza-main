import { InputProps } from "./typing";

const TextArea = ({
	id,
	label,
	name,
	placeholder,
	className,
	labelClassName,
	value,
	handleTextChange,
	...props
}: Omit<InputProps, "type">) => {
	return (
		<div>
			<label
				className={`text-b1 text-base leading-[19px] capitalize ${labelClassName}`}
				htmlFor={id}
			>
				{label}
			</label>
			<textarea
				{...{ name, id, placeholder, value, ...props }}
				onChange={handleTextChange}
				className={`block focus:outline-none mt-2 w-full p-3 bg-[#FCFDFD] text-sm rounded-[5px] border border-[#E8E8EF]  ${className}`}
			/>
		</div>
	);
};

export default TextArea;
