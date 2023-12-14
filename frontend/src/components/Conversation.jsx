import { Box, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriendData } from '../slices/authSlicer'
import DeleteIcon from '@mui/icons-material/Delete';


const Conversation = ({ user }) => {

    const dispatch = useDispatch()


    const { userData, onlineUser } = useSelector((state) => state.auth);
    const { currentChat } = useSelector((state) => state.conversation);

    const [friendData, setFriendData] = useState([]);

    const getFriendData = async (friendId) => {
        try {
            // console.log(friendId);
            const response = await axios.get(`http://localhost:4000/friendid/${friendId}`);
            const data = response.data.messege[0];
            (setFriendData(data))
            // console.log(response);
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

    const [onlineId, setOnlineId] = useState([])

    useEffect(() => {
        const onlineUserIds = onlineUser.map(user => user.userId);
        const commonUserIds = user.members.filter(userId => onlineUserIds.includes(userId));
        console.log(commonUserIds, "the onlne id")
        setOnlineId(commonUserIds)
    }, [onlineUser])


    const delMessege = async () => {
        try {
            let conversationId = currentChat._id
            console.log(conversationId)
            const response = await axios.delete("http://localhost:4000/delmessage", {
                data: { conversationId },
            })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Box  className="convo-person" sx={{
            padding: ".7rem",
            display: "flex",
            gap: "1rem",
            alignItem: "center",
            borderRadius: "1rem",
        
            marginY: "1rem"
        }}>
            <div  style={{
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
            <Box >
                <Typography variant="body1" color="inherit">{friendData.firstname + " " + friendData.lastname}</Typography>
                <Typography variant="subtitle2" color="inherit">{onlineId.includes(friendData._id) ? "Online" : "Click to chat"}</Typography>

            </Box>
            <IconButton onClick={delMessege} aria-label="videocall button" >
                <DeleteIcon />
            </IconButton>
        </Box>
    )


}

export default Conversation