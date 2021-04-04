import { useCallback } from 'react';

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
		<div
			onClick={dismissClick}
			className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70"
		>
			<div className="w-full h-full flex flew-row justify-center items-center">
				<div
					onClick={clickCapture}
					className="max-w-xl flex justify-center items-center p-4 bg-gray-700 rounded"
				>
					{children}
				</div>
			</div>
		</div>
	);
};
