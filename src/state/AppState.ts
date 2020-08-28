import { HubConnection } from '@microsoft/signalr';
import { BalutValues } from '../components/Game/state/GameState';

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
	const newState = action.reduce(state);
	localStorage.setItem(
		'appState',
		JSON.stringify(newState, ['name', 'session', 'players']),
	);

	return newState;
}

export function initial(): AppState {
	const stored = localStorage.getItem('appState');
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch {}
	}

	return {
		players: [],
	};
}
