import { combineReducers } from 'redux';
import simpleReducer from './SimpleReducer';
import boardReducer from './boardReducer';
import appReducer from '../app/appReducer';

export default combineReducers({
    simpleReducer,
    boardReducer,
    appReducer
});