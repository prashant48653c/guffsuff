const express=require("express")
const http=require("http")
const { Server } = require("socket.io");



const app=express()
const server=http.createServer(app)
const PORT=4000;
const io=new Server(server)

//socket request

io.on('connection',(socket)=>{     //socket == client
 socket.on('user_messege',(messege)=>{
    console.log(messege)
    io.emit('messege',messege)
 })
})






// http request
app.get('/',(req,res)=>{
    res.send("home")
})

server.listen(PORT,()=>{
    console.log("app started")
})