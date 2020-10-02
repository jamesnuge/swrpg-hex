import { Dispatch } from 'redux';

const appActions = (dispatch: Dispatch) => ({
    closeModal: () => {
        dispatch({type: 'CLOSE_MODAL'})
    },
    openModal: () => {
        dispatch({type: 'OPEN_MODAL'})
    },
    startSession: () => {
        dispatch({type: 'START_SESSION'});
    }
});

export default appActions;