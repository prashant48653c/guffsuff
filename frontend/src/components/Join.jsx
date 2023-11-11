import React from 'react'
import BlackBg from '../assets/blackbg.jpg'
import Container from '@mui/material/Container'
import { Box, Typography, Link, FormControl, FormLabel, FormHelperText, TextField, Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

const Join = () => {
const navigate=useNavigate()
    const signup=()=>{
        console.log("submit click")
    }
return (
<section className='join-section' >

<Container sx={{
paddingTop: '3rem',
}} maxWidth="lg">


<Box  >

    <Typography gutterBottom variant="body1" color="inherit">Start for free</Typography>

    <Typography gutterBottom variant="h3" fontWeight={500} color="white">Create new account  </Typography>

    <Typography gutterBottom variant="subtitle2" color="inherit">Already A Member?   <Link onClick={()=>navigate("/login")} sx={{
        textDecoration:"none",
        paddingLeft:".5rem",
        color:"#87C4FF"
    }} >  Log In</Link>  </Typography>


    <form  onSubmit={signup} method='POST'>
        <div style={{
            color: "white",
            display:"flex",
            gap:"3rem",
            margin:"2rem 0"
        }} >

<TextField InputProps={{
            style: { color: 'white' },
        }} id="filled-basic" type='text'  placeholder='First name' variant="filled" />

<TextField InputProps={{
            style: { color: 'white' },
        }} id="filled-basic" type='text'  placeholder='Last name' variant="filled" />
        </div>
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
        }} type='submit'  variant="contained">Signup</Button>



    </form>
</Box>



 
</Container>

</section>
)
}

export default Join