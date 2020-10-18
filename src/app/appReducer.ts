import * as shortUuid from 'short-uuid';
import { Action } from 'redux';
import { createSession, Session } from '../session/Session';

export interface AppState {
    session?: Session;
    isJoiningSession: boolean;
    hostId?: string;
}

const appStore: AppState = {
    isJoiningSession: false
}


const appReducer: (state: AppState, action: Action) => AppState = (state: AppState = appStore, action: Action): AppState => {
    const {type} = action;
    switch(type) {
        case 'START_SESSION':
            const sessionId = shortUuid.generate();
            localStorage.setItem('sessionId', sessionId);
            const session = createSession(sessionId);
            return {
                ...state,
                session
            };
        default:
            return {...state};
    }
}

export default appReducer;