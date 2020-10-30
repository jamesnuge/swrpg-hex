export type SocketPayload<T> = T & {
    user: User
}

export interface User {
    userId: string;
    sessionId: string;
    userAlias?: string;
}