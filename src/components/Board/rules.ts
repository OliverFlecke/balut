import { Category } from '../../Category';
import { Roll, RowState, Value } from '../Game/state/GameState';
import { sumNumbers } from '../Game/state/gameUtils';

export function categoryPoints(category: Category, values: RowState): number {
	switch (category) {
		case Category.Balut:
			return 2 * values.filter((x) => typeof x === 'number' && x !== 0).length;
		case Category.Chance:
			return sumValues(values) >= 100 ? 2 : 0;
		case Category.FullHouse:
			return values.filter((x) => typeof x === 'number').length === 4 ? 3 : 0;
		case Category.Straight:
			return values.filter((x) => typeof x === 'number').length === 4 ? 4 : 0;
		case Category.Sixes:
			return sumValues(values) >= 78 ? 2 : 0;
		case Category.Fives:
			return sumValues(values) >= 65 ? 2 : 0;
		case Category.Fours:
			return sumValues(values) >= 52 ? 2 : 0;
	}
}

export function sumValues(values: RowState): number {
	return values
		.filter((x) => typeof x === 'number')
		.map((x) => x as number)
		.reduce((acc, v) => acc + v, 0);
}

const finalPointScoreThresholds = [300, 350, 400, 450, 500, 550, 600, 650];
export function extraPointScore(score: number): number {
	let points = -2;

	for (const threshold of finalPointScoreThresholds) {
		if (score < threshold) {
			break;
		}
		points++;
	}
	return points;
}

export function calculateSuggestion(category: Category, roll?: Roll): Value {
	if (!roll) {
		return null;
	}

	switch (category) {
		case Category.Fours:
			return sumNumbers(roll.filter((x) => x === 4));
		case Category.Fives:
			return sumNumbers(roll.filter((x) => x === 5));
		case Category.Sixes:
			return sumNumbers(roll.filter((x) => x === 6));
		case Category.Straight:
			return isStraight(roll) ? sumNumbers(roll) : 'X';
		case Category.FullHouse:
			return isFullHouse(roll) ? sumNumbers(roll) : 'X';
		case Category.Chance:
			return sumNumbers(roll);
		case Category.Balut:
			return roll.every((x) => x === roll[0]) ? sumNumbers(roll) + 20 : 'X';
	}
}

export function isStraight(roll: Roll): boolean {
	return (
		roll.some((x) => x === 1 || x === 6) &&
		[2, 3, 4, 5].every((x) => roll.includes(x))
	);
}

export function isFullHouse(roll: Roll): boolean {
	const values = new Set(roll);
	if (values.size !== 2) {
		return false;
	}

	return Array.from(values).every((v) => {
		const count = roll.filter((x) => x === v).length;
		return count === 3 || count === 2;
	});
}
