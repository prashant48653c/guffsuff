// index.js

import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

const httpServer = createServer(cors(corsOptions)); // Apply cors middleware directly here

const io = new Server(httpServer, {
  cors: corsOptions,
});




let users = []
const addUser = (userId, socketId) => {
  !users.some(user => user.userId == userId) &&
    users.push({ userId, socketId })
}
const removeUser = (socketId) => {
  users = users.filter(user => socketId !== user.socketId)
}
const getUser = (userId) => {
  return users.find((user) => user.id === userId)
}


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  });


  //send messege
  socket.on("sendMessege", ({ userId, receiverId, messege }) => { //userid is sender id
    const user = getUser(receiverId)
    io.to(user.socketId).emit("getMessege", {
      userId, messege
    })
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id)
    io.emit("getUsers", users)
  });

});

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Socket server started on http://localhost:${PORT}`);
});
