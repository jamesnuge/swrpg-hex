import { Dispatch } from 'redux';
import { HEX_SELECTED, INITIALIZE_BOARD } from '../reducer/boardReducer';

export default (dispatch: Dispatch) => ({
    selectHex: (hex: any) => {
        dispatch({
            type: HEX_SELECTED,
            payload: hex
        });
    },
    initializeBoard: (radius: number) => {
        dispatch({
            type: INITIALIZE_BOARD,
            payload: {
                radius
            }
        })
    }
})