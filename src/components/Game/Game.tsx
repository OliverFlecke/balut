import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../styles/elements';
import { Dice } from './Dice';
import styled from 'styled-components';

export const Game = () => {
	const [roll, setRoll] = useState<Roll | undefined>();
	const [locked, setLocked] = useState(
		[...Array(5)].map(() => false) as RollLock,
	);
	const doRoll = useCallback(() => {
		const interval = setInterval(() => {
			setRoll(executeRoll(locked, roll));
		}, 50);

		setTimeout(() => {
			clearInterval(interval);
		}, 1000);
	}, [setRoll, locked, roll]);
	const toggleLock = useCallback(
		(index: number) => {
			setLocked((ls) => ls.map((l, i) => (i === index ? !l : l)) as RollLock);
		},
		[setLocked],
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setRoll(executeRoll(locked, roll)), []);

	return (
		<div>
			<DiceContainer>
				{roll?.map((x, i) => (
					<Dice
						key={i}
						dice={x}
						index={i}
						toggleLock={toggleLock}
						locked={locked[i]}
					/>
				))}
			</DiceContainer>

			<div>
				<Button variant="primary" onClick={doRoll}>
					Roll
				</Button>
			</div>
		</div>
	);
};

const DiceContainer = styled.div`
	display: flex;
	justify-content: center;
`;

type Roll = [number, number, number, number, number];
type RollLock = [boolean, boolean, boolean, boolean, boolean];

function executeRoll(locked: RollLock, current?: Roll): Roll {
	return (current ?? [...Array(5)]).map((v, i) =>
		locked[i] ? v : randomDice(),
	) as Roll;
}

function randomDice(): number {
	return Math.floor(Math.random() * 6) + 1;
}
