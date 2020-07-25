import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Li, Ul } from '../styles/elements';
import { navColor } from '../styles/colors';

interface NavigationProps {
	showMultiplayer: () => void;
}

export const Navigation = ({ showMultiplayer }: NavigationProps) => (
	<Nav>
		<NavUl>
			<NavLi>
				<Link to="/">Game</Link>
			</NavLi>
			<NavLi>
				<Link to="/rules">Rules</Link>
			</NavLi>
			<NavLi>
				<a onClick={showMultiplayer}>Multiplayer</a>
			</NavLi>
		</NavUl>
	</Nav>
);

const Nav = styled.nav`
	a {
		color: ${navColor};
		text-decoration: none;
		font-size: 1.2em;
		margin: 0 8px;
		cursor: pointer;
	}
`;

const NavUl = styled(Ul)`
	display: flex;
	flex-direction: row;
`;

const NavLi = styled(Li)``;
