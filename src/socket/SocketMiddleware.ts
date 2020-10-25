import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootStore } from '../reducer/RootReducer';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { HEX_SELECTED, INITIALIZE_BOARD } from '../reducer/boardReducer';

export const socketMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<AnyAction>, RootStore>) => {
    const serverConnection = createServerConnectionFromDispatch(api.dispatch);
    return (next: Dispatch<AnyAction>) => {
        return (action: AnyAction) => {
            const nextState = next(action);
            const currentState = api.getState()
            console.log(nextState);
            switch (action.type) {
                case HEX_SELECTED:
                    serverConnection.send(currentState);
                    break;
                case INITIALIZE_BOARD:
                    serverConnection.send(currentState);
                    break;
                default:
                    console.log(`Not sending unconfigured action type: ${action.type}`);
            }
            return nextState;
        };
    };
};

const createServerConnectionFromDispatch = (_dispatch: Dispatch<AnyAction>) => {
    const socket = new w3cwebsocket('ws://localhost:3001', 'echo-protocol');
    let isOpen = false;
    socket.onopen = () => {
        isOpen = true;
    };
    socket.onclose = () => {
        isOpen = false;
    };
    socket.onerror = (error: unknown) => {
        isOpen = false;
        console.error(error);
    };
    socket.onmessage = (message: IMessageEvent) => {
        console.log(message.data);
    };
    return {
        send: (message: any) => {
            if (isOpen) {
                socket.send(JSON.stringify(message));
            } else {
                console.log('Unable to send event, socket is closed')
            }
        }
    }
}