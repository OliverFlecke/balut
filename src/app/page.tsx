'use client';

import { Game } from '../components/Game/Game';
import { MultiplayerGame } from '../components/MultiplayerGame';
import { useAppContext } from '../state/AppContext';

export default function HomePage() {
	const { state, dispatch } = useAppContext();

	if (state.session && state.connection && state.name) {
		return (
			<MultiplayerGame
				name={state.name}
				players={state.players}
				connection={state.connection}
				session={state.session}
				dispatch={dispatch}
			/>
		);
	}

	return <Game />;
}
