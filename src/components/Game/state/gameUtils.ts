import { RollLock, Roll } from './GameState';

export function randomDice(): number {
	return Math.floor(Math.random() * 6) + 1;
}

export function doRoll(locked: RollLock, current?: Roll): Roll {
	return (current ?? [...Array(5)]).map((v, i) =>
		locked[i] ? v : randomDice(),
	) as Roll;
}

export function resetLocked(): RollLock {
	return [...Array(5)].map(() => false) as RollLock;
}
