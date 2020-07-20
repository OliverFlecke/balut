import React, { useCallback, useEffect, useRef } from 'react';
// import { connection } from '../../connection';
import { Button } from '../../styles/elements';

export const Chat = () => {
	const username = 'Oliver';
	const sessionInputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		// connection.on('messageReceived', (username, message) => {
		// 	console.log(`${username}: ${message}`);
		// });
		// connection.on('joinedSession', (session, username) => {
		// 	console.log(`${username} joined ${session}`);
		// });
	}, []);

	const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			// connection.invoke(
			// 	'sendGroupMessage',
			// 	sessionInputRef.current?.value,
			// 	username,
			// 	e.currentTarget.value,
			// );
			e.currentTarget.value = '';
		}
	}, []);

	const joinSession = useCallback(() => {
		// connection.invoke('join', sessionInputRef.current?.value, username);
	}, []);

	return (
		<div>
			<div>
				<input ref={sessionInputRef} />
				<Button onClick={joinSession}>Join session</Button>
			</div>
			<h3>Send message</h3>
			<input onKeyDown={onKeyDown} />
		</div>
	);
};
