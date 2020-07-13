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
				Clear
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 6px 0;
`;
