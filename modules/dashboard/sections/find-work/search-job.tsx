import { Button } from "@/modules/common/components/input/button";
import { SetStateAction, useEffect, useState } from "react";

type SearchJobProps = {
	setSearchTerm: React.Dispatch<SetStateAction<string>>;
};

const SearchJob = ({ setSearchTerm }: SearchJobProps) => {
	const [data, setData] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearchTerm(data);
	};

	useEffect(() => {
		if (!data) setSearchTerm("");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className="bg-white py-6">
			<div className="dashboard-layout-container">
				<div className="md:w-[480px]">
					<h1 className="mb-2 text-[19px] font-bold leading-[23px] text-[#101828] min-[540px]:text-[32px] min-[540px]:leading-[38px]">
						Recent job post
					</h1>
					<p className="mb-8 text-xs leading-[14px] text-[#667085] min-[540px]:text-sm min-[540px]:leading-[17px]">
						36 new projects posted today
					</p>

					<form
						onSubmit={handleSubmit}
						className="mt-8 flex items-center gap-x-4"
					>
						<input
							name="search"
							id="search"
							placeholder="Search for skills"
							type="text"
							onChange={(e) => setData(e.target.value)}
							className="block h-[41px] flex-1 rounded-[5px] border border-[#E8E8EF] bg-[#FCFDFD] py-2 px-3 text-sm placeholder:text-[#979797] focus:outline-none"
						/>
						<Button title="Search" className="h-[41px] w-[110px]" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default SearchJob;
