export interface IuserBids {
	bidState: number;
	description: string;
	freelancer: string;
	jobId: any;
	timeline: any;
}

export type JobDetailsProps = {
	title: string;
	amount: number;
	client: string;
	skills: string[];
	timestamp: any;
	description: string;
	jobId: any;
	userBids: IuserBids[];
    state: number;
	timeline: any;  
}[];

export type ProposalType = {
	job: JobDetailsProps[number];
	proposals: IuserBids[];
};
