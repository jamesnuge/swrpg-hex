import * as shortUuid from 'short-uuid';
import { Action } from 'redux';

interface AppState {
    startingModalIsOpen: boolean;
    sessionId?: string;
}

const appStore: AppState = {
    startingModalIsOpen: true
}

const appReducer: (state: AppState, action: Action) => AppState = (state: AppState = appStore, {type}: Action): AppState => {
    switch(type) {
        case 'CLOSE_MODAL':
            return {
                ...state,
                startingModalIsOpen: false
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                startingModalIsOpen: false
            };
        case 'START_SESSION':
            const sessionId = shortUuid.generate();
            localStorage.setItem('sessionId', sessionId);
            return {
                ...state,
                startingModalIsOpen: false,
                sessionId
            };
        default:
            return {...state};
    }
}

export default appReducer;