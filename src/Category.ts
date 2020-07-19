export enum Category {
	Fours,
	Fives,
	Sixes,
	Straight,
	FullHouse,
	Chance,
	Balut,
}

export function categoryToString(category: Category): string {
	if (category === Category.FullHouse) {
		return 'Full house';
	}
	return Category[category];
}
