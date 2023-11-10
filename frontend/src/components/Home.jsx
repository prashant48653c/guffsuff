import { Grid } from '@mui/material'
import React from 'react'
import Userlist from './Userlist'
import Chatbox from './Chatbox'

const Home = () => {
  return (
    <Grid container  >
        <Grid lg={3} md={4} sm={6} xs={0}  >
        <Userlist/>

        </Grid>

        <Grid lg={9}  md={8} sm={6} xs={12}  >
        <Chatbox/>

        </Grid>


    </Grid>
  )
}

export default Home