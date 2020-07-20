import React from 'react';
import { Td, Tr } from '../../styles/table';

export const HeaderRow = () => (
	<thead>
		<Tr>
			<td colSpan={5}></td>
			<Td>Total</Td>
			<Td>Points</Td>
		</Tr>
	</thead>
);
