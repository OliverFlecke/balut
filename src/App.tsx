import React, { useState } from 'react';
import styled, {
	ThemeProvider,
	css,
	createGlobalStyle,
} from 'styled-components';
import { Board } from './components/Board';
import { darkColors } from './styles/colors';
import theme from 'styled-theming';

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
		${mainStyles}
	}
`;

const H1 = styled.h1`
	margin: 0;
	font-family: Futura;
	font-size: 3em;
`;
