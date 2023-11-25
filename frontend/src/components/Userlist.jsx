import { Box, InputAdornment, Paper, TextField, Typography, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../slices/authSlicer';
import { setConversation, setCurrentChat, setMessege } from '../slices/messegeSlicer';
import Conversation from './Conversation';


const Userlist = () => {


const navigate = useNavigate()
const dispatch = useDispatch()
const { userData } = useSelector((state) => state.auth)
const { conversation,currentChat } = useSelector((state) => state.conversation)
 
const getUserData = async () => {

const response = await axios.get("http://localhost:4000/getdata", {
headers: {
Accept: "application/json",
"Content-Type": "application/json",
},
withCredentials: true
});

const data = response.data;

dispatch(setUserData(data))
}

const getUserConversation = async () => {
try {
const response = await axios.get(`http://localhost:4000/conversation/${userData._id}`) //your user id
const data = response.data.data
dispatch(setConversation(data))

} catch (error) {
console.log(error)
}
}
const getMessege = async () => {
  try {
      let id=await currentChat._id
      console.log(id)
  const response = await axios.get(`http://localhost:4000/messege/${id}`)  //conversation id
  const data = response.data.messege
  dispatch(setMessege(data))
   
  
  } catch (error) {
  console.log(error)
  }
  }
  const getAllMessege=async(e,user)=>{
    dispatch(setCurrentChat(user))
    getMessege()
  }


useEffect(() => {
getUserData()
getUserConversation()

}, [])

if(userData ){
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
  conversation.map((user, i) => (
    <div key={i} onClick={(e,user)=>getAllMessege(e,user)}>
      <Conversation user={user} />
    </div>
  ))
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