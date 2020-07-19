import React from 'react';
import { enumStrings } from '../../../utils/enums';
import { Category } from '../../../Category';

// Type to represent a entry on the Balut board.
// 'null' = cell unused
// 'X' = cell scratched
// else the value entered
export type Value = number | 'X' | null;
export type RowState = [Value, Value, Value, Value];

export interface BalutState {
	values: BalutValues;
	name?: string;
}

export interface BalutAction {
	reduce(state: BalutState): BalutState;
}

export function balutReducer(
	state: BalutState,
	action: BalutAction,
): BalutState {
	const newState = action.reduce(state);
	console.log(newState);
	localStorage.setItem('state', JSON.stringify(newState));

	return newState;
}

export const balutInitial: BalutState = initState();

export const BalutContext = React.createContext<{
	state: BalutState;
	dispatch: React.Dispatch<BalutAction>;
}>({
	state: balutInitial,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	dispatch: () => {},
});

export type BalutValues = { [key: string]: RowState };

function initState(): BalutState {
	const stored = localStorage.getItem('state');

	if (stored !== null) {
		return JSON.parse(stored) as BalutState;
	}

	return {
		values: initValues(),
	};
}

export function initValues() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return enumStrings(Category).reduce((acc: any, key) => {
		acc[key] = [null, null, null, null];

		return acc;
	}, {});
}
