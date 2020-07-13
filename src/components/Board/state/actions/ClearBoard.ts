import { BalutAction, BalutState, initValues } from '../BalutState';

export class ClearBoard implements BalutAction {
	reduce(state: BalutState): BalutState {
		localStorage.removeItem('state');

		return {
			...state,
			values: initValues(),
		};
	}
}
