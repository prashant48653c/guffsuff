import { Grid } from '@mui/material'
import React from 'react'
import Userlist from './Userlist'
import Chatbox from './Chatbox'

const Home = () => {
  return (
    <Grid container rowGap={1} >
        <Grid lg={3} >
        <Userlist/>

        </Grid>

        <Grid lg={9}  >
        <Chatbox/>

        </Grid>


    </Grid>
  )
}

export default Home