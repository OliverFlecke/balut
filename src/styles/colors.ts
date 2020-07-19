import theme from 'styled-theming';

export const darkColors = {
	border: '#CCC',
	color: '#CCC',
	backgroundColor: '#000',
	secondaryBackgroundColor: '#222',
	suggestion: '#09F',
	navColor: '#09C',
};

export const borderColor = theme('mode', {
	dark: darkColors.border,
});

export const navColor = theme('mode', {
	dark: darkColors.navColor,
});
