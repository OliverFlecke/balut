import React from 'react';
import { maxWidth } from '../../styles/table';
import styled from 'styled-components';

interface FinalScoreProps {
	points: number;
}

export const FinalScore = ({ points }: FinalScoreProps) => (
	<Wrapper>
		<ScoreContainer>
			<span>Final score: </span>
			<span>{points}</span>
		</ScoreContainer>
	</Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	margin: 6px 0;
	max-width: ${maxWidth};
`;

const ScoreContainer = styled.div`
	font-size: 1.4em;
	border-bottom: 1px solid white;
`;
