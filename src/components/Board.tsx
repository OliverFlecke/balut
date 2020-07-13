import React, { useReducer, useCallback } from 'react';
import styled from 'styled-components';
import { Category } from '../Category';
import { Table, Td, Tr } from '../styles/table';
import { enumValues } from '../utils/enums';
import { BalutContext, balutInitial, balutReducer } from './BalutState';
import { Row } from './Row';

const categories = enumValues(Category);

export const Board = () => {
	const reducer = useCallback(balutReducer, []);
	const [state, dispatch] = useReducer(reducer, balutInitial);
	console.log(state);

	return (
		<BalutContext.Provider value={{ state, dispatch }}>
			<Table>
				<HeaderRow />
				{categories.map((x) => (
					<Row
						key={x}
						category={x}
						values={state.values[(Category[x] as unknown) as number]}
					/>
				))}
			</Table>
		</BalutContext.Provider>
	);
};

const HeaderRow = () => {
	return (
		<Tr>
			<NameCell colSpan={5}>Name: </NameCell>
			<Td>Total</Td>
			<Td>Points</Td>
		</Tr>
	);
};

const NameCell = styled(Td)`
	text-align: left;
	border: none;
`;
