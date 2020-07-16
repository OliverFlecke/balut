import { GameAction, GameState } from '../GameState';
import { doRoll } from '../gameUtils';

export class RollAction implements GameAction {
	reduce(state: GameState): GameState {
		return {
			...state,
			roll: doRoll(state.locked, state.roll),
			rollNumber: state.rollNumber + 1,
		};
	}
}
