import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriendData } from '../slices/authSlicer'

const Conversation = ({user}) => {

    const dispatch=useDispatch()
    

    const { userData } = useSelector((state) => state.auth);
    const [friendData, setFriendData] = useState([]);
    
    const getFriendData = async (friendId) => {
        try {
            console.log(friendId);
            const response = await axios.get(`http://localhost:4000/friendid/${friendId}`);
            const data = response.data.messege[0];
           (setFriendData(data))
            console.log(response);
        } catch (error) {
            console.error("Error fetching friend data:", error);
        }
    };
    
    useEffect(() => {
        if (user.members && user.members.length > 0) {
            const friendId = user.members.find((id) => id !== userData._id);
            if (friendId) {
                getFriendData(friendId);
            } else {
                console.error("Friend ID not found in user.members");
            }
        }
    }, [user]);
    
    console.log(friendData);
    

    
   return (
            <Box  sx={{
                padding: ".7rem",
                display: "flex",
                gap: "1rem",
                alignItem: "center",
                borderRadius: "1rem",
                background: "#595f69",
                marginY: "1rem"
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
                    }} src="https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg" alt="" />
                </div>
                <div >
                    <Typography variant="body1" color="inherit">{friendData.firstname + " "+ friendData.lastname}</Typography>
                    <Typography variant="subtitle2" color="inherit">Click to chat</Typography>
        
                </div>
            </Box>
          )
    
     
    } 

export default Conversation