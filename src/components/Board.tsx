import React from 'react';
import styled from 'styled-components';
import { Category } from '../Category';
import { Table, Td, Tr } from '../styles/table';
import { enumValues } from '../utils/enums';
import { Row } from './Row';

const categories = enumValues(Category);

export const Board = () => {
	return (
		<Table>
			<HeaderRow />
			{categories.map((x) => (
				<Row key={x} category={x} />
			))}
		</Table>
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
