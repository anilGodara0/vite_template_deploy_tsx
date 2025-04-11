// src/socket.ts
import { io, Socket } from 'socket.io-client';
import { Environment } from '../Environment/Environment';

interface ServerToClientEvents {
    message: (data: string) => void;
    'notification-sent': (data: string) => void;
}
interface ClientToServerEvents {
    sendMessage: (message: string) => void;
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(Environment.api);

export default socket;
