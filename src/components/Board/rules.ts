import { Category } from '../../Category';
import { RowState } from './state/BalutState';

export function categoryPoints(category: Category, values: RowState): number {
	switch (category) {
		case Category.Balut:
			return 2 * values.filter((x) => typeof x === 'number' && x !== 0).length;
		case Category.Choice:
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
