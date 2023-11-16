const express=require("express")
const router=express.Router()
const UserModel=require("../model/UserModel")
 
const ConversationModel = require("../model/ConversationModel")

/// for user signup 

router.post("/signup",async(req,res)=>{
    try{
        const {firstname,lastnaame,email,password}=req.body
        const newUser=await new UserModel({firstname,lastnaame,email,password});
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

 
module.exports = router;