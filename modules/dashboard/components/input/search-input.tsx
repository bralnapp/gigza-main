import Image from "next/image";

// image
import searchIcon from "@/public/asset/icons/search.svg";

type SearchInputProps = {
	placeholder: string;
	value: string;
	handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchInput = ({
	placeholder,
	value,
	handleTextChange
}: SearchInputProps) => {
	return (
		<div className="flex w-full items-center space-x-[11px] rounded-[6px] border border-[#E8E8EF] bg-[#FCFCFC] py-[13px] px-[10px]">
			<div className="flex items-center">
				<Image src={searchIcon} alt="" />
			</div>
			<input
				type="text"
				{...{ placeholder, value }}
				name="search"
				onChange={handleTextChange}
				className="w-full bg-transparent text-sm leading-[20px] placeholder:text-[#9696B4] focus:outline-none"
			/>
		</div>
	);
};

export default SearchInput;
