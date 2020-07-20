import { GameAction, GameState } from '../GameState';

export class ChangeName implements GameAction {
	name?: string;

	constructor(name?: string) {
		this.name = name;
	}

	reduce(state: GameState): GameState {
		console.log(`Changing name ${this.name}`);
		return {
			...state,
			name: this.name,
		};
	}
}
