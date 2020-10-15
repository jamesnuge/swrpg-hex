import shortUuid from 'short-uuid';
import { Dispatch } from 'redux';
import { Session } from '../session/Session';

const appActions = (dispatch: Dispatch) => ({
    closeModal: () => {
        dispatch({type: 'CLOSE_MODAL'})
    },
    openModal: () => {
        dispatch({type: 'OPEN_MODAL'})
    },
    startSession: (session: Session) => {
        console.log('starting session');
        const sessionId = shortUuid.generate();
        localStorage.setItem('sessionId', sessionId);
        dispatch({
            type: 'START_SESSION'
            // payload: session
        });
    }
});

export default appActions;