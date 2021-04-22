import { GameAction, GameState, initBalutValues } from '../GameState';

export class ClearBoard implements GameAction {
	reduce(state: GameState): GameState {
		localStorage.removeItem('gameState');

		return {
			...state,
			values: initBalutValues(),
		};
	}
}
