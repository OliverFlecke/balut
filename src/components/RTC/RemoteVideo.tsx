import React, { useEffect, useRef } from 'react';

interface RemoteVideoProps {
	stream: MediaStream;
	username: string;
}

export const RemoteVideo = ({ stream, username }: RemoteVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [videoRef, stream]);

	return (
		<div>
			<h3>{username}</h3>
			<video
				key={username}
				ref={videoRef}
				autoPlay={true}
				muted={true}
				height={'200'}
				width={'200'}
			/>
		</div>
	);
};
