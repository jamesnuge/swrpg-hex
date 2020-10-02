import { Dispatch } from 'redux';

const appActions = (dispatch: Dispatch) => ({
    closeModal: () => {
        dispatch({type: 'CLOSE_MODAL'})
    },
    openModal: () => {
        dispatch({type: 'OPEN_MODAL'})
    }
});

export default appActions;