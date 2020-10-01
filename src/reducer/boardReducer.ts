import { Action } from 'redux';
import { selectHexInBoard, BoardState, deselect, UNINITIALIZED_STATE } from '../board/state/BoardState'


export const HEX_SELECTED = 'HEX_SELECTED';
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';

type BoardActionType =
    typeof HEX_SELECTED |
    typeof INITIALIZE_BOARD;

interface BoardAction extends Action<BoardActionType> {
    payload: any;
}

type BoardStoreState = BoardState;

const boardState = UNINITIALIZED_STATE;

function boardReducer(state: BoardStoreState = boardState, {payload, type}: BoardAction): BoardStoreState {
    switch(type) {
        case HEX_SELECTED:
            const currentBoardState = state;
            const previousHex = currentBoardState.board.find((hex) => hex.isSelected);
            let board: BoardState;
            if (previousHex) {
                if (previousHex.id.x !== payload.x || previousHex.id.y !== payload.y) {
                    board = selectHexInBoard(payload, state)                    
                } else {
                    board = deselect(state);
                }
            } else {
                board = selectHexInBoard(payload, state);
            }
            return {
                ...state,
                ...board
            };
        case INITIALIZE_BOARD:
            return {
                ...payload
            };
        default:
            return {...state};
    }
}

export default boardReducer;