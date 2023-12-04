const express = require("express")
const router = express.Router()
const UserModel = require("../model/UserModel")
const cors = require("cors")
const ConversationModel = require("../model/ConversationModel")
const MessegeModel = require("../model/MessegeModel")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
 const Authenticate=require("../middleware/Authenticate.js")
/// for user signup 

require('dotenv').config();
router.use(express.json())
router.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
    methods: "GET,PUT,POST,PATCH,DELETE"
}))
router.use(cookieParser())


router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, password } = await req.body
    if(!email){
        res.send("Fill properly")
    }
    try {

        const newUser = await new UserModel({ firstname, lastname, email, password });
        await newUser.save()
        res.status(201).json({ messege: "Succesfully registered!" })
    } catch (err) {
        console.log(err)
        res.status(401).json({ messege: "Unable to register" });
    }

})

// login route for cookie

router.post("/login", async (req, res) => {
  
    
    
    try {
        const {  email, password } = await req.body
        const oldUser = await UserModel.findOne({email:email})
        
        if(await oldUser.password === password){
            const token=await oldUser.createAuthToken()
            res.cookie('jwtoken',token,{
                expires:new Date(Date.now() + 3333333333333),
                httpOnly:true,
                secure:true,
                credentials:"include",
                
            })
        
           res.status(200).json({ messege: "Succesfully login!" })   
        }else{
            res.status(401).json({ messege: "Wrong credentials" });
        
        }
         
      
    } catch (err) {
        console.log(err)
        res.status(401).json({ messege: "Unable to login" });
    }

})

//get login user info

router.get("/getdata", Authenticate, async (req, res) => {
    let token = await req.cookies.jwtoken

    const data = await req.rootUser

    if (!data) {
        res.status(400).json({ error: "New user" })
    } else {
        res.status(200).send(data)

    }
})



router.get("/all", async (req, res) => {

 
    try {
       
        const alluser = await UserModel.find();

 
        res.status(200).json({ messege: alluser })
    } catch (err) {
        console.log(err)
        res.status(401).json({ messege: "Unable to get all user" });
    }

})



//get all user
router.get("/friendid/:friendId", async (req, res) => {

 
    try {
        const friendName= req.params.friendId
        const alluser = await UserModel.find({_id:friendName});

 
        res.status(200).json({ messege: alluser })
    } catch (err) {
        console.log(err)
        res.status(401).json({ messege: "Unable to get all user" });
    }

})













//for user connection in socket
router.post('/connect', async (req, res) => {

    
    const newConversation = await new ConversationModel({
        members: [req.body.senderId, req.body.receiverId]
    })
  

    try {
        const saveConnection = await newConversation.save()
        res.status(201).json({ messege:saveConnection})


    } catch (error) {
        res.status(500).json({ messege: "cannot connect" })
    }



})
//get the conversation of the user with userId

router.get('/conversation/:userId', async (req, res) => {


    try {
        const conversation = await ConversationModel.find({
            members: { $in: [req.params.userId] }
        })

        res.status(200).json({ data: conversation })


    } catch (error) {
        res.status(500).json({ messege: "cannot found the conversation" })
        console.log(error)
    }



})

//to add an messege
router.post('/write', async (req, res) => {
    const newMessege = await new MessegeModel(req.body)

    try {
        const saveMessege = await newMessege.save()
        res.status(201).json({ messege: saveMessege })


    } catch (error) {
        res.status(500).json({ messege: "cannot send messege" })
        console.log(error)
    }



})

//getting the messege

router.get('/messege/:conversationId', async (req, res) => {


    try {
        const allmessege = await MessegeModel.find({
            conversationId: { $in: [req.params.conversationId] }
        }) // Sort in descending order based on the createdAt field
      

        res.status(200).json({ messege: allmessege })


    } catch (error) {
        res.status(500).json({ messege: "cannot found the conversation" })
        console.log(error)
    }



})


//delete a conversation 
router.delete('/delmessage/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;

        // Assuming MessegeModel and ConversationModel have appropriate methods for deletion
       
        const deletedConversation = await ConversationModel.findByIdAndDelete(conversationId);

        if (deletedConversation ) {
            res.status(200).json({ success: true, message: 'Messages and conversation deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Conversation not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



module.exports = router;