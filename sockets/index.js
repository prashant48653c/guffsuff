 
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
  


  socket.on("callUser",async (data) => {
    const userReceiver = await getUser(data.receiverId);
    const userSender = await getUser(data.senderId);
    if(userReceiver){
      io.to(userReceiver.socketId).emit("answerCall",data)
      console.log("data aayo from sender",data)
    }
    if(userSender){
      io.to(userSender.socketId).emit("answerCall",data)
      console.log("data aayo sender side",data)
    }
	})

 
  socket.on("stream", (data) => {
    const userReceiver = getUser(data.receiverId);
  
    if (userReceiver) {
      io.to(userReceiver.socketId).emit("stream", data.stream);

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