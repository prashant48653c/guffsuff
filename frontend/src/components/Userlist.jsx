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
import { setSearchName } from '../slices/toggleSlicer';


const Userlist = () => {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData,allUser } = useSelector((state) => state.auth)
  const { conversation, currentChat } = useSelector((state) => state.conversation)

  const { searchName } = useSelector((state) => state.toggle)




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
        // console.log(alluser, "all user")
      } catch (error) {
        console.error(error);
      }
    };
  
    getAllUser();
  }, [allUser]);

  
  
 
  const logout = async () => {
    try {
     
      const response = await axios.get("http://localhost:4000/logout", {
        withCredentials: true, // Include this to send cookies
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response) {
      
        navigate("/login");
      }
    } catch (error) {
 
      console.error("Logout failed:", error);
    }
  }
  const getMessege = async (e, user) => {
    e.preventDefault()
    try {
      let cur = await user

      let id = await user._id
      dispatch(setCurrentChat(cur))


      const response = await axios.get(`http://localhost:4000/messege/${id}`)  //conversation id
      const data = response.data.messege
      // console.log(data)
      dispatch(setMessege(data))
   window.innerWidth < 600 && navigate("/chatbox")

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
      // console.log(info)

      const response = await axios.post("http://localhost:4000/connect",info,{
        withCredentials:true
      })
    
   
     
      setConversationInfo(info)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    const getUserConversation = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/conversation/${userData._id}`);
        const data = response.data.data;
        dispatch(setConversation(data));
       // Check the data you're receiving
      } catch (error) {
        console.error(error);
      }
    };
  
    if (userData) {
      getUserConversation(); // Call the function to get user conversation
    }
  }, [userData,conversation,getConnected]);  
 

 const handleChange=(e)=>{
  if(e.key == 'Enter'){
    searchPerson()
    dispatch(setSearchName(" "))
  }
dispatch(setSearchName(e.target.value))
 
 }

const searchPerson=()=>{
  const result = allUser.filter((user) =>
  user.firstname.toLowerCase().includes(searchName.toLowerCase())
);

 
}

  if (userData && conversation) {
    return (
      <aside style={{
        position: "relative",
    
      }}>

        
        <Box sx={{
     
          maxWidth: "100%",
          marginX: "2rem",
          overflowY:"scroll",
          height:"85vh"
          
        }} >



          <TextField sx={{
            width: "100%",
            height: "fit-content",


          }}
            autoComplete='off'
            placeholder='Search'
            id="input-with-icon-textfield"
          onChange={handleChange}
            InputProps={{
              style: { color: 'white' },
              endAdornment: (
                <InputAdornment onClick={searchPerson} position="start">
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
                  <div onClick={(e) => getMessege(e, user)} key={i} >
                    
                    <Conversation  user={user} />
                 
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
                  <div  key={i} onClick={(e) => getConnected(e, user)}>
                <Alluser user={user} />
                  </div>
                ))
              )
            }

 

          </Box>

         




          <Paper sx={{
            width:(window.innerWidth < 600)? "100%":"20%",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: "4%",
            left: "2%",
            background: "#ccc"
          }}>
             <div style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "56",
        
        
                }}>
                    <img style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "56rem"
                    }} src="https://1fid.com/wp-content/uploads/2022/06/cool-profile-picture-2-1024x1024.jpg" alt="" />
                </div>
            <Typography flexGrow={1} px={2} variant="body1" color="inherit">{userData.firstname + " "+ userData.lastname}</Typography>
            <IconButton onClick={logout} aria-label="logout"  >
              <LogoutIcon />
            </IconButton>
          </Paper>


        </Box>




      </aside>
    )
  } 

}



export default Userlist