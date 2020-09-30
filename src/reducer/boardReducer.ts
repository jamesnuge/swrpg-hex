import { Action } from "redux";


export const HEX_SELECTED = 'HEX_SELECTED';

type BoardActionType =
    typeof HEX_SELECTED;

interface BoardAction extends Action<BoardActionType> {
    payload: any;
}

interface BoardState {
    board: any[];
    selectedHex?: any;
}

const boardState = {
    board: [] as any[]
}

function boardReducer(state: BoardState = boardState, {payload, type}: BoardAction): BoardState {

    switch(type) {
        case HEX_SELECTED:
            return {
                ...state,
                selectedHex: payload
            }
        default:
            return state;
    }
}

export default boardReducer;