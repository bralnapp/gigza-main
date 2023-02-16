import React, {
	FormEvent,
	Fragment,
	SetStateAction,
	useEffect,
	useState
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { CheckBox } from "@/modules/common/components/input";
import { roles } from "utils/data";
import { Button } from "@/modules/common/components/input/button";

// images
import closeIcon from "@/public/asset/icons/close.svg";

type FilterTalentListModalProps = {
	showFilterTalentModal: boolean;
	setShowFilterTalentModal: React.Dispatch<React.SetStateAction<boolean>>;
	setFormData: React.Dispatch<
		SetStateAction<{
			rating: string;
			specialties: string;
		}>
	>;
};

const FilterTalentListModal = ({
	showFilterTalentModal,
	setShowFilterTalentModal,
	setFormData
}: FilterTalentListModalProps) => {
	const [data, setData] = useState({
		rating: "",
		specialties: ""
	});

	const [isValid, setIsValid] = useState(false);

	const ratings = Array.from(Array(6).keys());

	const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
		setData({
			...data,
			[e.currentTarget?.name]: e.currentTarget?.value
		});
	};

	const handleClose = () => {
		setShowFilterTalentModal(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormData(data);
		handleClose();
	};

	useEffect(() => {
		if (data?.rating || data?.specialties) {
			setIsValid(true);
		}
	}, [data?.rating, data?.specialties]);

	return (
		<Transition appear show={showFilterTalentModal} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-[999999]"
				onClose={handleClose}
			>
				<div className="min-h-screen text-center">
					<Dialog.Overlay className="fixed left-0 top-0 z-[999999] h-full w-full bg-black bg-opacity-75" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div className="relative   z-[999999999] inline-block w-11/12 max-w-lg rounded-lg bg-[#fff] px-6 py-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title as="div" className="flex items-center">
							<h1 className="font-satoshiBold flex-1 text-xl capitalize leading-[21px] text-[#101828] md:text-2xl md:leading-[29px]">
								filter
							</h1>
							<Image src={closeIcon} onClick={handleClose} alt="" />
						</Dialog.Title>
						<section className="my-6 h-[400px] overflow-y-scroll">
							<form onSubmit={handleSubmit}>
								<div className="mb-2">
									<h3 className="font-satoshiMedium text-base capitalize leading-[21px] text-[#101828]">
										ratings
									</h3>
									{/* <div className="mt-[17px] flex flex-col space-y-[17px] border-b border-[#F0F0F0] pb-5">
										{ratings.map((item, index) => (
											<CheckBox
												key={index}
												value={item}
												onChange={() => handleOnChange(index)}
												rating
											/>
										))}
									</div> */}
								</div>
								<div className="mt-4 flex flex-col space-y-[17px]">
									{roles.map((item, index) => (
										<CheckBox
											key={index}
											value={item}
											onChange={handleOnChange}
											name="specialties"
											formData={data?.specialties}
										/>
									))}
								</div>

								<Button
									title="filter results"
									disabled={!isValid}
									className="mt-7 h-8 w-[120px]"
								/>
							</form>
							{/* <FilterTalentListForm /> */}
						</section>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default FilterTalentListModal;
