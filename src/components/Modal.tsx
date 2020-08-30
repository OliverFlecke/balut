import React, { useCallback } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

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
			<div className="flex justify-center items-center w-full h-full">
				<ContentContainer onClick={clickCapture}>{children}</ContentContainer>
			</div>
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.7);

	${tw`w-full h-full`}
`;

const ContentContainer = styled.div`
	background: rgba(20, 20, 20, 1);
	${tw`flex flex-center items-center rounded p-4`}
`;
