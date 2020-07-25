import React, { useCallback, useEffect, useRef, useState } from 'react';
import { initConnection } from '../../connection';
import { Button } from '../../styles/elements';
import { HubConnection } from '@microsoft/signalr';

interface ChatProps {
	username: string;
}

export const Chat = ({ username }: ChatProps) => {
	const sessionInputRef = useRef<HTMLInputElement>(null);
	const [connection, setConnection] = useState<HubConnection | undefined>();
	useEffect(() => {
		initConnection('https://localhost:5001/play').then((x) => setConnection(x));
	}, [setConnection]);

	useEffect(() => {
		if (!connection) {
			return;
		}
		connection.on('messageReceived', (username, message) => {
			console.log(`${username}: ${message}`);
		});
		connection.on('joinedSession', (session, username) => {
			console.log(`${username} joined ${session}`);
		});
		connection.on('createdSession', (session) => {
			console.log(session);
		});
	}, [connection]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (connection && e.key === 'Enter') {
				connection.invoke(
					'sendGroupMessage',
					sessionInputRef.current?.value,
					username,
					e.currentTarget.value,
				);
				e.currentTarget.value = '';
			}
		},
		[connection, sessionInputRef, username],
	);

	const joinSession = useCallback(() => {
		if (connection) {
			connection.invoke('join', sessionInputRef.current?.value, username);
		}
	}, [connection, sessionInputRef, username]);
	const createGame = useCallback(() => {
		if (connection) {
			connection.invoke('createGame');
		}
	}, [connection]);

	if (!connection) {
		return <div>Connecting to server</div>;
	}

	return (
		<div>
			<div>
				<input ref={sessionInputRef} />
				<Button onClick={createGame}>Create game</Button>
				<Button onClick={joinSession}>Join session</Button>
			</div>
			<h3>Send message</h3>
			<input onKeyDown={onKeyDown} />
		</div>
	);
};
