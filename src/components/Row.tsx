import React, { useState, useMemo } from 'react';
import { Category } from '../Category';
import { Td, Th, Tr } from '../styles/table';

interface RowProps {
	category: Category;
}

type RowState = [number, number, number, number];

export const Row = ({ category: type }: RowProps) => {
	const [values, setValues] = useState<RowState>([0, 0, 0, 0]);
	const sum = useMemo(() => values.reduce((acc, x) => acc + x, 0), [values]);

	return (
		<Tr>
			<Th>{Category[type]}</Th>
			{values.map((value, i) => (
				<Td key={i} contentEditable={true}>
					{value !== 0 ? value : ''}
				</Td>
			))}
			<Td>{sum !== 0 ? sum : ''}</Td>
			<Td>-</Td>
		</Tr>
	);
};
