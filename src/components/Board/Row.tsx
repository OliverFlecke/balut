import React from 'react';
import { Category } from '../../Category';
import { Td, Th, Tr } from '../../styles/table';
import { Cell } from './Cell';
import { categoryPoints, sumValues } from './rules';
import { RowState } from './state/BalutState';

interface RowProps {
	category: Category;
	values: RowState;
}

export const Row = ({ category, values }: RowProps) => {
	const sum = sumValues(values);
	const points = categoryPoints(category, values);

	return (
		<Tr>
			<Th>{Category[category]}</Th>
			{values.map((value, i) => (
				<Cell key={i} index={i} value={value} category={category} />
			))}
			<Td>{sum !== 0 ? sum : ''}</Td>
			<Td>{points}</Td>
		</Tr>
	);
};
