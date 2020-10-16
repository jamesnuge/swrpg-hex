import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootStore } from '../reducer/RootReducer';
import { Session } from '../session/Session';
import { withDefined } from '../util/types';

export const socketMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<AnyAction>, RootStore>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    console.log('middleware', action);
    const nextState = next(action);
    const {appReducer, boardReducer} = api.getState();
    withDefined(appReducer.session, ({sessionId, socket}: Session) => {
        console.log('sessionId', sessionId);
        
        socket.send(JSON.stringify({
            type: 'INIT',
            state: boardReducer
        }));
    });
    return nextState;
};