import React, { useCallback } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { Category } from '../../Category';
import { darkColors } from '../../styles/colors';
import { Td } from '../../styles/table';
import { WriteValue, Value } from '../Game/state/GameState';

interface CellProps {
	category: Category;
	value: Value;
	suggestion?: Value;
	index: number;
	writeValue?: WriteValue;
}

export const Cell = ({
	category,
	value,
	index,
	suggestion,
	writeValue,
}: CellProps) => {
	const onClick = useCallback(() => {
		if (suggestion && writeValue) {
			writeValue(category, index, suggestion);
		}
	}, [writeValue, index, suggestion, category]);

	return (
		<TdCell
			onClick={onClick}
			variant={suggestion ? 'suggestion' : 'default'}
			className={'bg-blue-400'}
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
	padding: 0 4px;
	height: 2em;
`;
