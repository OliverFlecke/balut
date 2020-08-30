import React, { useEffect, useRef } from 'react';
import { Connection } from './connectionHandler';
import styled from 'styled-components';

interface RemoteVideoProps {
	stream: MediaStream;
	username: string;
}

const RemoteVideo = ({ stream, username }: RemoteVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [videoRef, stream]);

	return (
		<VideoContainer>
			<Username>{username}</Username>
			<Video key={username} ref={videoRef} autoPlay={true} />
		</VideoContainer>
	);
};

const VideoContainer = styled.div`
	position: relative;
	height: 180px;
	width: 180px;
`;
const Username = styled.div`
	position: relative;
	z-index: 1;
	padding: 0.25em;
`;
const Video = styled.video`
	position: absolute;
	top: 0;
	left: 0;
`;

interface RemoteVideosProps {
	connections: Connection[];
}

export const RemoteVideos = ({ connections }: RemoteVideosProps) => {
	return (
		<Container>
			{connections
				.filter((x) => x.stream !== undefined)
				.map((x) => (
					<RemoteVideo
						key={x.username}
						username={x.username}
						stream={x.stream!}
					/>
				))}
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	right: 0px;
	top: 0px;
`;
