import { Action } from 'redux';
import { selectHexInBoard, BoardState, deselect } from '../board/state/BoardState'


export const HEX_SELECTED = 'HEX_SELECTED';
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';

type BoardActionType =
    typeof HEX_SELECTED |
    typeof INITIALIZE_BOARD;

interface BoardAction extends Action<BoardActionType> {
    payload: any;
}

interface BoardStoreState {
    board: any[];
    selectedHex?: any;
}

const boardState = {
    board: []
}

function boardReducer(state: BoardStoreState = boardState, {payload, type}: BoardAction): BoardStoreState {

    switch(type) {
        case HEX_SELECTED:
            const previousHex = state.board.find((hex) => hex.isSelected);
            let board: BoardState;
            if (previousHex) {
                if (previousHex.x !== payload.x || previousHex.x !== payload.y) {
                    board = selectHexInBoard(payload, state.board)                    
                } else {
                    board = deselect(state.board);
                }
            } else {
                board = selectHexInBoard(payload, state.board);
            }
            return {
                ...state,
                board
            };
        case INITIALIZE_BOARD:
            return {
                ...state,
                board: payload
            };
        default:
            return {...state};
    }
}

export default boardReducer;