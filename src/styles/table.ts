import styled from 'styled-components';
import { borderColor } from './colors';

export const maxWidth = '760px';

export const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	max-width: ${maxWidth};
`;

export const Tr = styled.tr``;
export const Th = styled.th`
	text-align: left;
	border: 1px solid ${borderColor};
	padding: 4px;
`;
export const Td = styled.td`
	border: 1px solid ${borderColor};
	padding: 4px;
	text-align: center;
	min-width: 20px;
`;
