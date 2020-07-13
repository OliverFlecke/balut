import React, { useState } from 'react';
import styled, {
	createGlobalStyle,
	css,
	ThemeProvider,
} from 'styled-components';
import theme from 'styled-theming';
import { Board } from './components/Board/Board';
import { darkColors } from './styles/colors';

function App() {
	const [theme, setCurrentTheme] = useState<string>(
		localStorage.getItem('theme') ?? 'dark',
	);

	// const setTheme = useCallback(
	// 	(theme: string) => {
	// 		localStorage.setItem('theme', theme);
	// 		setCurrentTheme(theme);
	// 	},
	// 	[setCurrentTheme],
	// );

	return (
		<ThemeProvider theme={{ mode: theme }}>
			<GlobalStyle />
			<Main>
				<header>
					<H1>Balut</H1>
				</header>
				<section>
					<Board />
				</section>
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
