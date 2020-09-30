import { combineReducers } from 'redux';
import simpleReducer from './SimpleReducer';
import boardReducer from './boardReducer';

export default combineReducers({
    simpleReducer,
    boardReducer
});