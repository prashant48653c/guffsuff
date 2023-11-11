import { io } from "socket.io-client";
const socket=io()
const messege='hi there'
export function sendMessege(mes){
  
  
    io.on("connection", () => {
        socket.emit("hello", "world");
      });
}
