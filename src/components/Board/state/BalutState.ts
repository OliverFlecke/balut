import React from 'react';
import { enumStrings } from '../../../utils/enums';
import { Category } from '../../../Category';
import { StoreValue } from './actions/StoreValue';

// Type to represent a entry on the Balut board.
// 'null' = cell unused
// 'X' = cell scratched
// else the value entered
export type Value = number | 'X' | null;
export type RowState = [Value, Value, Value, Value];

export interface BalutState {
	values: BalutValues;
}

export interface BalutAction {
	reduce(state: BalutState): BalutState;
}

interface BalutReducerArgs {
	onValueWritten?: () => void;
}

export function balutReducer({
	onValueWritten,
}: BalutReducerArgs): (state: BalutState, action: BalutAction) => BalutState {
	return (state, action) => {
		const newState = action.reduce(state);
		localStorage.setItem('state', JSON.stringify(newState));

		if (action instanceof StoreValue && onValueWritten) {
			onValueWritten();
		}

		return newState;
	};
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
		try {
			return JSON.parse(stored) as BalutState;
		} catch {}
	}

	return {
		values: initValues(),
	};
}

export function initValues(): BalutValues {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return enumStrings(Category).reduce((acc: any, key) => {
		acc[key] = [null, null, null, null];

		return acc;
	}, {});
}
