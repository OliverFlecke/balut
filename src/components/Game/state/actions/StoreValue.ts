import { Category } from '../../../../Category';
import {
	Value,
	GameState,
	BalutValues,
	GameAction,
} from '../GameState';

export class StoreValue implements GameAction {
	public category: Category;
	public index: number;
	public value: Value;

	constructor(category: Category, index: number, value: Value) {
		this.category = category;
		this.index = index;
		this.value = value;
	}

	reduce(state: GameState): GameState {
		const values: BalutValues = {};
		Object.assign(values, state.values);
		values[Category[this.category]][this.index] = this.value;

		return { ...state, values };
	}
}
