import { Dispatch } from "redux";
import { HEX_SELECTED, INITIALIZE_BOARD } from "../reducer/boardReducer";
import { BoardState } from "../board/state/BoardState";

export default (dispatch: Dispatch) => ({
    selectHex: (hex: any) => {
        dispatch({
            type: HEX_SELECTED,
            payload: hex
        });
    },
    initializeBoard: (board: BoardState) => {
        dispatch({
            type: INITIALIZE_BOARD,
            payload: board
        })
    }
})