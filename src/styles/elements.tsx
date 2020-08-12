import styled from 'styled-components';
import theme from 'styled-theming';
import { darkColors } from './colors';
import tw from 'tailwind.macro';

const backgroundColor = theme.variants('mode', 'variant', {
	disabled: { dark: 'darkgray' },
	primary: { dark: 'darkblue' },
});
const color = theme.variants('mode', 'variant', {
	disabled: { dark: darkColors.color },
	primary: { dark: darkColors.color },
});

export const Button = styled.button`
	/* background-color: ${backgroundColor}; */
	color: ${color};

	${tw`bg-blue-500 rounded p-2 pr-3 pl-3 m-1 text-xl`}
`;

export const Ul = styled.ul`
	display: inline;
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

export const Li = styled.li`
	display: flex;
	justify-content: space-between;
`;
