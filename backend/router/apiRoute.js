const express=require("express")
const router=express.Router()
const UserModel=require("../model/UserModel")
 
const ConversationModel = require("../model/ConversationModel")
const MessegeModel = require("../model/MessegeModel")

/// for user signup 
router.use(express.json())

router.post("/signup",async(req,res)=>{
    const {firstname,lastname,email,password}= await req.body
    try{
    
        const newUser=await new UserModel({firstname,lastname,email,password});
        await newUser.save()
        res.status(201).json({ messege: "Succesfully registered!" })
    }catch(err){
        console.log(err)
        res.status(401).json({ messege: "Unable to register" });
    }

})
















//for user connection in socket
router.post('/connect',async(req,res)=>{
    const newConversation= await new ConversationModel({
        members:[req.body.senderId,req.body.receiverId]
    })

    try {
        const saveConnection = await newConversation.save()
        res.status(201).json({messege:"Connection established with receiver"})
        
        
    } catch (error) {
        res.status(500).json({messege:"cannot connect"})
    }



})
//get the conversation of the user with userId

router.get('/:userId',async(req,res)=>{
   

    try {
        const conversation= await ConversationModel.find({
members:{$in:[req.params.userId]}
        })
 
        res.status(200).json({messege:conversation})
        
        
    } catch (error) {
        res.status(500).json({messege:"cannot found the conversation"})
    }



})

//to add an messege
router.post('/write',async(req,res)=>{
    const newMessege= await new MessegeModel(req.body)

    try {
        const saveMessege = await newMessege.save()
        res.status(201).json({messege:saveMessege})
        
        
    } catch (error) {
        res.status(500).json({messege:"cannot send messege"})
    }



})

//getting the messege

router.get('/messege/:conversationId',async(req,res)=>{
   

    try {
        const allmessege= await MessegeModel.find({
conversationId:{$in:[req.params.conversationId]}
        })
 
        res.status(200).json({messege:allmessege})
        
        
    } catch (error) {
        res.status(500).json({messege:"cannot found the conversation"})
        console.log(error)
    }



})



module.exports = router;