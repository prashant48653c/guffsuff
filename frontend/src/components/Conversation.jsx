import { Box, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriendData } from '../slices/authSlicer'
import DeleteIcon from '@mui/icons-material/Delete';


const Conversation = ({ user }) => {

    const dispatch = useDispatch()


    const { userData, onlineUser,friendData } = useSelector((state) => state.auth);
    const { currentChat } = useSelector((state) => state.conversation);
const [oneFriendData,setOneFriendData]=useState([])
    

    const getFriendData = async (friendId) => {
        try {
            // console.log(friendId);
            const response = await axios.get(`https://guffsuffback.onrender.com/friendid/${friendId}`);
            const data = response.data.messege[0];
            (setOneFriendData(data))
            console.log("From chatbox 25")
            // console.log(response);
        } catch (error) {
            console.error("Error fetching friend data:", error);
        }
    };

    useEffect(() => {
        if (user.members && user.members.length > 0) {
            const friendId = user.members.find((id) => id !== userData._id);
            if (friendId) {
                console.log("from conversation.jsx line 35 ")
                getFriendData(friendId);
            } else {
                console.error("Friend ID not found in user.members");
            }
        }
    }, []);

    const [onlineId, setOnlineId] = useState([])

    useEffect(() => {
        const onlineUserIds = onlineUser.map(user => user.userId);
        const commonUserIds = user.members.filter(userId => onlineUserIds.includes(userId));
   
        setOnlineId(commonUserIds)
    }, [onlineUser])


    const delMessege = async () => {
        try {
            let conversationId = currentChat._id
           
            const response = await axios.delete("https://guffsuffback.onrender.com/delmessage", {
                data: { conversationId },
            })
           
        } catch (err) {
            console.log(err)
        }
    }

 


    return (
        <Box onClick={()=>setFriendData(oneFriendData)} className="convo-person" sx={{
            padding: ".7rem",
            display: "flex",
            gap: "1rem",
            alignItem: "center",
            borderRadius: "1rem",
       justifyContent:"space-between",
            marginY: "1rem"
        }}>
            <div  style={{
                 
                borderRadius: "56",
                display:"flex",
                gap:"1rem",
                maxWidth:"100%"


            }}>
                <img style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "56rem"
                }} src="https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg" alt="" />
  <div>
                
                <Typography variant="body1" color="inherit">{oneFriendData.firstname + " " + oneFriendData.lastname}</Typography>
                <Typography variant="subtitle2" color="inherit">{onlineId.includes(oneFriendData._id) ? "Online" : "Click to chat"}</Typography>

            </div>
            </div>
           
          
            <IconButton onClick={delMessege} aria-label="videocall button" >
                <DeleteIcon />
            </IconButton>
            
          


        </Box>
    )


}

export default Conversation