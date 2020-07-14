import React, { useCallback } from 'react';
import {
	FaDiceFive,
	FaDiceFour,
	FaDiceOne,
	FaDiceSix,
	FaDiceThree,
	FaDiceTwo,
} from 'react-icons/fa/index';
import { IconBaseProps } from 'react-icons/lib';

interface DiceProps {
	dice: number;
	locked: boolean;
	index: number;
	toggleLock: (index: number) => void;
}

export const Dice = ({ dice, locked, index, toggleLock }: DiceProps) => {
	const onClick = useCallback(() => toggleLock(index), [toggleLock, index]);
	const color = locked ? 'red' : 'white';

	switch (dice) {
		case 1:
			return <FaDiceOne {...diceStyles} color={color} onClick={onClick} />;
		case 2:
			return <FaDiceTwo {...diceStyles} color={color} onClick={onClick} />;
		case 3:
			return <FaDiceThree {...diceStyles} color={color} onClick={onClick} />;
		case 4:
			return <FaDiceFour {...diceStyles} color={color} onClick={onClick} />;
		case 5:
			return <FaDiceFive {...diceStyles} color={color} onClick={onClick} />;
		case 6:
			return <FaDiceSix {...diceStyles} color={color} onClick={onClick} />;
	}
	return null;
};

const diceStyles: IconBaseProps = {
	size: 40,
};
