import React, { useState, useEffect, useRef } from 'react';
import { HubConnection } from '@microsoft/signalr';
import { answerCall, createPeerConnection } from './connectionHandler';

const mediaConstraints = { video: true };

interface RTCProps {
	name: string;
	session: string;
	hubConnection: HubConnection;
}

export const RTC = ({ name, session, hubConnection }: RTCProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const [connections, setConnections] = useState<Connection[]>([]);

	const setRemoteStream = (stream: MediaStream) => {
		console.debug(`Setting stream ${remoteVideoRef.current}`);
		console.debug(stream);
		if (remoteVideoRef.current !== null) {
			remoteVideoRef.current.srcObject = stream;
		}

		setConnections((cs) =>
			cs.map((connection) =>
				true
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
		hubConnection.on('callFrom', (otherUser, type, obj) => {
			switch (type) {
				case 'video-offer':
					const peerConnection = answerCall(
						hubConnection,
						name,
						otherUser,
						session,
						obj,
						videoRef.current?.srcObject as MediaStream,
						setRemoteStream,
					);
					setConnections((x) =>
						x.concat([
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
								if (connection.username === otherUser) {
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
						console.debug('Handling ice candidate');
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

	const call = () => {
		const peerConnection = createPeerConnection(
			hubConnection,
			name,
			session,
			setRemoteStream,
		);
		setConnections((x) =>
			x.concat([
				{
					username: 'Bob',
					peerConnection,
				},
			]),
		);

		const stream = videoRef.current?.srcObject as MediaStream;
		stream
			.getTracks()
			.forEach((track) => peerConnection.addTrack(track, stream));
	};

	// console.log(connections);

	return (
		<div className="flex flex-col justify-center items-center">
			<button onClick={call}>Call</button>
			<video ref={videoRef} autoPlay={true} muted={true} />
			<hr />
			<video ref={remoteVideoRef} autoPlay={true} muted={true} />
		</div>
	);
};

interface Connection {
	username: string;
	peerConnection: RTCPeerConnection;
	stream?: MediaStream;
}
