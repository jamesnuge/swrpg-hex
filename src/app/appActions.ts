import { Dispatch } from 'redux';

const appActions = (dispatch: Dispatch) => ({
    startSession: () => {
        dispatch({
            type: 'START_SESSION'
        });
    },
    joinSession: (id: string) => {
        dispatch({
            type: 'JOIN_SESSION',
            payload: id
        })
    }
});

export default appActions;