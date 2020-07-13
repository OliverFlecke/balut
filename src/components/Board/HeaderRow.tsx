import React from 'react';
import styled from 'styled-components';
import { Td, Tr } from '../../styles/table';

export const HeaderRow = () => (
	<thead>
		<Tr>
			<NameCell colSpan={5}>Name: </NameCell>
			<Td>Total</Td>
			<Td>Points</Td>
		</Tr>
	</thead>
);

const NameCell = styled(Td)`
	text-align: left;
	border: none;
`;
