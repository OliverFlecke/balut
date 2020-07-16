import { GameAction, GameState, RollLock } from '../GameState';

export class ToggleDiceAction implements GameAction {
	index: number;

	constructor(index: number) {
		this.index = index;
	}

	reduce(state: GameState): GameState {
		return {
			...state,
			locked: state.locked.map((b, i) =>
				this.index === i ? !b : b,
			) as RollLock,
		};
	}
}
