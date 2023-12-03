import { Grid } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Userlist from './Userlist'
import Chatbox from './Chatbox'

import { useSelector } from 'react-redux'

const Home = () => {

  return (
    <Grid container width={"100%"} height={"100vh"} >
        <Grid item xl={3} lg={3} md={4} sm={6} xs={0}  >
        <Userlist/>

        </Grid>

        <Grid item xl={9} lg={9}  md={8} sm={6} xs={12}  >
        <Chatbox/>

        </Grid>


    </Grid>
  )
}

export default Home