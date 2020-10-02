import { Action } from 'redux';

interface AppState {
    isOpen: boolean;
}

const appStore: AppState = {
    isOpen: true
}

const appReducer: (state: AppState, action: Action) => AppState = (state: AppState = appStore, {type}: Action): AppState => {
    switch(type) {
        case 'CLOSE_MODAL':
            return {
                ...state,
                isOpen: false
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                isOpen: false
            };
        default:
            return {...state};
    }
}

export default appReducer;