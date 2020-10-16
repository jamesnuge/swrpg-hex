/*
 * src/store.js
 * No initialState
*/
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from './reducer/RootReducer';

export default function configureStore(initialState={}) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware())
        // devToolsEnhancer()
        // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
}