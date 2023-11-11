const express=require("express")
const router=express.Router()
 
const ConversationModel = require("../model/ConversationModel")


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

 
module.exports = router;