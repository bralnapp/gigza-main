import { use, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import Image from "next/image";

// images
import chevronDown from "@/public/asset/icons/arrow-down.svg";

type SelectProps = {
	label: string;
	data: string[];
	value: string;
	title: string;
	handleSelectOption: (value: string) => void;
	error:string;
};

const Select = ({
	label,
	data,
	value,
	title,
	handleSelectOption,
	error
}: SelectProps) => {
	return (
		<div>
			<p className="mb-2 text-base capitalize leading-[19px] text-b1">
				{label}
			</p>
			<Listbox value={value} onChange={handleSelectOption}>
				<Listbox.Button className="flex w-full items-center justify-between rounded-[5px] border border-[#E8E8EF] bg-[#FCFDFD] py-[13px] px-3 text-sm capitalize text-[#101828]">
					{value || title}
					<Image src={chevronDown} alt="" />
				</Listbox.Button>
				<Listbox.Options className="text-primary-2 h-[100px] overflow-hidden overflow-y-scroll rounded-[5px] border border-[#E8E8EF] bg-white py-1 text-sm capitalize">
					{data?.map((item, index) => (
						<Listbox.Option
							key={index}
							value={item}
							// disabled={person.unavailable}
							className="cursor-pointer px-3 py-2 hover:bg-primary hover:text-white"
						>
							{item}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox>
			<div className="mt-[6px] text-sm leading-[17px] text-red-500">
				{error ? <p>{error}</p> : null}
			</div>
		</div>
	);
};

export default Select;
