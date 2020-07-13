import React, { useCallback, useContext } from 'react';
import { Category } from '../../Category';
import { Td } from '../../styles/table';
import { StoreValue } from './state/actions/StoreValue';
import { BalutContext, Value } from './state/BalutState';

interface CellProps {
	category: Category;
	value: Value;
	index: number;
}

export const Cell = ({ category, value, index }: CellProps) => {
	const { dispatch } = useContext(BalutContext);

	const onChange = useCallback(
		(e: React.FormEvent<HTMLTableDataCellElement>) => {
			const v = e.currentTarget.textContent;
			if (v === null) {
				return;
			}

			const numberValue = Number(v);
			if (v?.toUpperCase() === 'X') {
				dispatch(new StoreValue(category, index, v.toUpperCase() as Value));
			} else if (!isNaN(numberValue)) {
				dispatch(new StoreValue(category, index, numberValue));
			}
		},
		[category, dispatch, index],
	);

	return (
		<Td
			contentEditable={true}
			onBlur={onChange}
			dangerouslySetInnerHTML={{ __html: valueToString(value) }}
		/>
	);
};

function valueToString(value: Value): string {
	if (value === undefined || value === null || value === 0) {
		return '';
	} else if (value === 'X') {
		return 'X';
	} else {
		return value.toString();
	}
}
