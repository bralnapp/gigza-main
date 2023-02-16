import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { CheckBox } from "@/modules/common/components/input";
import { roles, specialtiesOptions } from "utils/data";

// images
import closeIcon from "@/public/asset/icons/close.svg";
import { Button } from "@/modules/common/components/input/button";

type FilterTalentListModalProps = {
	showFilterTalentModal: boolean;
	setShowFilterTalentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterTalentListModal = ({
	showFilterTalentModal,
	setShowFilterTalentModal
}: FilterTalentListModalProps) => {
	const [checkedState, setCheckedState] = useState<boolean[]>(
		new Array(specialtiesOptions.length).fill(false)
	);

	const ratings = Array.from(Array(6).keys());
	// change for checkbox
	const handleOnChange = (position: number) => {
		console.log(position);
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		);
		setCheckedState(updatedCheckedState);
		const _support_types = updatedCheckedState
			.map((item, index) => (item === true ? specialtiesOptions[index] : null))
			.filter((item) => item !== null);
		// @ts-ignore
		// setFormData({ ...formData, support_types: _support_types })
	};

	const handleClose = () => {
		setShowFilterTalentModal(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

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
								{/* <div className="mt-4 flex flex-col space-y-[17px]">
									{roles.map((item, index) => (
										<CheckBox
											key={index}
											value={item}
											onChange={handleOnChange}
											name="specialties"
										/>
									))}
								</div> */}

								<Button title="filter results" className="mt-7 h-8 w-[120px]" />
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
