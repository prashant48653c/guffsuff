import { Box, InputAdornment, Paper, TextField, Typography, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setAllUser, setUserData } from '../slices/authSlicer';
import { setConversation, setCurrentChat, setMessege } from '../slices/messegeSlicer';
import Conversation from './Conversation';
import { io } from 'socket.io-client'
import Alluser from './Alluser';


const Userlist = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData,allUser } = useSelector((state) => state.auth)
  const { conversation, currentChat } = useSelector((state) => state.conversation)





  useEffect(() => {
    const getUserData = async () => {
       
      try {
        const response = await axios.get("http://localhost:4000/getdata", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
  
        const data = response.data;
        dispatch(setUserData(data));
      } catch (error) {
        console.error(error);
      }
    };
  
    getUserData();
  }, []);


  useEffect(() => {
    const getAllUser = async () => {
       
      try {
        const response = await axios.get("http://localhost:4000/all", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
  
        const data = response.data.messege
        const alluser=await data.filter(elem => elem._id !== userData._id)
        dispatch(setAllUser(alluser));
        console.log(alluser, "all user")
      } catch (error) {
        console.error(error);
      }
    };
  
    getAllUser();
  }, []);

  
  
  useEffect(() => {
    const getUserConversation = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/conversation/${userData._id}`);
        const data = response.data.data;
        dispatch(setConversation(data));
        console.log(data); // Check the data you're receiving
      } catch (error) {
        console.error(error);
      }
    };
  
    if (userData) {
      getUserConversation(); // Call the function to get user conversation
    }
  }, [userData]);  
 


  const getMessege = async (e, user) => {
    e.preventDefault()
    try {
      let cur = await user

      let id = await user._id
      dispatch(setCurrentChat(cur))


      const response = await axios.get(`http://localhost:4000/messege/${id}`)  //conversation id
      const data = response.data.messege
      console.log(data)
      dispatch(setMessege(data))


    } catch (error) {
      console.log(error)
    }
  }

  const [conversationInfo,setConversationInfo]=useState([])

const getConnected=async(e,user)=>{
  e.preventDefault()
  try{
    let info= {
      senderId:userData._id,
      receiverId:user._id
    }
    console.log(info)
   setConversationInfo(info)
    const response = await axios.post("http://localhost:4000/connect",conversationInfo,{
      withCredentials:true
    })
    console.log(response)

  }catch(err){
    console.log(err)
  }
}
 



  if (userData && conversation) {
    return (
      <aside style={{
        position: "relative",



      }}>

        
        <Box sx={{
          position: "absolute",
          maxWidth: "100%",
          marginX: "2rem",
          overflowY:"scroll"
        }} >



          <TextField sx={{
            width: "100%",
            height: "fit-content",


          }}
            autoComplete='off'
            placeholder='Search'
            id="input-with-icon-textfield"

            InputProps={{
              style: { color: 'white' },
              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon style={{ color: 'white' }} />
                </InputAdornment>
              ),

            }}
            variant="filled"
          />




          <Box sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            height: "auto"
          }}>
             <Typography mt={3} variant="h6" color="inherit">Your Conversation</Typography>


            {
              conversation ?
              (
                conversation?.map((user, i) => (
                  <div key={i} onClick={(e) => getMessege(e, user)}>
                    
                    <Conversation user={user} />
                 
                  </div>
                ))
              ) :
           <Box  my={3} textAlign={"center"}>Try some guffsuff</Box>   
            }











          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            height: "auto"
          }}>
            <Typography variant="h6" color="inherit">All User</Typography>

{
              (
                allUser?.map((user, i) => (
                  <div key={i} onClick={(e) => getConnected(e, user)}>
                <Alluser user={user} />
                  </div>
                ))
              )
            }

 

          </Box>

         




          <Paper sx={{
            width: "20%",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: "4%",
            left: "2%",
            background: "#636b65"
          }}>
            <Typography flexGrow={1} variant="body1" color="inherit">{userData.firstname + " "+ userData.lastname}</Typography>
            <IconButton onClick={() => navigate("/login")} aria-label="logout"  >
              <LogoutIcon />
            </IconButton>
          </Paper>


        </Box>




      </aside>
    )
  } 

}



export default Userlist