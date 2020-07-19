import React from 'react';
import { Category } from '../../Category';
import { Td, Th, Tr } from '../../styles/table';
import { Roll } from '../Game/state/GameState';
import { Cell } from './Cell';
import { calculateSuggestion, categoryPoints, sumValues } from './rules';
import { RowState } from './state/BalutState';

interface RowProps {
	category: Category;
	values: RowState;
	roll?: Roll;
}

export const Row = ({ category, values, roll }: RowProps) => {
	const sum = sumValues(values);
	const points = categoryPoints(category, values);
	const suggestion = calculateSuggestion(category, roll);
	let first = true;

	return (
		<Tr>
			<Th>{Category[category]}</Th>
			{values.map((value, i) => {
				const thisIsFirst = first && value === null;
				if (thisIsFirst) {
					first = false;
				}

				return (
					<Cell
						key={i}
						index={i}
						value={value}
						category={category}
						suggestion={
							thisIsFirst ? (suggestion === 0 ? 'X' : suggestion) : undefined
						}
					/>
				);
			})}
			<Td>{sum}</Td>
			<Td>{points}</Td>
		</Tr>
	);
};
