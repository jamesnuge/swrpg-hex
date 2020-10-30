import * as shortUuid from 'short-uuid';
import { Action } from 'redux';
import { createSession, Session } from '../session/Session';

export interface AppState {
    session?: Session;
    isJoiningSession: boolean;
    userId: string;
}

const appStore: AppState = {
    isJoiningSession: false,
    userId: shortUuid.generate()
}

interface AppAction extends Action {
    payload?: unknown
}

const appReducer: (state: AppState, action: Action) => AppState = (state: AppState = appStore, action: AppAction): AppState => {
    const {type} = action;
    switch(type) {
        case 'INITIALIZE_SESSION':
            return {
                ...createSessionAndReturnState(state.userId, state),
            };
        case 'JOIN_SESSION':
            const sessionToJoin = action.payload as string;
            return createSessionAndReturnState(sessionToJoin, state);
        default:
            return {...state};
    }
}

const createSessionAndReturnState: (id: string, state: AppState) => AppState = (id: string, state: AppState) => {
    localStorage.setItem('sessionId', id);
    const session = createSession(id);
    return {
        ...state,
        session
    };

}

export const isHost = (appState: AppState) => {
    return appState.session && (appState.userId === appState.session.sessionId)
}

export default appReducer;