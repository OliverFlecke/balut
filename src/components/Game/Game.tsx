import React, { useCallback, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../Category';
import { Button } from '../../styles/elements';
import { Board } from '../Board/Board';
import { BoardControls } from '../Board/BoardControls';
import { Dice } from './Dice';
import { ClearBoard } from './state/actions/ClearBoard';
import { ResetRollAction } from './state/actions/ResetRollAction';
import { RollAction } from './state/actions/RollAction';
import { StoreValue } from './state/actions/StoreValue';
import { ToggleDiceAction } from './state/actions/ToggleDiceAction';
import {
	gameReducer,
	initialGameState,
	Value,
	BalutValues,
} from './state/GameState';
import { doRoll } from './state/gameUtils';

interface GameProps {
	onTurnFinished?: (values: BalutValues) => void;
}

export const Game = ({ onTurnFinished }: GameProps) => {
	const [state, dispatch] = useReducer(gameReducer, initialGameState());
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
	const writeValue = useCallback(
		(category: Category, index: number, value: Value) => {
			dispatch(new StoreValue(category, index, value));
			newRoll();
			if (onTurnFinished) {
				onTurnFinished(state.values);
			}
		},
		[dispatch, newRoll, state, onTurnFinished],
	);
	const clearBoard = useCallback(() => {
		dispatch(new ClearBoard());
		dispatch(new ResetRollAction());
	}, [dispatch]);

	return (
		<Container>
			<Board roll={state.roll} values={state.values} writeValue={writeValue} />
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
			</ButtonContainer>

			<BoardControls clearBoard={clearBoard} />
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
