import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootStore } from '../reducer/RootReducer';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { HEX_SELECTED, INITIALIZE_BOARD } from '../reducer/boardReducer';
import { AppState, isHost } from '../app/appReducer';
import { SocketPayload } from './SocketPayload';

export const socketMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<AnyAction>, RootStore>) => {
    const serverConnection = createServerConnectionFromDispatch(api.dispatch);
    return (next: Dispatch<AnyAction>) => {
        return (action: AnyAction) => {
            const nextState = next(action);
            if (!isFluxServerMessage(action)) {
                const { appReducer } = api.getState()
                switch (action.type) {
                    case HEX_SELECTED:
                        const { x, y } = action.payload;
                        serverConnection.send({
                            type: HEX_SELECTED,
                            payload: { x, y },
                            user: getUser(appReducer)
                        });
                        break;
                    case INITIALIZE_BOARD:
                        if (isHost(appReducer)) {
                            serverConnection.send({
                                type: INITIALIZE_BOARD,
                                payload: action.payload,
                                user: getUser(appReducer)
                            });
                        }
                        break;
                    case 'JOIN_SESSION':
                        serverConnection.send({
                            ...action,
                            user: getUser(appReducer)
                        });
                        break;
                    default:
                        console.info(`Not sending unconfigured action type: ${action.type}`);
                }
            }
            return nextState;
        };
    };
};

const getUser = ({ session, userId }: AppState) => {
    return {
        sessionId: session!.sessionId,
        userId
    }
}

const createServerConnectionFromDispatch = (dispatch: Dispatch<AnyAction>) => {
    console.log('++CONNECTING TO WEBSOCKET++')
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
    socket.onmessage = ({ data }: IMessageEvent) => {
        console.log('++ Received Message from Flux Server ++');
        console.log(data);
        if (typeof data === 'string') {
            try {
                dispatch(JSON.parse(data));
            } catch (e) {
                console.warn('Unable to parse flux server message');
            }
        } else if (typeof data === 'object') {
            dispatch(data as any);
        }
    };
    return {
        send: <T>(message: SocketPayload<T>) => {
            if (isOpen) {
                socket.send(JSON.stringify(message));
            } else {
                console.log('Unable to send event, socket is closed')
            }
        }
    }
}

const isFluxServerMessage = (message: any) => {
    return message.origin!!;
} 