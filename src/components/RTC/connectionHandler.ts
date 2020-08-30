import { HubConnection } from '@microsoft/signalr';

type SetStreamFunc = (username: string, stream: MediaStream) => void;

export interface Connection {
	username: string;
	peerConnection: RTCPeerConnection;
	stream?: MediaStream;
}

export function answerCall(
	hubConnection: HubConnection,
	username: string,
	caller: string,
	session: string,
	description: any,
	stream: MediaStream,
	setRemoteStream: SetStreamFunc,
): RTCPeerConnection {
	// console.log(`Call from ${caller}`);
	const desc = new RTCSessionDescription(description);
	const peerConnection = createPeerConnection(
		hubConnection,
		username,
		caller,
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
				caller,
				'video-answer',
				peerConnection.localDescription,
			);
		})
		.catch((err) => console.error(err));

	return peerConnection;
}

export function createPeerConnection(
	hubConnection: HubConnection,
	username: string,
	target: string,
	session: string,
	setRemoteStream: SetStreamFunc,
): RTCPeerConnection {
	const peerConnection = new RTCPeerConnection({
		iceServers: [
			{
				urls: 'stun:stun.stunprotocol.org',
			},
		],
	});

	function handleICECandidateEvent(event: RTCPeerConnectionIceEvent) {
		// console.debug(`${username} handling ICE candidate`);
		if (event.candidate) {
			hubConnection.send(
				'call',
				session,
				username,
				target,
				'new-ice-candidate',
				event.candidate,
			);
		}
	}

	function handleTrackEvent(event: RTCTrackEvent) {
		const stream =
			event.streams.length === 0
				? new MediaStream([event.track])
				: event.streams[0];
		setRemoteStream(target, stream);
	}

	peerConnection.onicecandidate = handleICECandidateEvent;
	peerConnection.ontrack = handleTrackEvent;

	return peerConnection;
}

export function setupOnNegotiationNeeded(
	peerConnection: RTCPeerConnection,
	hubConnection: HubConnection,
	session: string,
	username: string,
	target: string,
) {
	function handleNegotiationNeededEvent() {
		peerConnection
			.createOffer()
			.then((offer) => peerConnection.setLocalDescription(offer))
			.then(() => {
				hubConnection.send(
					'call',
					session,
					username,
					target,
					'video-offer',
					peerConnection.localDescription,
				);
			})
			.catch((err) => console.error(err));
	}

	peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
}
