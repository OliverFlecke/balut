import React from 'react';
import { resetLocked } from './gameUtils';
import { Category } from '../../../Category';
import { Value } from '../../Board/state/BalutState';

export interface GameState {
	roll?: Roll;
	locked: RollLock;
	rollNumber: number;
	name?: string;
}

export interface GameAction {
	reduce(state: GameState): GameState;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
	return action.reduce(state);
}

export const GameContext = React.createContext<{
	state: GameState;
	dispatch: React.Dispatch<GameAction>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}>({} as any);

export const initialGameState: GameState = {
	rollNumber: 0,
	locked: resetLocked(),
};

export type Roll = [number, number, number, number, number];
export type RollLock = [boolean, boolean, boolean, boolean, boolean];

export type WriteValue = (
	category: Category,
	index: number,
	value: Value,
) => void;
