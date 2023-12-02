import { Box, Typography } from '@mui/material'
import React from 'react'

const Alluser = ({user}) => {
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
            <Typography variant="body1" color="inherit">{user.firstname + " " + user.lastname}</Typography>
            <Typography variant="subtitle2" color="inherit">Click to chat</Typography>

        </div>
    </Box>
  )
}

export default Alluser