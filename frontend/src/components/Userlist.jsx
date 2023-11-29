import { Box, InputAdornment, Paper, TextField, Typography, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../slices/authSlicer';
import { setConversation, setCurrentChat, setMessege } from '../slices/messegeSlicer';
import Conversation from './Conversation';
import { io } from 'socket.io-client'


const Userlist = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth)
  const { conversation, currentChat } = useSelector((state) => state.conversation)





  useEffect(() => {
    const getUserData = async () => {
      console.log("hello")
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







  if (userData && conversation) {
    return (
      <aside style={{
        position: "relative",



      }}>
        <Box sx={{
          position: "fixed",
          maxWidth: "100%",
          marginX: "2rem"
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
            height: "100vh"
          }}>


            {
              (
                conversation?.map((user, i) => (
                  <div key={i} onClick={(e) => getMessege(e, user)}>
                    <Conversation user={user} />
                  </div>
                ))
              )
            }











          </Box>

          <Paper sx={{
            width: "100%",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: "12%",
            left: 0,
            background: "#636b65"
          }}>
            <Typography flexGrow={1} variant="body1" color="inherit">Prashant Acharya</Typography>
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