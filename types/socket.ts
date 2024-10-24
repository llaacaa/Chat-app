import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";

export type CustomSocket = Socket<DefaultEventsMap, DefaultEventsMap>;
