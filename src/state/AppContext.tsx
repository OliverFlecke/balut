'use client';

import { createContext, useContext } from 'react';
import type { Action, AppState } from './AppState';

interface AppContextType {
	state: AppState;
	dispatch: React.Dispatch<Action>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function useAppContext() {
	return useContext(AppContext);
}
