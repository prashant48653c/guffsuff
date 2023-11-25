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

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    console.log("Message received:", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Socket server started on http://localhost:${PORT}`);
});
