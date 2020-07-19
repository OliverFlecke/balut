import React from 'react';
import styled from 'styled-components';
import { Category, categoryToString } from '../Category';
import { Li, Ul } from '../styles/elements';

const points = [
	[Category.Fours, '52 or more', 2],
	[Category.Fives, '65 or more', 2],
	[Category.Sixes, '78 or more', 2],
	[Category.Straight, 'All straights', 4],
	[Category.FullHouse, 'All full house', 3],
	[Category.Chance, '100 or more', 2],
	[Category.Balut, 'Each balut', 2],
];

const extraPoints = [
	[0, 299, -2],
	[300, 349, -1],
	[350, 399, 0],
	[400, 449, 1],
	[450, 499, 2],
	[500, 549, 3],
	[549, 599, 4],
	[600, 649, 5],
	[650, 'or above', 6],
];

export const Rules = () => {
	return (
		<Container>
			<Wrapper>
				<h3>How to calculate points</h3>
				<Ul>
					{points.map(([category, description, points]) => (
						<Li key={category}>
							<span>
								{categoryToString(category as Category)} - {description}
							</span>
							<strong>{points} points</strong>
						</Li>
					))}
				</Ul>
				<h4>Extra points from total score</h4>
				<Ul>
					{extraPoints.map(([lower, higher, points]) => (
						<Li key={points}>
							<span>
								{lower} - {higher}
							</span>
							<strong>{points} points</strong>
						</Li>
					))}
				</Ul>
			</Wrapper>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const Wrapper = styled.div`
	width: 100%;
	max-width: 350px;
`;
