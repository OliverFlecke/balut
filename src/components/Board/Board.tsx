import React from 'react';
import { Category } from '../../Category';
import { Table } from '../../styles/table';
import { enumValues } from '../../utils/enums';
import { Roll, WriteValue } from '../Game/state/GameState';
import { sumNumbers } from '../Game/state/gameUtils';
import { FinalScore } from './FinalScore';
import { FooterRow } from './FooterRow';
import { HeaderRow } from './HeaderRow';
import { Row } from './Row';
import { categoryPoints, extraPointScore, sumValues } from './rules';
import { BalutValues } from './state/BalutState';

const categories = enumValues(Category);

interface BoardProps {
	values: BalutValues;
	roll?: Roll;
	writeValue?: WriteValue;
}

export const Board = ({ values, roll, writeValue }: BoardProps) => {
	const total = sumNumbers(
		Object.keys(values).map((key) => sumValues(values[key])),
	);
	const extraPoints = extraPointScore(total);
	const totalPoints =
		extraPoints +
		sumNumbers(
			enumValues(Category).map((key) => {
				return categoryPoints(
					key,
					values[(Category[key] as unknown) as number],
				);
			}),
		);

	return (
		<>
			<Table>
				<HeaderRow />
				<tbody>
					{categories.map((x) => (
						<Row
							key={x}
							category={x}
							values={values[(Category[x] as unknown) as number]}
							roll={roll}
							writeValue={writeValue}
						/>
					))}
				</tbody>
				<FooterRow extraPoints={extraPoints} total={total} />
			</Table>
			<FinalScore points={totalPoints} />
		</>
	);
};
