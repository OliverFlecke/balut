import { useCallback } from 'react';
import { Category } from '../../Category';
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
		<TdCell onClick={onClick} variant={suggestion ? 'suggestion' : 'default'}>
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
type TdCellProps = {
	variant: 'suggestion' | 'default';
} & React.DetailedHTMLProps<
	React.TdHTMLAttributes<HTMLTableDataCellElement>,
	HTMLTableDataCellElement
>;

const TdCell = (props: TdCellProps) => (
	<Td
		{...props}
		className={`py-1 h-8 select-none bg-gray-300 dark:bg-gray-700 ${
			props.variant === 'suggestion' ? 'text-blue-600' : ''
		}`}
	/>
);
