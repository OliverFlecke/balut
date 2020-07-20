import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/elements';

interface BoardControlsProps {
	clearBoard?: () => void;
}

export const BoardControls = ({ clearBoard }: BoardControlsProps) => (
	<Wrapper>
		<Button variant="primary" onClick={clearBoard}>
			New game
		</Button>
	</Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	justify-content: right;
	margin: 0 -6px -6px;
`;
