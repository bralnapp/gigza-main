export interface IinitialState {
	account: null | string;
	isWalletConnected: boolean;
	isButtonDisabled: boolean;
}

export interface IstoreContextInterface {
	state: IinitialState;
	dispatch: React.Dispatch<StoreActions>;
	connectAccount: () => void;
}
