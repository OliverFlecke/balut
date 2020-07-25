import React, { useCallback, useEffect, useReducer, useState } from 'react';
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
import { initConnection } from './connection';
import {
	SetConnectionAction,
	SetSessionAction,
	UpdatePlayerStateAction,
} from './state/AppActions';
import { initial, reducer } from './state/AppState';
import { darkColors } from './styles/colors';

const url = 'https://localhost:5001/play';

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

	const [state, dispatch] = useReducer(reducer, initial);

	// TODO: This should be callable by the user
	useEffect(() => {
		initConnection(url).then((connection) => {
			dispatch(new SetConnectionAction(connection));
			connection.on('createdSession', (session) => {
				dispatch(new SetSessionAction(session));
			});
			connection.invoke('createGame');

			connection.on('newState', (name, values) => {
				dispatch(new UpdatePlayerStateAction(name, values));
			});
		});
	}, []);

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<GlobalStyle />
			<Router>
				<Main>
					<Header>
						<H1>Balut</H1>
						<Navigation />
					</Header>

					<section>
						<Switch>
							{/* <Route path="/chat">
								<Chat />
							</Route> */}
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
									/>
								) : (
									<Game />
								)}
							</Route>
						</Switch>
					</section>
					{/* <Chat username={'Oliver'} /> */}
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
