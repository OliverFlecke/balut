"use client";

import { useReducer, useState } from "react";
import { Navigation } from "../components/Navigation";
// import { StartMultiplayerModal } from '../components/StartMultiplayerModal';
import { AppContext } from "../state/AppContext";
import { initial, reducer } from "../state/AppState";

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [showMPModal, setShowMPModal] = useState(false);
	const [state, dispatch] = useReducer(reducer, initial());

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			<main className="p-3 font-display w-full min-h-screen h-full bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
				<header className="flex flex-row justify-between">
					<h1 className="m-0 text-5xl no-underline">Balut</h1>
					<Navigation
						shouldShowMultiplayer={!!state.connection}
						showMultiplayer={() => setShowMPModal((x) => !x)}
					/>
				</header>

				<section>{children}</section>
				{/* <StartMultiplayerModal */}
				{/* 	state={state} */}
				{/* 	dispatch={dispatch} */}
				{/* 	visible={showMPModal} */}
				{/* 	dismiss={() => setShowMPModal(false)} */}
				{/* 	connection={state.connection} */}
				{/* /> */}
			</main>
		</AppContext.Provider>
	);
}
