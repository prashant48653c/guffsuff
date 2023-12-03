import { Box } from '@mui/material'
import React from 'react'

const Messege = ({mes,own}) => {
 if(mes){
  return (
    <Box className={own ?"messege":"own-messege " }p={1} sx={{
       display:"flex",
        marginY:"1rem",
        height:"auto",
        width:"100%"
     
        
        }} >
   
 <span className={own ? 'messege-text-own':"messege-text-other "}>  {mes.messege}  </span> 

        </Box>
  )
 }

}

export default Messege