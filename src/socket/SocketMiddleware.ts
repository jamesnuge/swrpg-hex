import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootStore } from '../reducer/RootReducer';
import { Session } from '../session/Session';
import { withDefined } from '../util/types';

// export const socketMiddleware = (store: RootStore) => (next: (action: AnyAction) => RootStore) => (action: AnyAction) => {
//     console.log(store);
//     return next(action);
// }

export const socketMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<AnyAction>, RootStore>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    const {appReducer} = api.getState();
    const session = appReducer.session
    withDefined(appReducer.session, ({sessionId}: Session) => {
        console.log('sessionId', sessionId);
        // socket.send(action);
    });
    return next(action);
};