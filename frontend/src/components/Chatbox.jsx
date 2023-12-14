import { AppBar, Box, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setShowEmoji, setShowGif } from '../slices/toggleSlicer';
import Emoji from '../getData/emoji';
import { useDispatch, useSelector } from 'react-redux';
import Gif from '../getData/Gif';
import axios from 'axios'
import { setCurrentChat, setEmoGif, setMessege, setSenderGif } from '../slices/messegeSlicer';
import Messege from './Messege';
import { io } from 'socket.io-client'
import { current } from '@reduxjs/toolkit';
import { setFriendData, setOnlineUser } from '../slices/authSlicer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const Chatbox = () => {


   const dispatch = useDispatch()
   const { showEmoji, showGif } = useSelector((state) => state.toggle)
   const { currentChat, messege, emoGif } = useSelector(state => state.conversation)
   const [arrivalMessage, setArrivalMessage] = useState(null)
   const { userData, friendData } = useSelector((state) => state.auth)
   const [presentChat, setPresentChat] = useState('')
   const [receiverId, setReceiverId] = useState('')





   















   useEffect(() => {
      if (currentChat) {
         // console.log(currentChat)
         const getFriend = async () => {
            const friendId = await currentChat.members.find((id) => id !== userData._id);
            const response = await axios.get(`http://localhost:4000/friendid/${friendId}`)
            dispatch(setFriendData(response.data.messege[0]))
         }
         getFriend()
      }


   }, [currentChat])

   //socket things

   const navigate = useNavigate()
   const socket = useRef()
   useEffect(() => {
      if (userData && socket.current === undefined) {
         socket.current = io("ws://localhost:3000");

         socket.current.on("connection", () => {
            console.log("Socket connected");
         });

         socket.current.on("getMessage", async (data) => {
            if (data.messege) {
               setArrivalMessage({
                  sender: data.senderId,
                  messege: data.messege,
                  mestype: data.mestype,
                  createdAt: Date.now(),
               });
               //  console.log(data.messege)
            }
         });

         socket.current.on("answerCall", (data) => {
            console.log(data, "Calling data ")
         })


      }


   }, [userData, currentChat, messege, dispatch]);


   useEffect(() => {
      if (arrivalMessage && currentChat) {
         let arrive = arrivalMessage

         //   console.log(arrive, "new message " + "current chat");
         currentChat?.members?.includes(arrivalMessage.sender) &&
            dispatch(setMessege((messege) => [...messege, arrive])); // execute the function
         //   console.log(messege);
      }
   }, [arrivalMessage]);

   useEffect(() => {
      if (userData) {
         socket.current.emit("addUser", userData._id)  //send to server
         socket.current.on("getUser", (users) => {
            console.log(users, "User from socket")
            dispatch(setOnlineUser(users))
         })
      }

   }, [currentChat])
   // console.log(socket.current)







   // const delMessege=async()=>{

   //    if(currentChat){
   //     const response=await axios.delete(`http://localhost:4000/delmessege/${currentChat._id}`)
   //     console.log(response ,"data deleted")
   //    }

   //   }










   ////////////////////////////////////////////



   const [newMessege, setNewMessege] = useState({
      sender: userData._id,
      messege: 'hi',
      conversationId: '',
      mestype: 'text'

   })
   useEffect(() => {

      if (currentChat) {
         setPresentChat("lol")
         setNewMessege({ ...newMessege, sender: userData._id, conversationId: currentChat._id })

      }

   }, [currentChat])


   useEffect(() => {
      if (emoGif) {
         setNewMessege({ ...newMessege, messege: `${newMessege.messege} ${emoGif}` })
      }
   }, [emoGif])

   const { senderGif } = useSelector(state => state.conversation)







   const updateMessege = (e) => {
      e.preventDefault();
      setNewMessege({ ...newMessege, messege: e.target.value });
console.log(e.target)
      
   };

   ///sending gif 

   useEffect(() => {
      if (senderGif) {
         sendGif()

      }
   }, [senderGif])

   const sendGif = async (e) => {
      let gif = await senderGif
      const receiverId = await currentChat.members.find(id => id !== userData._id);

      setNewMessege(prevMessege => ({
         ...prevMessege,
         messege: gif,
         mestype: "img"
      }));


      await socket.current.emit('sendMessage', {
         senderId: userData._id,
         receiverId,
         messege: gif,
         mestype: 'img'

      })
      try {
         const response = await axios.post("http://localhost:4000/write", {
            sender: userData._id,
            conversationId: currentChat._id,
            messege: gif,
            mestype: "img"
         })
         // console.log(response)
         if (response) {
            setNewMessege(prevMessege => ({
               ...prevMessege,
               messege: " "
            }));
            dispatch(setSenderGif(''))

         }
      } catch (err) {
         console.log(err)
      }

   }




   const inputRef = useRef(null);



   const submitMessege = async (e) => {
e.preventDefault()
      const receiverId = await currentChat.members.find(id => id !== userData._id);

      
      setNewMessege(prevMessege => ({
         ...prevMessege,
         messege: e.target.value,
         mestype: "text"
      }));


      await socket.current.emit('sendMessage', {
         senderId: userData._id,
         receiverId,
         messege: newMessege.messege,
         mestype: newMessege.mestype

      })
      try {
         const response = await axios.post("http://localhost:4000/write", newMessege)
         // console.log(response)
         if (response) {
            setNewMessege(prevMessege => ({
               ...prevMessege,
               messege: ""
            }));

            dispatch(setSenderGif(''))

         }
         inputRef.current.value = ""
         inputRef.current.focus()

      } catch (err) {
         console.log(err)
      }



   }


   /////////////////
   const emojiShow = () => {

      if (showEmoji == false) {
         dispatch(setShowGif(false))
         dispatch(setShowEmoji(true))

      } else {
         dispatch(setShowEmoji(false))

      }
   }

   const gifShow = () => {
      console.log("gif")
      if (showGif == false) {
         dispatch(setShowEmoji(false))
         dispatch(setShowGif(true))


      } else {
         dispatch(setShowGif(false))

      }
   }


   useEffect(() => {

      const chatContainer = document.getElementById('div-messege-container');
      if (chatContainer) {
         chatContainer.scrollTop = chatContainer.scrollHeight;
      }
   }, [messege, currentChat]);



 

   if (friendData.firstname && currentChat) {


      // console.log(currentChat,"current")
      return (
         <Box pl={1}  >

            <AppBar elevation={0} sx={{
               background: "#595f69"
            }} position='sticky'>
               <Toolbar >
                  <div style={{
                     width: "3rem",
                     height: "3rem",
                     borderRadius: "56",
                     marginRight: ".7rem"


                  }}>
                     <img style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "56rem"
                     }} src="https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg" alt="" />
                  </div>
                  <Typography flexGrow={1} variant="h6" color="inherit">{friendData.firstname + " " + friendData.lastname}</Typography>

                  <Stack flexDirection={'row'} flexGrow={0} >

                    

                     <IconButton onClick={() => navigate('/')} aria-label="videocall button" >
                        <ArrowBackIcon />
                     </IconButton>




                  </Stack>


               </Toolbar>



            </AppBar>

            <div id='div-messege-container' style={{
               overflowY: "scroll",
               height: (window.innerWidth > 600) ? "77vh" : "85vh",
               padding: "2rem 0",


            }}>
               {
                  messege?.map((elem, i) => {

                     return (
                        <Messege mes={elem} key={i} own={elem.sender == userData._id} />

                     )
                  })
               }







            </div>


            <form  onSubmit={submitMessege}>

               <TextField   inputRef={inputRef} onChange={updateMessege} value={newMessege.messege} autoComplete='off' fullWidth sx={{
                  paddingRight: "1rem",

                  outline: "none",
                  marginBottom: 0,

                  borderRadius: 50,
                  background: "#343541"
               }} placeholder='Type some messege' InputProps={{
                  style: { color: 'white' },
                  endAdornment: (
                     <InputAdornment  onClick={(e) => submitMessege(e)} position="end">
                        <SendIcon style={{ color: 'white', cursor: "pointer" }} />
                     </InputAdornment>
                  ),
                  startAdornment: (
                     <>


                        <InputAdornment onClick={gifShow} sx={{ marginRight: ".7rem" }} position="start">
                           <GifIcon style={{ color: 'white', cursor: "pointer" }} />
                        </InputAdornment>

                        <InputAdornment onClick={emojiShow} sx={{ marginRight: ".7rem" }} position="start">
                           <EmojiEmotionsIcon style={{ color: 'white', cursor: "pointer" }} />
                        </InputAdornment>

                        {
                           showEmoji &&
                           (
                              <Emoji />
                           )
                        }

                        {
                           showGif &&
                           (
                              <Gif />
                           )
                        }

                     </>

                  )

               }} />




            </form>

         </Box>
      )
   } else {
      return (
         <Box sx={{
            width: "100%",
            height: "100vh",
            fontSize: "4rem",
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
            alignItems: "center"
         }} >Try some guffsuff</Box>
      )
   }

}

export default Chatbox