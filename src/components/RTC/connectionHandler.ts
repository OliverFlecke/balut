import { HubConnection } from '@microsoft/signalr';

export function answerCall(
	hubConnection: HubConnection,
	username: string,
	caller: string,
	session: string,
	description: any,
	stream: MediaStream,
	setRemoteStream: (stream: MediaStream) => void,
): RTCPeerConnection {
	console.log(`Call from ${caller}`);
	const desc = new RTCSessionDescription(description);
	const peerConnection = createPeerConnection(
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

	return peerConnection;
}

export function createPeerConnection(
	hubConnection: HubConnection,
	username: string,
	session: string,
	setRemoteStream: (stream: MediaStream) => void,
): RTCPeerConnection {
	const peerConnection = new RTCPeerConnection({
		iceServers: [
			{
				urls: 'stun:stun.stunprotocol.org',
			},
		],
	});

	function handleNegotiationNeededEvent() {
		if (username !== 'Alice') {
			return;
		}
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
