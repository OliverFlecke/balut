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

	const toSave = JSON.parse(JSON.stringify(newState));
	toSave.connection = undefined;
	toSave.players = undefined;
	localStorage.setItem('appState', JSON.stringify(toSave));

	return newState;
}

export function initial(): AppState {
	const stored = localStorage.getItem('appState');
	if (stored) {
		try {
			const retrieved = JSON.parse(stored);
			if (retrieved) {
				retrieved.players = [];
				return retrieved;
			}
		} catch {}
	}

	return {
		players: [],
	};
}
