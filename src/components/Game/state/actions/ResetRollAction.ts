import { GameAction, GameState } from '../GameState';
import { resetLocked } from '../gameUtils';

export class ResetRollAction implements GameAction {
	reduce(state: GameState): GameState {
		return {
			...state,
			locked: resetLocked(),
			roll: undefined,
			rollNumber: 0,
		};
	}
}
