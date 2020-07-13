import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Td, Tr } from '../../styles/table';
import { BalutContext } from './state/BalutState';
import { ChangeName } from './state/actions/ChangeName';

export const HeaderRow = () => {
	const { state, dispatch } = useContext(BalutContext);
	const onBlur = useCallback(
		(e: React.FormEvent<HTMLSpanElement>) => {
			dispatch(new ChangeName(e.currentTarget.innerText ?? undefined));
		},
		[dispatch],
	);

	return (
		<thead>
			<Tr>
				<NameCell colSpan={5}>
					<NameWrapper>
						Name:
						<NameInputField
							contentEditable={true}
							onBlur={onBlur}
							dangerouslySetInnerHTML={{ __html: state.name ?? '' }}
						/>
					</NameWrapper>
				</NameCell>
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

const NameWrapper = styled.div`
	display: flex;
`;

const NameInputField = styled.span`
	width: 100%;
	flex-grow: 1;
	margin: 0 6px;
`;
