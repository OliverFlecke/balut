import theme from 'styled-theming';

export const darkColors = {
	border: '#CCC',
	color: '#CCC',
	backgroundColor: '#000',
};

export const borderColor = theme('mode', {
	dark: darkColors.border,
});
