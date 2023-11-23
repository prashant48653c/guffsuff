import { Box, InputAdornment, Paper, TextField, Typography, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../slices/authSlicer';
 

const Userlist = () => {
    let userList=[1,2 ,4]

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {userData}=useSelector((state)=>state.auth)
    const getUserData=async()=>{
     
        const response = await axios.get( "http://localhost:4000/getdata", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true
          });
    
          const data = response.data;
console.log(data)
dispatch(setUserData(data))
        }
        
        const getUserConversation=async()=>{
            try {
                const response=await axios.get(`/conversation/655f592eb1a7989a1570dbff`)
                const data=response.data
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
       

        useEffect(()=>{
            getUserConversation()

        },[])
 
 
    return (
        <aside style={{
            position: "relative",
            
 

        }}>
            <Box sx={{
                position: "fixed",
                maxWidth: "100%",
                marginX:"2rem"
            }} >
 
           
 
                    <TextField  sx={{
                        width:"100%",
                        height:"fit-content",
                     
                       
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
                   overflowY:"scroll",
                    height: "100vh"
                }}>

                
                {
                    userList.map((user,i)=>{
                        return(
                            <Box key={i} sx={{
                                padding:".7rem",
                                 display:"flex",
                                 gap:"1rem",
                                 alignItem:"center",
                                  borderRadius:"1rem",
                                 background:"#595f69",
                                 marginY:"1rem"
                             }}>
                                 <div style={{
                                     width:"3rem",
                                     height:"3rem",
                                     borderRadius:"56",
                                  
         
                                 }}>
                                 <img style={{
                                      width:"3rem",
                                      height:"3rem",
                                      borderRadius:"56rem"
                                 }}   src="https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0" alt="" />
                                 </div>
                               <div >
                               <Typography variant="body1" color="inherit">{user.firstname}</Typography>
                               <Typography variant="subtitle2" color="inherit">Click to chat</Typography>
         
                               </div>
                             </Box>
                        )
                    })
                }

                    
                 

                    
                 
                    
                 

                </Box>

                <Paper sx={{
                        width:"100%",
                        padding:"1rem",
                        display:"flex",
                        alignItems:"center",
                        position:"absolute",
                        bottom:"12%",
                        left:0,
                        background:"#636b65"
                      }}>
                               <Typography flexGrow={1} variant="body1" color="inherit">Prashant Acharya</Typography> 
                               <IconButton onClick={()=>navigate("/login")} aria-label="logout"  >
                                 <LogoutIcon/>
                               </IconButton>    
                                </Paper>

                             





            </Box>




        </aside>
    )
}

export default Userlist