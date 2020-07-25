import { HubConnection } from '@microsoft/signalr';
import React, { useCallback, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PlayerState } from '../state/AppState';
import { Board } from './Board/Board';
import { Game } from './Game/Game';

interface MultiplayerGameProps {
	name: string;
	players: PlayerState[];
	connection: HubConnection;
	session: string;
}

export const MultiplayerGame = ({
	name,
	players,
	connection,
	session,
}: MultiplayerGameProps) => {
	const [index, setIndex] = useState(0);
	const onSelect = useCallback(() => {}, []);

	const onTurnFinished = useCallback(
		(values) => {
			connection.invoke('sendState', session, name, values);
		},
		[connection, session, name],
	);

	return (
		<div>
			<Tabs selectedIndex={index} onSelect={onSelect}>
				<TabList>
					<Tab>Me</Tab>
					{players.map((player) => (
						<Tab key={player.name}>{player.name}</Tab>
					))}
				</TabList>

				<TabPanel>
					<Game onTurnFinished={onTurnFinished} />
				</TabPanel>
				{players.map((player) => (
					<TabPanel key={player.name}>
						<Board values={player.values} />
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
};
