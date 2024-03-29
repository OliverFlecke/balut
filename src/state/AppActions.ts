import { HubConnection } from '@microsoft/signalr';
import {
	BalutValues,
	initBalutValues,
} from '../components/Game/state/GameState';
import { Action, AppState } from './AppState';

export class SetConnectionAction implements Action {
	connection: HubConnection;

	constructor(connection: HubConnection) {
		this.connection = connection;
	}

	reduce(state: AppState): AppState {
		return {
			...state,
			connection: this.connection,
		};
	}
}

export class SetSessionAction implements Action {
	session: string;
	constructor(session: string) {
		this.session = session;
	}

	reduce(state: AppState): AppState {
		return {
			...state,
			session: this.session,
		};
	}
}

export class SetNameAction implements Action {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	reduce(state: AppState): AppState {
		return {
			...state,
			name: this.name,
		};
	}
}

export class UpdatePlayerStateAction implements Action {
	values: BalutValues;
	name: string;
	constructor(name: string, values: BalutValues) {
		this.name = name;
		this.values = values;
	}

	reduce(state: AppState): AppState {
		console.log(`Updating player state for ${this.name}`);
		return {
			...state,
			players: state.players.map((player) => {
				return player.name === this.name
					? {
							...player,
							values: this.values,
					  }
					: player;
			}),
		};
	}
}

export class AddPlayerAction implements Action {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	reduce(state: AppState): AppState {
		console.debug(`Adding player ${this.name} to game`);
		return {
			...state,
			players: state.players
				.filter((p) => p.name !== this.name)
				.concat({ name: this.name, values: initBalutValues() }),
		};
	}
}
