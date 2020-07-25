import { HubConnection } from '@microsoft/signalr';
import { BalutValues, initValues } from '../components/Board/state/BalutState';

export interface AppState {
	name?: string;
	session?: string;
	connection?: HubConnection;
	players: PlayerState[];
}

export interface PlayerState {
	name: string;
	values: BalutValues;
}

export interface Action {
	reduce(state: AppState): AppState;
}

export function reducer(state: AppState, action: Action): AppState {
	return action.reduce(state);
}

export const initial: AppState = {
	players: [],
};
