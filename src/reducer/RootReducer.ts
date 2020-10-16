import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import appReducer, { AppState } from '../app/appReducer';
import { BoardState } from '../board/state/BoardState';

export default combineReducers({
    boardReducer,
    appReducer
});

export type RootStore = {
    appReducer: AppState;
    boardReducer: BoardState;
}