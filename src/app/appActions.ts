import { Dispatch } from 'redux';

const appActions = (dispatch: Dispatch) => ({
    startSession: () => {
        dispatch({
            type: 'INITIALIZE_BOARD',
            radius: 5
            // type: 'START_SESSION'
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