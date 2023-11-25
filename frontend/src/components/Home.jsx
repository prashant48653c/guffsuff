import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Userlist from './Userlist'
import Chatbox from './Chatbox'
import {io} from 'socket.io-client'

const Home = () => {


const [socket,setSocket]=useState(null)
useEffect(()=>{
setSocket(io('ws://localhost:3000'))
console.log("soc soc")
},[])






  return (
    <Grid container  >
        <Grid item lg={3} md={4} sm={6} xs={0}  >
        <Userlist/>

        </Grid>

        <Grid item lg={9}  md={8} sm={6} xs={12}  >
        <Chatbox/>

        </Grid>


    </Grid>
  )
}

export default Home