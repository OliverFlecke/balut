import React, { useCallback, useContext } from 'react';
import { Button } from '../../styles/elements';
import { ClearBoard } from './state/actions/ClearBoard';
import { BalutContext } from './state/BalutState';
import styled from 'styled-components';

export const BoardControls = () => {
	const { dispatch } = useContext(BalutContext);
	const clearBoard = useCallback(() => {
		dispatch(new ClearBoard());
	}, [dispatch]);

	return (
		<Wrapper>
			<Button variant="primary" onClick={clearBoard}>
				New game
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: right;
	margin: 0 -6px -6px;
`;
