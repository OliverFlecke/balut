import React, { useState, useEffect, useRef } from 'react';
import { HubConnection } from '@microsoft/signalr';

let peerConnection: RTCPeerConnection;
const mediaConstraints = { video: true };

interface RTCProps {
	name: string;
	session: string;
	hubConnection: HubConnection;
}

export const RTC = ({ name, session, hubConnection }: RTCProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);

	const setRemoteStream = (stream: MediaStream) => {
		console.debug('Setting stream');
		console.debug(stream);
		if (remoteVideoRef.current !== null) {
			remoteVideoRef.current.srcObject = stream;
		}
	};

	useEffect(() => {
		if (!navigator.mediaDevices) {
			return;
		}
		navigator.mediaDevices
			.getUserMedia(mediaConstraints)
			.then((stream) => {
				console.debug(stream);
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		hubConnection.on('callFrom', (otherUser, type, obj) => {
			if (type == 'video-offer') {
				answerCall(
					hubConnection,
					name,
					otherUser,
					session,
					obj,
					videoRef.current?.srcObject as MediaStream,
					setRemoteStream,
				);
			} else if (type === 'video-answer') {
				console.log(`Answer from ${otherUser}`);
				const description = new RTCSessionDescription(obj);
				peerConnection.setRemoteDescription(description);
			} else if (type === 'new-ice-candidate') {
				console.debug('Handling ice candidate');
				const candidate = new RTCIceCandidate(obj);
				peerConnection
					.addIceCandidate(candidate)
					.catch((err) => console.error(err));
			} else {
				console.error(`Could not understand type ${type}`);
			}
		});
	}, []);

	const call = () => {
		peerConnection = createPeerConnection(
			hubConnection,
			name,
			session,
			setRemoteStream,
		);

		const stream = videoRef.current?.srcObject as MediaStream;
		stream
			.getTracks()
			.forEach((track) => peerConnection.addTrack(track, stream));
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<button onClick={call}>Call</button>
			<video ref={videoRef} autoPlay={true} muted={true} />
			<hr />
			<video ref={remoteVideoRef} autoPlay={true} muted={true} />
		</div>
	);
};

function answerCall(
	hubConnection: HubConnection,
	username: string,
	caller: string,
	session: string,
	description: any,
	stream: MediaStream,
	setRemoteStream: (stream: MediaStream) => void,
) {
	console.log(`Call from ${caller}`);
	const desc = new RTCSessionDescription(description);
	peerConnection = createPeerConnection(
		hubConnection,
		username,
		session,
		setRemoteStream,
	);

	stream.getTracks().forEach((track) => peerConnection.addTrack(track));

	peerConnection
		.setRemoteDescription(desc)
		.then(() => peerConnection.createAnswer())
		.then((answer) => peerConnection.setLocalDescription(answer))
		.then(() => {
			hubConnection.send(
				'call',
				session,
				username,
				'video-answer',
				peerConnection.localDescription,
			);
		})
		.catch((err) => console.error(err));
}

function createPeerConnection(
	hubConnection: HubConnection,
	username: string,
	session: string,
	setRemoteStream: (stream: MediaStream) => void,
): RTCPeerConnection {
	const peerConnection = new RTCPeerConnection({
		iceServers: [
			// Information about ICE servers - Use your own!
			{
				urls: 'stun:stun.stunprotocol.org',
			},
		],
	});

	function handleNegotiationNeededEvent() {
		if (username !== 'Alice') {
			return;
		}

		console.log('Calling session');
		peerConnection
			.createOffer()
			.then((offer) => peerConnection.setLocalDescription(offer))
			.then(() => {
				hubConnection.send(
					'call',
					session,
					username,
					'video-offer',
					peerConnection.localDescription,
				);
			})
			.catch((err) => console.error(err));
	}

	function handleICECandidateEvent(event: RTCPeerConnectionIceEvent) {
		console.debug(`${username} handling ICE candidate`);
		if (event.candidate) {
			hubConnection.send(
				'call',
				session,
				username,
				'new-ice-candidate',
				event.candidate,
			);
		}
	}

	function handleTrackEvent(event: RTCTrackEvent) {
		console.log('Handling trackEvent');
		console.log(event);

		const stream =
			event.streams.length === 0
				? new MediaStream([event.track])
				: event.streams[0];
		setRemoteStream(stream);
	}

	peerConnection.onicecandidate = handleICECandidateEvent;
	peerConnection.ontrack = handleTrackEvent;
	peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;

	return peerConnection;
}
