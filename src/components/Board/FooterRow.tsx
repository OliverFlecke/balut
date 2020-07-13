import React from 'react';
import { Tr, Td } from '../../styles/table';

interface FooterRowProps {
	total: number;
	extraPoints: number;
}

export const FooterRow = ({ total, extraPoints }: FooterRowProps) => (
	<tfoot>
		<Tr>
			<td colSpan={5} />
			<Td>{total}</Td>
			<Td>{extraPoints}</Td>
		</Tr>
	</tfoot>
);
