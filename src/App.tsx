import React, { useCallback, useState } from 'react';
import styled, {
	createGlobalStyle,
	css,
	ThemeProvider,
} from 'styled-components';
import theme from 'styled-theming';
import { Game } from './components/Game/Game';
import { Rules } from './components/Rules';
import { darkColors } from './styles/colors';
import { Chat } from './components/Chat/Chat';

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

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<GlobalStyle />
			<Main>
				<header>
					<H1>Balut</H1>
				</header>
				<section>
					<Game />
				</section>
				<section>
					<Chat />
				</section>
				<Rules />
			</Main>
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

const H1 = styled.h1`
	margin: 0;
	font-size: 3em;
`;
