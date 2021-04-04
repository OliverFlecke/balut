import { Button } from '../../styles/elements';

interface BoardControlsProps {
	clearBoard?: () => void;
}

export const BoardControls = ({ clearBoard }: BoardControlsProps) => (
	<div className="flex justify-end">
		<Button onClick={clearBoard}>New game</Button>
	</div>
);
