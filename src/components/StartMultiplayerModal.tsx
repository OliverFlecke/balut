import { HubConnection } from '@microsoft/signalr';
import { useCallback, useEffect, useRef, useState } from 'react';
import { url } from '../App';
import { initConnection } from '../connection';
import {
	AddPlayerAction,
	SetConnectionAction,
	SetNameAction,
	SetSessionAction,
} from '../state/AppActions';
import { Action, AppState } from '../state/AppState';
import { Button, Form, H3, Input, Line } from '../styles/elements';
import { Modal } from './Modal';

interface StartMultiplayerModalProps {
	visible: boolean;
	dismiss: () => void;
	state: AppState;
	dispatch: React.Dispatch<Action>;
	connection?: HubConnection;
}

export const StartMultiplayerModal = ({
	visible,
	dismiss,
	state,
	dispatch,
	connection,
}: StartMultiplayerModalProps) => {
	const [failed, setFailed] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const sessionRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (connection) {
			connection.on('joinedSession', (session, newPlayer) => {
				console.log(`${newPlayer} joined ${session}`);
				dispatch(new AddPlayerAction(newPlayer));

				connection.invoke('sendWelcome', session, state.name);
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
	}, [connection, state.name, dispatch]);

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
	const joinGame = useCallback(
		(connection?: HubConnection, session?: string, name?: string) => {
			console.log(`${name} is joining ${session}`);

			if (connection && session && name) {
				connection.invoke('join', session, name);
				dispatch(new SetSessionAction(session));
				dispatch(new SetNameAction(name));
				dismiss();
			}
		},
		[dismiss, dispatch],
	);
	const joinGameSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			joinGame(connection, sessionRef.current?.value, nameRef.current?.value);
		},
		[connection, joinGame],
	);

	useEffect(() => {
		initConnection(url)
			.then((connection) => {
				dispatch(new SetConnectionAction(connection));

				if (state.session && state.name) {
					joinGame(connection, state.session, state.name);
				}
			})
			.catch(() => setFailed(true));
	}, [dispatch, joinGame, setFailed, state.name, state.session]);

	if (failed) {
		return (
			<Modal visible={visible} dismiss={dismiss}>
				<>Could not reach server. Try again later</>
			</Modal>
		);
	}

	return (
		<Modal visible={visible} dismiss={dismiss}>
			<div className="flex flex-col justify-center">
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
			</div>
		</Modal>
	);
};