import { Function } from '../util/types';
import { w3cwebsocket as Client } from 'websocket';

export interface Session {
    sessionId: string;
    socket: Client;
}

export const createSession: Function<string, Session> = (sessionId: string) => ({
    sessionId,
    // TODO: Change to env controlled binding
    socket: new Client('ws://localhost:3001', 'echo-protocol')
})