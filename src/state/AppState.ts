import type { HubConnection } from "@microsoft/signalr";
import type { BalutValues } from "../components/Game/state/GameState";

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

function isBrowser(): boolean {
	return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function reducer(state: AppState, action: Action): AppState {
	const newState = action.reduce(state);

	if (isBrowser()) {
		const toSave = JSON.parse(JSON.stringify(newState));
		toSave.connection = undefined;
		localStorage.setItem("appState", JSON.stringify(toSave));
	}

	return newState;
}

export function initial(): AppState {
	if (isBrowser()) {
		const stored = localStorage.getItem("appState");
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch {}
		}
	}

	return {
		players: [],
	};
}
