import * as shortUuid from 'short-uuid';
import { Action } from 'redux';
import { createSession, Session } from '../session/Session';

interface AppState {
    session?: Session;
}

const appStore: AppState = {
}


const appReducer: (state: AppState, action: Action) => AppState = (state: AppState = appStore, action: Action): AppState => {
    const {type} = action;
    switch(type) {
        case 'START_SESSION':
            const sessionId = shortUuid.generate();
            localStorage.setItem('sessionId', sessionId);
            return {
                ...state,
                session: createSession(sessionId)
            };
        default:
            return {...state};
    }
}

export default appReducer;