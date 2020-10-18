import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/RootReducer';
import { socketMiddleware } from './socket/SocketMiddleware';

export default function configureStore(initialState={}) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(socketMiddleware))
    );
}