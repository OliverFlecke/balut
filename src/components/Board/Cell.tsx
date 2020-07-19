import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { Category } from '../../Category';
import { darkColors } from '../../styles/colors';
import { Td } from '../../styles/table';
import { StoreValue } from './state/actions/StoreValue';
import { BalutContext, Value } from './state/BalutState';

interface CellProps {
	category: Category;
	value: Value;
	suggestion?: Value;
	index: number;
}

export const Cell = ({ category, value, index, suggestion }: CellProps) => {
	const { dispatch } = useContext(BalutContext);

	// const onChange = useCallback(
	// 	(e: React.FormEvent<HTMLTableDataCellElement>) => {
	// 		const v = e.currentTarget.textContent;
	// 		if (v === null) {
	// 			return;
	// 		}

	// 		const numberValue = Number(v);
	// 		if (v?.toUpperCase() === 'X') {
	// 			dispatch(new StoreValue(category, index, v.toUpperCase() as Value));
	// 		} else if (!isNaN(numberValue)) {
	// 			dispatch(new StoreValue(category, index, numberValue));
	// 		}
	// 	},
	// 	[category, dispatch, index],
	// );

	const onClick = useCallback(() => {
		if (suggestion) {
			dispatch(new StoreValue(category, index, suggestion));
		}
	}, [dispatch, index, suggestion, category]);

	return (
		<TdCell
			onClick={onClick}
			variant={suggestion ? 'suggestion' : 'default'}
			// contentEditable={true}
			// onBlur={onChange}
			// dangerouslySetInnerHTML={{ __html: valueToString(value ?? suggestion) }}
		>
			{valueToString(value !== null ? value : suggestion)}
		</TdCell>
	);
};

function valueToString(value?: Value): string {
	if (value === undefined || value === null || value === 0) {
		return '';
	} else if (value === 'X') {
		return 'X';
	} else {
		return value.toString();
	}
}

const backgroundColor = theme('mode', {
	dark: darkColors.secondaryBackgroundColor,
});

const color = theme.variants('mode', 'variant', {
	default: { dark: darkColors.color },
	suggestion: { dark: darkColors.suggestion },
});

const TdCell = styled(Td)`
	background-color: ${backgroundColor};
	color: ${color};
	user-select: none;
`;
