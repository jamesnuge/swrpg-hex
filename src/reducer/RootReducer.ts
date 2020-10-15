import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import appReducer from '../app/appReducer';

export default combineReducers({
    boardReducer,
    appReducer
});