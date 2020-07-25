import React, { useCallback } from 'react';
import styled from 'styled-components';

interface ModalProps {
	visible: boolean;
	dismiss?: () => void;
	children?: JSX.Element;
}

export const Modal = ({ children, visible, dismiss }: ModalProps) => {
	const dismissClick = useCallback(() => {
		if (dismiss) {
			dismiss();
		}
	}, [dismiss]);

	const clickCapture = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation();
		},
		[],
	);

	if (!visible) {
		return null;
	}

	return (
		<Container onClick={dismissClick}>
			<VerticalCenter>
				<ContentContainer onClick={clickCapture}>{children}</ContentContainer>
			</VerticalCenter>
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
`;

const ContentContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px;
	background: #666;
	border-radius: 6px;
	max-width: 50%;
`;

const VerticalCenter = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;
