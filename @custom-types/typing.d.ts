export interface IuserBids {
	bidState: number;
	description: string;
	freelancer: `0x${string}`;
	jobId: any;
	timeline: any;
}

export type JobDetailsProps = {
	title: string;
	amount: number;
	client: `0x${string}`;
	skills: string[];
	timestamp: any;
	description: string;
	jobId: any;
	userBids: IuserBids[];
	state: number;
	timeline: any;
}[];

// kindly note the ProposalType is type declaration for sent proposals
export type ProposalType = {
	job: JobDetailsProps[number];
	proposals: IuserBids[];
};

export type UserProfileType = {
	name: string;
	mainSkill: string;
	bio: string;
	profileUrl: string;
	skills: string[];
	userAddress: `0x${string}`;
};

export type ReceivedProposalType = JobDetailsProps;

export type PageData =
	| {
			jobId: string;
			bid: string;
			freelancerAddress: `0x${string}`;
	  }
	| undefined;

export interface BigNumberData {
	type: "BigNumber";
	hex: string;
}

export type IReviews = {
	client: `0x${string}`;
	freelancer: `0x${string}`;
	jobId: BigNumberData;
	rating: BigNumberData;
	review: string;
}[];

export type MessageProps = {
	chat?: {
		id: string;
		users: `0x${string}`[];
	};
	messages?: string[];
};