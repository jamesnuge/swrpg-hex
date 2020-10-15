import * as shortUuid from 'short-uuid';
import { Action } from 'redux';
import { Session } from '../session/Session';

interface AppState {
    isOpen: boolean;
    session?: Session;
}

const appStore: AppState = {
    isOpen: true
}


const appReducer: (state: AppState, action: Action) => AppState = (state: AppState = appStore, action: Action): AppState => {
    const {type} = action;
    switch(type) {
        case 'CLOSE_MODAL':
            console.log('closing modal');
            return {
                ...state,
                isOpen: false
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                isOpen: true
            };
        case 'START_SESSION':
            const sessionId = shortUuid.generate();
            localStorage.setItem('sessionId', sessionId);
            const derp = {
                ...state,
                isOpen: false
                // session: (action as any).payload
            };
            console.log(derp);
            return derp;
        default:
            return {...state};
    }
}

export default appReducer;