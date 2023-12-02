import { Box } from '@mui/material'
import React from 'react'

const Messege = ({mes,own}) => {
 if(mes){
  return (
    <Box className="messege" p={1} sx={{
        background:own ? "#4c4c70": "#4c4c57",
        marginY:"1rem"
        }} >
   
    <img src={mes.messege} alt="" />

        </Box>
  )
 }

}

export default Messege