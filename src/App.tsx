import React, { useCallback, useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, {
	createGlobalStyle,
	css,
	ThemeProvider,
} from 'styled-components';
import theme from 'styled-theming';
import { Game } from './components/Game/Game';
import { MultiplayerGame } from './components/MultiplayerGame';
import { Navigation } from './components/Navigation';
import { Rules } from './components/Rules';
import { StartMultiplayerModal } from './components/StartMultiplayerModal';
import { initial, reducer } from './state/AppState';
import { darkColors } from './styles/colors';
import './index.css';

export const url = 'https://localhost:5001/play';

function App() {
	const [theme, setCurrentTheme] = useState<string>(
		localStorage.getItem('theme') ?? 'dark',
	);
	const setTheme = useCallback(
		(theme: string) => {
			localStorage.setItem('theme', theme);
			setCurrentTheme(theme);
		},
		[setCurrentTheme],
	);
	const [showMPModal, setShowMPModal] = useState(false);
	const [state, dispatch] = useReducer(reducer, initial());

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<GlobalStyle />
			<Router>
				<Main>
					<Header>
						<H1>Balut</H1>
						<Navigation
							shouldShowMultiplayer={!!state.connection}
							showMultiplayer={() => setShowMPModal((x) => !x)}
						/>
					</Header>

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
				</Main>
			</Router>
		</ThemeProvider>
	);
}

export default App;

const mainStyles = theme('mode', {
	dark: css`
		background-color: ${darkColors.backgroundColor};
		color: ${darkColors.color};
	`,
});

const Main = styled.main`
	${mainStyles}
	padding: 12px;
`;

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		height: 100%;
		width: 100%;
		font-family: Futura;
		${mainStyles}
	}
`;

const Header = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const H1 = styled.h1`
	margin: 0;
	font-size: 3em;
	text-decoration: none !important;
`;
