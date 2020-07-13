import { BalutAction, BalutState, Value, BalutValues } from '../BalutState';
import { Category } from '../../../../Category';

export class StoreValue implements BalutAction {
	public category: Category;
	public index: number;
	public value: Value;

	constructor(category: Category, index: number, value: Value) {
		this.category = category;
		this.index = index;
		this.value = value;
	}

	reduce(state: BalutState): BalutState {
		console.log(`Changing value: ${this.value}`);
		const values: BalutValues = {};
		Object.assign(values, state.values);
		values[Category[this.category]][this.index] = this.value;

		return { ...state, values };
	}
}
