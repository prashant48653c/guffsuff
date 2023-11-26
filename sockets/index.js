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
  console.log(users)
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId })
    console.log(users)
 
}

const removeUser = (socketId) => {
  users = users.filter(user => socketId !== user.socketId)
}

const getUser = async (userId) => {
 
console.log(userId+ ' is the receiver id'+users[0])
  let myuser = await users.find((user) => user.userId === userId)
  return myuser
}


io.on("connection", (socket) => {
  console.log("A user connected");
 
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id)
    io.emit("getUser", users)
  });


  //send messege
  socket.on("sendMessege", async ({ userId, receiverId, messege }) => { //userid is sender id

    const user = await getUser(receiverId)
    
    io.to(user.socketId).emit("getMessege", {
      userId, messege
    })
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id)
    io.emit("getUser", users)
  });

});
// setInterval(()=>{
//   console.log(users)
// },5000)

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Socket server started on http://localhost:${PORT}`);
});
