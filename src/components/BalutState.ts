import React from 'react';
import { enumStrings } from '../utils/enums';
import { Category } from '../Category';

// Type to represent a entry on the Balut board.
// 'undefined' = cell unused
// 'null' = cell scratched
// else the value entered
export type Value = number | null | undefined;
export type RowState = [Value, Value, Value, Value];

export interface BalutState {
	values: BalutValues;
}

export interface BalutAction {
	reduce(state: BalutState): BalutState;
}

export function balutReducer(
	state: BalutState,
	action: BalutAction,
): BalutState {
	return action.reduce(state);
}

export const balutInitial: BalutState = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	values: enumStrings(Category).reduce((acc: any, key) => {
		acc[key] = [undefined, undefined, undefined, undefined];

		return acc;
	}, {}),
};

export const BalutContext = React.createContext<{
	state: BalutState;
	dispatch: React.Dispatch<BalutAction>;
}>({
	state: balutInitial,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	dispatch: () => {},
});

export type BalutValues = { [key: number]: RowState };
