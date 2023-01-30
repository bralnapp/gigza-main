import React, { useEffect, useState } from "react";
import Image from "next/image";
import { InputProps } from "./typing";

// images
import closeIcon from "@/public/asset/icons/close.svg";

const TagInput = ({
	id,
	name,
	label,
	labelClassName,
	type,
	placeholder="ex. product design, No-code, product management",
	className,
	value,
	handleTag,
	error,
	...props
}: Omit<InputProps, "handleTextchange">) => {
	const [input, setInput] = useState("");
	const [tags, setTags] = useState<string[]>([]);

	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setInput(e.currentTarget.value);

	useEffect(() => {
		if (tags) {
			handleTag(tags);
		}
	}, [tags, handleTag]);

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		const trimmedInput = input.trim();

		if (
			(key === "," || key === "Enter") &&
			trimmedInput.length &&
			!tags.includes(trimmedInput)
		) {
			e.preventDefault();
			setTags((prevState) => [...prevState, trimmedInput]);
			setInput("");
		}
		if (key === "Backspace" && !input.length && tags.length) {
			e.preventDefault();
			const tagsCopy = [...tags];
			const poppedTag = tagsCopy.pop()!;

			setTags(tagsCopy);
			setInput(poppedTag);
		}
	};

	const deleteTag = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();
		setTags((prevState) => prevState.filter((tag, i) => i !== index));
	};

	return (
		<div>
			<div className="">
				<label
					htmlFor={id}
					className={`text-b1 block text-base leading-[19px] mb-2 ${labelClassName}`}
				>
					{label}
				</label>
				<input
					{...{ name, type, id, placeholder, onKeyDown, onChange, ...props }}
					value={input}
					className={`block py-2 px-3 placeholder:text-[#979797] text-sm bg-[#FCFDFD] rounded-[5px] border border-[#E8E8EF] focus:outline-none  w-full ${className}`}
				/>
			</div>
			<p className="text-sm leading-[17px] text-[#5F6062] my-2">
				Tip: you can press ENTER to add a skill
			</p>
			<div className="flex items-center flex-wrap gap-[11px]">
				{tags.map((tag, index) => (
					<div
						key={index}
						className="bg-[#F5F5F5] rounded py-[7px] pl-[14px] pr-[17px] space-x-2 text-[#333333] capitalize text-xs leading-[14px] flex items-center"
					>
						<p>{tag}</p>
						<button onClick={(e) => deleteTag(e, index)}>
							<Image src={closeIcon} alt="" className="w-[9px] h-[9px]" />
						</button>
					</div>
				))}
			</div>
			<div className="text-sm leading-[17px] text-red-500 mt-[6px]">
				{error ? <p>{error}</p> : null}
			</div>
		</div>
	);
};

export default TagInput;
