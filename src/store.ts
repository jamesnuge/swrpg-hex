/*
 * src/store.js
 * No initialState
*/
import { createStore } from 'redux';
// import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from './reducer/RootReducer';

export default function configureStore(initialState={}) {
    return createStore(
        rootReducer,
        initialState,
        // devToolsEnhancer()
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
}