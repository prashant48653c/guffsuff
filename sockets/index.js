import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import express from 'express';

const corsOptions = {
  origin: "https://gufsuff.netlify.app",
  methods: ["GET", "POST"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
});

// ... (rest of your code remains unchanged)

app.get("/",(req,res)=>{
  res.send("THis is the socket server for gufsuff")
})
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
 
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUser", users);
  });

  //send and get message
  socket.on("sendMessage", async ({ senderId, receiverId, messege,mestype }) => {
    const userReceiver = await getUser(receiverId);
    const userSender = await getUser(senderId);
  
    if (userReceiver) {
      io.to(userReceiver.socketId).emit("getMessage", {
        senderId,
        messege,
        mestype
      });
      console.log(`Sent message from ${senderId} to ${receiverId}: ${messege} and the type is ${mestype}`);
    } else {
      console.log("Receiver is offline for now");
    }
  
    if (userSender) {
      io.to(userSender.socketId).emit("getMessage", {
        senderId,
        messege,
        mestype
      });
      console.log(`Sent message from ${senderId} to self: ${messege}`);
    } else {
      console.log("Sender is offline for now");
    }
  });
  




 
 
 

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


httpServer.listen(3000,()=>{
  console.log("Socket server has started !!!!!")
})