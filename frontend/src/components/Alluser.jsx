import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Alluser = ({user}) => {
const {onlineUser}=useSelector(state => state.conversation)
    const [onlineId,setOnlineId]=useState([])

  

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
            <Typography variant="body1" color="inherit">{user.firstname + " " + user.lastname}</Typography>
            <Typography variant="subtitle2" color="inherit">Click to connect</Typography>

        </div>
    </Box>
  )
}

export default Alluser