import { useMemo } from "react";
import { type Category, categoryToString } from "../../Category";
import { Td, Th, Tr } from "../../styles/table";
import type { Roll, RowState, WriteValue } from "../Game/state/GameState";
import { Cell } from "./Cell";
import { calculateSuggestion, categoryPoints, sumValues } from "./rules";

const CELL_KEYS = ["cell-0", "cell-1", "cell-2", "cell-3"];

interface RowProps {
	category: Category;
	values: RowState;
	roll?: Roll;
	writeValue?: WriteValue;
}

export const Row = ({ category, values, roll, writeValue }: RowProps) => {
	const title = useMemo(() => categoryToString(category), [category]);
	const sum = sumValues(values);
	const points = categoryPoints(category, values);
	const suggestion = calculateSuggestion(category, roll);
	const first = values.indexOf(null);

	return (
		<Tr>
			<Th>{title}</Th>
			{values.map((value, i) => (
				<Cell
					key={CELL_KEYS[i]}
					index={i}
					value={value}
					category={category}
					suggestion={
						first === i ? (suggestion === 0 ? "X" : suggestion) : undefined
					}
					writeValue={writeValue}
				/>
			))}
			<Td>{sum}</Td>
			<Td>{points}</Td>
		</Tr>
	);
};
