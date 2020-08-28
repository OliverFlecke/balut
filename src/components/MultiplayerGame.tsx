import { HubConnection } from '@microsoft/signalr';
import React, { useCallback, useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PlayerState, Action } from '../state/AppState';
import { Board } from './Board/Board';
import { Game } from './Game/Game';
import { UpdatePlayerStateAction } from '../state/AppActions';
import { RTC } from './RTC/RTC';

interface MultiplayerGameProps {
	name: string;
	players: PlayerState[];
	connection: HubConnection;
	session: string;
	dispatch: React.Dispatch<Action>;
}

export const MultiplayerGame = ({
	name,
	players,
	connection,
	session,
	dispatch,
}: MultiplayerGameProps) => {
	const [index, setIndex] = useState(0);
	const onSelect = useCallback(
		(index) => {
			setIndex(index);
		},
		[setIndex],
	);

	const onTurnFinished = useCallback(
		(values) => {
			console.log('Sending state');
			connection.invoke('sendState', session, name, values);
		},
		[connection, session, name],
	);
	useEffect(() => {
		connection.on('newState', (name, values) => {
			dispatch(new UpdatePlayerStateAction(name, values));
		});
	}, [connection, dispatch]);

	return (
		<div>
			{/* <Tabs selectedIndex={index} onSelect={onSelect}>
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
			</Tabs> */}
			<RTC hubConnection={connection} name={name} session={session} />
		</div>
	);
};
