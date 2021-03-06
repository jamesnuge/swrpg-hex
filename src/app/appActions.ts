import { Dispatch } from 'redux';

export const RESET_SESSION = 'RESET_SESSION';

const appActions = (dispatch: Dispatch) => ({
    startSession: () => {
        dispatch({
            type: 'INITIALIZE_SESSION',
        });
        dispatch({
            type: 'INITIALIZE_BOARD',
            payload: {
                radius: 5
            }
        });
    },
    joinSession: (id: string) => {
        dispatch({
            type: 'JOIN_SESSION',
            payload: id
        })
    },
    resetSession: () => {
        dispatch({
            type: RESET_SESSION
        })
    }
});

export default appActions;