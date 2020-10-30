import { Action } from 'redux';
import { RESET_SESSION } from '../app/appActions';
import { selectHexInBoard, BoardState, deselect, UNINITIALIZED_STATE, generateBoard } from '../board/state/BoardState'


export const HEX_SELECTED = 'HEX_SELECTED';
export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';
export const UPDATE_SESSION_BOARD = 'UPDATE_SESSION_BOARD';

type BoardActionType =
    typeof HEX_SELECTED |
    typeof INITIALIZE_BOARD |
    typeof RESET_SESSION;

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
        case RESET_SESSION:
            const grid = generateBoard(5);
            return grid;
        default:
            return {...state};
    }
}

export default boardReducer;