import { Box, Button, Container, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
 const navigate=useNavigate()

  return (
    <>

<section className='join-section' >

<Container sx={{
paddingTop: '3rem',
}} maxWidth="lg">


<Box  >

    <Typography gutterBottom variant="body1" color="inherit">Hello! Again</Typography>

    <Typography gutterBottom variant="h3" fontWeight={500} color="white">Login here</Typography>

    <Typography gutterBottom variant="subtitle2" color="inherit">Don't have an account?   <Link onClick={()=>navigate("/join")} sx={{
        textDecoration:"none",
        paddingLeft:".5rem",
        color:"#87C4FF"
    }} > Sign Up</Link>  </Typography>


    <form    method='POST'>
       
        <div 
       style={{
        color: "white",
        display:"flex",
        gap:"3rem",
        margin:"2rem 0"
    }}
        > 

        <TextField InputProps={{
            style: { color: 'white' },
        }} id="filled-basic" type='email'  placeholder='Email' variant="filled" />

        <TextField InputProps={{
            style: { color: 'white' },
        }} id="filled-basic" type='password'  placeholder='Password' variant="filled" />

     

        </div>

        <Button sx={{
            padding:".7rem 3rem",
            borderRadius:"4rem"
        }} type='submit'  variant="contained">Login</Button>



    </form>
</Box>




</Container>

</section>

    </>
  )
}

export default Login