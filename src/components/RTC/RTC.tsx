import { HubConnection } from '@microsoft/signalr';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../styles/elements';
import {
	answerCall,
	Connection,
	createPeerConnection,
	setupOnNegotiationNeeded,
} from './connectionHandler';
import { RemoteVideos } from './RemoteVideo';

export const mediaConstraints = { video: { facingMode: 'user' }, audio: true };

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
	const [localStream, setLocalStream] = useState<MediaStream | undefined>();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [connections, setConnections] = useState<Connection[]>([]);
	const showSelf = false;

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
				console.log(stream);
				setLocalStream(stream);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		if (videoRef.current && localStream) {
			videoRef.current.srcObject = localStream;
		}
	}, [localStream]);

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
						localStream!,
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
	}, [hubConnection, localStream, session, username]);

	// This will call all other known players in the session
	const call = useCallback(() => {
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

			if (localStream) {
				localStream
					.getTracks()
					.forEach((track) => peerConnection.addTrack(track, localStream));
			}
		});
	}, [players, connections, hubConnection, username, session, localStream]);

	return (
		<div className="flex flex-col justify-center items-center">
			<Button onClick={call}>Call</Button>
			<div className="flex flex-row">
				{showSelf && (
					<div>
						<h2>{username}</h2>
						<video
							ref={videoRef}
							autoPlay={true}
							height={'200'}
							width={'200'}
						/>
					</div>
				)}
				<RemoteVideos connections={connections} />
			</div>
		</div>
	);
};
