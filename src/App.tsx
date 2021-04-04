import { useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Game } from './components/Game/Game';
import { MultiplayerGame } from './components/MultiplayerGame';
import { Navigation } from './components/Navigation';
import { Rules } from './components/Rules';
import { StartMultiplayerModal } from './components/StartMultiplayerModal';
import './index.css';
import { initial, reducer } from './state/AppState';

export const url = 'https://localhost:5001/play';

function App() {
	const [showMPModal, setShowMPModal] = useState(false);
	const [state, dispatch] = useReducer(reducer, initial());

	return (
		<Router>
			<main className="p-3 font-display w-full min-h-screen h-full bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
				<header className="flex flex-row justify-between">
					<h1 className="m-0 text-5xl no-underline">Balut</h1>
					<Navigation
						shouldShowMultiplayer={!!state.connection}
						showMultiplayer={() => setShowMPModal((x) => !x)}
					/>
				</header>

				<section>
					<Switch>
						<Route path="/rules">
							<Rules />
						</Route>
						<Route path="/">
							{state.session && state.connection && state.name ? (
								<MultiplayerGame
									name={state.name}
									players={state.players}
									connection={state.connection}
									session={state.session}
									dispatch={dispatch}
								/>
							) : (
								<Game />
							)}
						</Route>
					</Switch>
				</section>
				<StartMultiplayerModal
					state={state}
					dispatch={dispatch}
					visible={showMPModal}
					dismiss={() => setShowMPModal(false)}
					connection={state.connection}
				/>
			</main>
		</Router>
	);
}

export default App;
