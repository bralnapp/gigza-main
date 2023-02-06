import GigzaContractAbi from "../constants/Gigza.json";
import DaiContractAbi from "../constants/Dia.json";

const GigzaContractAddress = "0x6B042519F64CDf02b9D0c26885662434032bF178";
const DiaContractAddress = "0x40fb4204dDe488f34b9d9E0056d0FE8f6ab38585";

const bidState = [
	"sent",
	"awarded",
	"accepted",
	"executed",
	"fulfilled",
	"cancelled"
];
const jobState = [
	"POSTED",
	"OFFERED",
	"ACCEPTED",
	"EXECUTED",
	"FUFILLED",
	"CANCELLED",
	"INDISPUTE",
	"RESOLVED"
];
const bidStatus = {
	1: "Pending",
	2: "Awarded",
	3: "Accepted",
	4: "Awaiting payment",
	5: "Paid",
	6: "Cancelled"
};
export {
	// initialState,
	// useSetPersistStore,
	// useGetPersistedStore,
	GigzaContractAddress,
	DiaContractAddress,
	GigzaContractAbi,
	DaiContractAbi,
	bidState,
	jobState,
	bidStatus
};
