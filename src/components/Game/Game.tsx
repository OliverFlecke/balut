import React, { useCallback, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/elements';
import { Dice } from './Dice';
import { RollAction } from './state/actions/RollAction';
import { gameReducer, initialGameState } from './state/GameState';
import { ToggleDiceAction } from './state/actions/ToggleDiceAction';
import { doRoll } from './state/gameUtils';
import { ResetRollAction } from './state/actions/ResetRollAction';

export const Game = () => {
	const [state, dispatch] = useReducer(gameReducer, initialGameState);
	const [roll, setRoll] = useState(state.roll);
	useEffect(() => setRoll(state.roll), [state.roll]);

	const executeRoll = useCallback(() => {
		const interval = setInterval(() => {
			setRoll(doRoll(state.locked, state.roll));
		}, 50);

		setTimeout(() => {
			clearInterval(interval);
			dispatch(new RollAction());
		}, 1000);
	}, [dispatch, state]);
	const toggleLock = useCallback(
		(index: number) => dispatch(new ToggleDiceAction(index)),
		[dispatch],
	);
	const newRoll = useCallback(() => {
		dispatch(new ResetRollAction());
	}, [dispatch]);

	return (
		<Container>
			<h3>
				{state.rollNumber === 0
					? 'Roll your dice!'
					: `Roll #${state.rollNumber} of 3`}
			</h3>
			<DiceContainer>
				{roll?.map((x, i) => (
					<Dice
						key={i}
						dice={x}
						index={i}
						toggleLock={toggleLock}
						locked={state.locked[i]}
					/>
				))}
			</DiceContainer>

			<ButtonContainer>
				<Button
					variant={state.rollNumber === 3 ? 'disabled' : 'primary'}
					onClick={executeRoll}
					disabled={state.rollNumber === 3}
				>
					Roll
				</Button>
				<Button variant="primary" onClick={newRoll}>
					New turn
				</Button>
			</ButtonContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const DiceContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
	display: flex;
	margin: 6px -6px;
`;
