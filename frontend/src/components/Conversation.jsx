import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriendData } from '../slices/authSlicer'

const Conversation = ({user}) => {

    const dispatch=useDispatch()

    const { userData } = useSelector((state) => state.auth)

 const [friendData,setFriendData]=useState([])

    const getFriendData=async(friendId)=>{
        console.log(friendId)
        const response=await axios.get(`http://localhost:4000/friendid/${friendId}`) //your selected conversation friend id friendId
        const data=response.data.messege
        setFriendData(data)
      
    }
    useEffect(()=>{
       
        if(user.members){
            const friendId=user.members.find((id)=> id !== userData._id)
            getFriendData(friendId)
           
        }
      
       
    },[])
    console.log(friendData)

    if(friendData){
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
                    }} src="https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0" alt="" />
                </div>
                <div >
                    <Typography variant="body1" color="inherit">{friendData.firstname}</Typography>
                    <Typography variant="subtitle2" color="inherit">Click to chat</Typography>
        
                </div>
            </Box>
          )
    }else{
        return(
            <>
            <div>Loading</div>
            </>
        )
    }

}

export default Conversation