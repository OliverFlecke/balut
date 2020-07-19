import React, { useCallback, useReducer } from 'react';
import { Category } from '../../Category';
import { Table } from '../../styles/table';
import { enumValues } from '../../utils/enums';
import { BoardControls } from './BoardControls';
import { FinalScore } from './FinalScore';
import { FooterRow } from './FooterRow';
import { HeaderRow } from './HeaderRow';
import { Row } from './Row';
import { categoryPoints, extraPointScore, sumValues } from './rules';
import { BalutContext, balutInitial, balutReducer } from './state/BalutState';
import * as signalR from '@microsoft/signalr';

const categories = enumValues(Category);

const connection = new signalR.HubConnectionBuilder().withUrl('/hub').build();

connection.on('messageReceived', (username, message) => {
	console.log(message);
});

connection
	.start()
	.then(() => connection.invoke('newMessage', 1, 'hello world'));

export const Board = () => {
	const reducer = useCallback(balutReducer, []);
	const [state, dispatch] = useReducer(reducer, balutInitial);

	const total = Object.keys(state.values)
		.map((key) => sumValues(state.values[key]))
		.reduce((a, b) => a + b);
	const extraPoints = extraPointScore(total);
	const totalPoints =
		extraPoints +
		enumValues(Category)
			.map((key) => {
				return categoryPoints(
					key,
					state.values[(Category[key] as unknown) as number],
				);
			})
			.reduce((a, b) => a + b, 0);

	return (
		<BalutContext.Provider value={{ state, dispatch }}>
			<Table>
				<HeaderRow />
				<tbody>
					{categories.map((x) => (
						<Row
							key={x}
							category={x}
							values={state.values[(Category[x] as unknown) as number]}
						/>
					))}
				</tbody>
				<FooterRow extraPoints={extraPoints} total={total} />
			</Table>
			<FinalScore points={totalPoints} />
			<BoardControls />
		</BalutContext.Provider>
	);
};
