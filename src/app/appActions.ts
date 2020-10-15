import { Dispatch } from 'redux';

const appActions = (dispatch: Dispatch) => ({
    startSession: () => {
        dispatch({
            type: 'START_SESSION'
        });
    }
});

export default appActions;