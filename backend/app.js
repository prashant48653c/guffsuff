const express=require("express")
const http=require("http")
const { Server } = require("socket.io");
const router=require("./router/apiRoute")
const connectDB=require("./db/conn")

const app=express()
const server=http.createServer(app)
const PORT=4000;
const io=new Server(server)
app.use(router)
//socket request
connectDB()
io.on('connection',(socket)=>{     //socket == client
  socket.emit("user_messege","Hello Js")
})






// http request
app.get('/',(req,res)=>{
    res.send("home")
})

server.listen(PORT,()=>{
    console.log("app started")
})