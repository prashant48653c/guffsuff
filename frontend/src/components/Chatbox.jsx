import { AppBar, Box, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import VideoCallIcon from '@mui/icons-material/VideoCall';
const Chatbox = () => {
  return (
    <Box p={1}>

        <AppBar position='sticky'>
            <Toolbar >
        <Typography flexGrow={1} variant="h6" color="inherit">Jasmin Rijal</Typography>
        <IconButton flexGrow={1} aria-label="videocall button" >
              <VideoCallIcon/>
            </IconButton>
            </Toolbar>

          
          
        </AppBar>

        <div style={{
                   
                    height:"77vh",
                    border:"1px solid green",
                    padding:"2rem"
                }}>
                    Prashant Acharya
                </div>  


                <form >

                <TextField fullWidth sx={{
                    paddingRight:"1rem"
                }} id="fullWidth"  placeholder='Type some messege'  InputProps={{
                            style: { color: 'white' },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SendIcon style={{ color: 'white',cursor:"pointer" }} />
                                </InputAdornment>
                            ),
                            startAdornment:(
                                <>
                                   <InputAdornment sx={{marginRight:".7rem"}} position="start">
                                <ImageIcon style={{ color: 'white',cursor:"pointer" }} />
                            </InputAdornment>
                             <InputAdornment position="start">
                             <GifIcon style={{ color: 'white',cursor:"pointer" }} />
                         </InputAdornment> 
                                </>
                               
                            ) 

                        }} />

                    


                </form>
               
    </Box>
  )
}

export default Chatbox