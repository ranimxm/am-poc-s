import io from "socket.io-client";
import { createContext } from "react";

export const socket = io("http://localhost:8080");
export const SocketContext = createContext();
