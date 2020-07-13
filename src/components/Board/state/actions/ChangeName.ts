import { BalutAction, BalutState } from '../BalutState';

export class ChangeName implements BalutAction {
	name?: string;

	constructor(name?: string) {
		this.name = name;
	}

	reduce(state: BalutState): BalutState {
		console.log(`Changing name ${this.name}`);
		return {
			...state,
			name: this.name,
		};
	}
}
