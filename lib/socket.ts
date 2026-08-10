import { io, Socket } from "socket.io-client";
import { API_BASE } from "@/lib/api";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(API_BASE, {
      autoConnect: false,
      withCredentials: true,
      transports: ["polling", "websocket"],
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket?.connected) socket.disconnect();
  socket = null;
}
