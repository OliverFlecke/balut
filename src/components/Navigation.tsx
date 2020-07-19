import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Li, Ul } from '../styles/elements';
import { navColor } from '../styles/colors';

export const Navigation = () => (
	<Nav>
		<NavUl>
			<NavLi>
				<Link to="/">Game</Link>
			</NavLi>
			<NavLi>
				<Link to="/rules">Rules</Link>
			</NavLi>
			{/* <NavLi>
				<Link to="/chat">Chat</Link>
			</NavLi> */}
		</NavUl>
	</Nav>
);

const Nav = styled.nav`
	a {
		color: ${navColor};
		text-decoration: none;
	}
`;

const NavUl = styled(Ul)`
	display: flex;
	flex-direction: row;
`;

const NavLi = styled(Li)`
	margin: 0 8px;
	font-size: 1.2em;
`;
