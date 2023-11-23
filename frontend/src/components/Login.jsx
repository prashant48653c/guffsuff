import { Box, Button, Container, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
 const navigate=useNavigate()

 const [userCredential, setUserCredential] = useState({
    email:'',
    password:''
 })
 const handleChange=(e)=>{
   
const {name,value}=e.target;
setUserCredential({...userCredential,[name]:value})
 }

 const handleLogin=async(e)=>{
    e.preventDefault()
    
    try{

   
    const res=await axios.post("http://localhost:4000/login",userCredential,{
        headers: {
            'Content-Type': 'application/json', 
          },
        withCredentials:true
    })
    console.log(res)

}catch(err){
    console.log("logging error",err)

}

 }
 useEffect(()=>{
    console.log(userCredential)
 },[userCredential])

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


    <form   >
       
        <div 
       style={{
        color: "white",
        display:"flex",
        gap:"3rem",
        margin:"2rem 0"
     }}
        > 

        <TextField value={userCredential.email} name='email' onChange={handleChange} InputProps={{
            style: { color: 'white' },
        }} id="filled-basic" type='email'  placeholder='Email' variant="filled" />

        <TextField value={userCredential.password} name='password'  onChange={handleChange} InputProps={{
            style: { color: 'white' },
        }} id="filled-basic" type='password'  placeholder='Password' variant="filled" />

     

        </div>

        <Button  style={{
            padding:".7rem 3rem",
            borderRadius:"4rem"
        }} type='submit' variant='contained' onClick={handleLogin}  >Login</Button>



     </form>
</Box>




</Container>

</section>

    </>
  )
}

export default Login