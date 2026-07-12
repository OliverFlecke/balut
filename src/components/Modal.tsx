import { useCallback } from "react";

interface ModalProps {
	visible: boolean;
	dismiss?: () => void;
	children?: React.ReactNode;
}

export const Modal = ({ children, visible, dismiss }: ModalProps) => {
	const dismissClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (e.target === e.currentTarget) {
				dismiss?.();
			}
		},
		[dismiss],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === "Escape") {
				dismiss?.();
			}
		},
		[dismiss],
	);

	if (!visible) {
		return null;
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: backdrop with click-to-dismiss
		<div
			onClick={dismissClick}
			onKeyDown={handleKeyDown}
			className="fixed top-0 left-0 w-full h-full bg-black/70"
		>
			<div className="w-full h-full flex flew-row justify-center items-center">
				<div className="max-w-xl flex justify-center items-center p-4 bg-gray-700 rounded">
					{children}
				</div>
			</div>
		</div>
	);
};
