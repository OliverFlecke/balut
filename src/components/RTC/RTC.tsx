import React, { useState, useEffect, useRef } from 'react';

const connection = new RTCPeerConnection();
// const offer = connection.createOffer().then((x) => console.debug(x));

export const RTC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [stream, setStream] = useState<MediaStream | undefined>(undefined);

	useEffect(() => {
		if (!navigator.mediaDevices) {
			return;
		}
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((x) => {
				console.debug(x);
				if (videoRef.current) {
					videoRef.current.srcObject = x;
				}
			})
			.catch((err) => console.error(err));
	}, []);

	return <video ref={videoRef} autoPlay={true} muted={true}  />;
};
