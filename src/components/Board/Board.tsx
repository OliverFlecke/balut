import React, { useReducer, useCallback } from 'react';
import styled from 'styled-components';
import { Category } from '../../Category';
import { Table, Td, Tr } from '../../styles/table';
import { enumValues } from '../../utils/enums';
import {
	BalutContext,
	balutInitial,
	balutReducer,
	BalutValues,
} from './state/BalutState';
import { Row } from './Row';
import { BoardControls } from './BoardControls';
import { sumValues, finalPointScore } from './rules';

const categories = enumValues(Category);

export const Board = () => {
	const reducer = useCallback(balutReducer, []);
	const [state, dispatch] = useReducer(reducer, balutInitial);
	console.log(state.values);

	return (
		<BalutContext.Provider value={{ state, dispatch }}>
			<Table>
				<HeaderRow />
				<tbody>
					{categories.map((x) => (
						<Row
							key={x}
							category={x}
							values={state.values[(Category[x] as unknown) as number]}
						/>
					))}
				</tbody>
				<FooterRow values={state.values} />
			</Table>
			<BoardControls />
		</BalutContext.Provider>
	);
};

const HeaderRow = () => {
	return (
		<thead>
			<Tr>
				<NameCell colSpan={5}>Name: </NameCell>
				<Td>Total</Td>
				<Td>Points</Td>
			</Tr>
		</thead>
	);
};

const NameCell = styled(Td)`
	text-align: left;
	border: none;
`;

interface FooterRowProps {
	values: BalutValues;
}

const FooterRow = ({ values }: FooterRowProps) => {
	const total = Object.keys(values)
		.map((key) => sumValues(values[key]))
		.reduce((a, b) => a + b);
	const extraPoints = finalPointScore(total);

	return (
		<tfoot>
			<Tr>
				<td colSpan={5} />
				<Td>{total}</Td>
				<Td>{extraPoints}</Td>
			</Tr>
		</tfoot>
	);
};
