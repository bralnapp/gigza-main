import GigzaContractAbi from "../constants/Gigza.json"
import DaiContractAbi from "../constants/Dia.json"

// const initialState = {
// 	account: null,
// 	isWalletConnected: false
// 	// isButtonDisabled: false
// };

// const useSetPersistStore = (state: IinitialState) => {
// 	useEffect(() => {
// 		localStorage.setItem("persist-gigza", JSON.stringify(state));
// 		//eslint-disable-next-line
// 	}, [state]);
// };

// const useGetPersistedStore = () => {
// 	if (
// 		typeof window !== "undefined" &&
// 		localStorage.getItem("persist-gigza") !== "undefined"
// 	) {
// 		JSON.parse(localStorage.getItem("persist-gigza")!) || initialState;
// 	}
// };

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

export {
	// initialState,
	// useSetPersistStore,
	// useGetPersistedStore,
	GigzaContractAddress,
	DiaContractAddress,
	GigzaContractAbi,
	DaiContractAbi,
	bidState,
	jobState
};
