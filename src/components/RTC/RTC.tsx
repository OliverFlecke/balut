import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HubConnection } from '@microsoft/signalr';
import {
	answerCall,
	createPeerConnection,
	setupOnNegotiationNeeded,
} from './connectionHandler';
import { RemoteVideo } from './RemoteVideo';
import { Button } from '../../styles/elements';

const mediaConstraints = { video: true };

interface RTCProps {
	username: string;
	session: string;
	hubConnection: HubConnection;
	players: string[];
}

export const RTC = ({
	username,
	session,
	hubConnection,
	players,
}: RTCProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [connections, setConnections] = useState<Connection[]>([]);

	const setRemoteStream = (username: string, stream: MediaStream) => {
		console.debug(`Setting stream for ${username}`);
		setConnections((cs) =>
			cs.map((connection) =>
				connection.username === username
					? {
							...connection,
							stream,
					  }
					: connection,
			),
		);
	};

	useEffect(() => {
		if (!navigator.mediaDevices) {
			console.error('There is no media device');
			return;
		}
		navigator.mediaDevices
			.getUserMedia(mediaConstraints)
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		hubConnection.on('callFrom', (otherUser, target, type, obj) => {
			if (target !== username) {
				return;
			}

			switch (type) {
				case 'video-offer':
					const peerConnection = answerCall(
						hubConnection,
						username,
						otherUser,
						session,
						obj,
						videoRef.current?.srcObject as MediaStream,
						setRemoteStream,
					);
					setConnections((x) =>
						x
							.filter((x) => x.username !== otherUser)
							.concat([
								{
									username: otherUser,
									peerConnection: peerConnection,
								},
							]),
					);
					break;
				case 'video-answer':
					{
						console.log(`Answer from ${otherUser}`);
						const description = new RTCSessionDescription(obj);

						setConnections((cs) =>
							cs.map((connection) => {
								if (
									connection.username === otherUser &&
									!connection.peerConnection.remoteDescription
								) {
									connection.peerConnection
										.setRemoteDescription(description)
										.catch((err) => console.error(err));
								}
								return connection;
							}),
						);
					}
					break;
				case 'new-ice-candidate':
					{
						// console.debug('Handling ice candidate');
						const candidate = new RTCIceCandidate(obj);
						setConnections((cs) =>
							cs.map((connection) => {
								if (connection.username === otherUser) {
									connection.peerConnection
										.addIceCandidate(candidate)
										.catch((err) => console.error(err));
								}
								return connection;
							}),
						);
					}
					break;
				default:
					console.error(`Could not understand type ${type}`);
					break;
			}
		});

		return () => {
			hubConnection.off('callFrom');
		};
	}, []);

	// This will call all other known players in the session
	const call = useCallback(() => {
		const stream = videoRef.current?.srcObject as MediaStream;
		players.forEach((player) => {
			if (connections.some((x) => x.username === player)) {
				return;
			}
			console.log(`Calling ${player}`);
			const peerConnection = createPeerConnection(
				hubConnection,
				username,
				player,
				session,
				setRemoteStream,
			);
			setupOnNegotiationNeeded(
				peerConnection,
				hubConnection,
				session,
				username,
				player,
			);
			setConnections((c) =>
				c
					.filter((x) => x.username !== player)
					.concat([
						{
							username: player,
							peerConnection,
						},
					]),
			);

			stream
				.getTracks()
				.forEach((track) => peerConnection.addTrack(track, stream));
		});
	}, [players]);

	return (
		<div className="flex flex-col justify-center items-center">
			<Button onClick={call}>Call</Button>
			<div className="flex flex-row">
				<div>
					<h2>{username}</h2>
					<video
						ref={videoRef}
						autoPlay={true}
						muted={true}
						height={'200'}
						width={'200'}
					/>
				</div>
				{connections
					.filter((x) => x.stream !== undefined)
					.map((x) => (
						<RemoteVideo
							key={x.username}
							username={x.username}
							stream={x.stream!}
						/>
					))}
			</div>
		</div>
	);
};

interface Connection {
	username: string;
	peerConnection: RTCPeerConnection;
	stream?: MediaStream;
}
