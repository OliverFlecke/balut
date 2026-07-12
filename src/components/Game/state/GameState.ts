import React from "react";
import { resetLocked } from "./gameUtils";
import { Category } from "../../../Category";
import { enumStrings } from "../../../utils/enums";

export interface GameState {
	roll?: Roll;
	locked: RollLock;
	rollNumber: number;
	name?: string;
	values: BalutValues;
}

export interface GameAction {
	reduce(state: GameState): GameState;
}

function isBrowser(): boolean {
	return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function gameReducer(state: GameState, action: GameAction): GameState {
	const newState = action.reduce(state);

	if (isBrowser()) {
		localStorage.setItem("gameState", JSON.stringify(newState));
	}

	return newState;
}

export const GameContext = React.createContext<{
	state: GameState;
	dispatch: React.Dispatch<GameAction>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}>({} as any);

export function initialGameState(): GameState {
	if (isBrowser()) {
		const stored = localStorage.getItem("gameState");
		if (stored !== null) {
			try {
				return JSON.parse(stored) as GameState;
			} catch {}
		}
	}

	return {
		rollNumber: 0,
		locked: resetLocked(),
		values: initBalutValues(),
	};
}

export function initBalutValues(): BalutValues {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return enumStrings(Category).reduce((acc: any, key) => {
		acc[key] = [null, null, null, null];

		return acc;
	}, {});
}

export type Roll = [number, number, number, number, number];
export type RollLock = [boolean, boolean, boolean, boolean, boolean];

export type BalutValues = { [key: string]: RowState };
// Type to represent a entry on the Balut board.
// 'null' = cell unused
// 'X' = cell scratched
// else the value entered
export type Value = number | "X" | null;
export type RowState = [Value, Value, Value, Value];

export type WriteValue = (
	category: Category,
	index: number,
	value: Value,
) => void;
