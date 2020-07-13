import React, { useCallback, useMemo, useState } from 'react';
import { Category } from '../Category';
import { Value, RowState } from './BalutState';
import { Td, Th, Tr } from '../styles/table';

interface RowProps {
	category: Category;
	values: RowState;
}

export const Row = ({ category, values }: RowProps) => {
	const sum = useMemo(
		() => values.reduce((acc, x) => (acc ?? 0) + (x ?? 0), 0),
		[values],
	);
	const onChange = useCallback(() => {}, []);

	return (
		<Tr>
			<Th>{Category[category]}</Th>
			{values.map((value, i) => (
				<Td key={i} contentEditable={true} onChange={onChange}>
					{valueToString(value)}
				</Td>
			))}
			<Td>{sum !== 0 ? sum : ''}</Td>
			<Td>-</Td>
		</Tr>
	);
};

function valueToString(value: Value): number | string {
	if (value === null) {
		return 'X';
	} else if (value === undefined || value === 0) {
		return '';
	} else {
		return value;
	}
}
