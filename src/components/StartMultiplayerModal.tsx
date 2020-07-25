import { HubConnection } from '@microsoft/signalr';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { url } from '../App';
import { initConnection } from '../connection';
import {
	AddPlayerAction,
	SetConnectionAction,
	SetSessionAction,
	SetNameAction,
} from '../state/AppActions';
import { Action } from '../state/AppState';
import { Button } from '../styles/elements';
import { Modal } from './Modal';

interface StartMultiplayerModalProps {
	visible: boolean;
	name?: string;
	dismiss: () => void;
	dispatch: React.Dispatch<Action>;
	connection?: HubConnection;
}

export const StartMultiplayerModal = ({
	name,
	visible,
	dismiss,
	dispatch,
	connection,
}: StartMultiplayerModalProps) => {
	const [failed, setFailed] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const sessionRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		initConnection(url)
			.then((connection) => {
				dispatch(new SetConnectionAction(connection));
			})
			.catch(() => setFailed(true));
	}, [dispatch, setFailed]);

	useEffect(() => {
		if (connection) {
			connection.on('joinedSession', (session, newPlayer) => {
				console.log(`${newPlayer} joined ${session}`);
				dispatch(new AddPlayerAction(newPlayer));

				connection.invoke('sendWelcome', session, name);
			});
			connection.on('welcomeFrom', (otherPlayer) => {
				console.log(`${otherPlayer} says welcome`);
				dispatch(new AddPlayerAction(otherPlayer));
			});
		}
		return () => {
			connection?.off('joinedSession');
			connection?.off('welcomeFrom');
		};
	}, [connection, name, dispatch]);

	// Start game
	const startGame = useCallback(() => {
		if (connection) {
			connection.on('createdSession', (session) => {
				dispatch(new SetSessionAction(session));
				dismiss();
			});
			connection.invoke('createGame');
			dispatch(new SetNameAction(nameRef.current?.value ?? ''));
		}
	}, [connection, dispatch, dismiss]);
	const startGameSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			startGame();
		},
		[startGame],
	);

	// Join game
	const joinGame = useCallback(() => {
		if (connection) {
			const session = sessionRef.current?.value;
			const name = nameRef.current?.value ?? '';
			connection.invoke('join', session, name);
			dispatch(new SetNameAction(name));
			dismiss();
		}
	}, [connection, sessionRef, nameRef, dismiss, dispatch]);
	const joinGameSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			joinGame();
		},
		[joinGame],
	);

	if (failed) {
		return (
			<Modal visible={visible} dismiss={dismiss}>
				<>Could not reach server. Try again later</>
			</Modal>
		);
	}

	return (
		<Modal visible={visible} dismiss={dismiss}>
			<Container>
				<H3>Create new game</H3>
				<Form onSubmit={startGameSubmit}>
					<Input ref={nameRef} placeholder="Your name" />
					<Button type="submit">Start</Button>
				</Form>
				<Line />
				<H3>Join a game</H3>
				<Form onSubmit={joinGameSubmit}>
					<Input ref={sessionRef} placeholder="Enter code" />
					<Button type="submit">Join</Button>
				</Form>
			</Container>
		</Modal>
	);
};

const Input = styled.input`
	border-radius: 6px;
	padding: 6px;
	margin: 6px 0;
`;

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const H3 = styled.h3`
	padding: 0;
	margin: 0;
	margin-bottom: 6px;
	text-align: center;
`;

const Line = styled.hr`
	width: 100%;
`;
