interface FinalScoreProps {
	points: number;
}

export const FinalScore = ({ points }: FinalScoreProps) => (
	<div className="flex justify-end w-full my-2 max-w-3xl">
		<div className="text-2xl border-b-2 border-white">
			<span>Final score: </span>
			<span>{points}</span>
		</div>
	</div>
);
