import { Box } from '@mui/material'
import React from 'react'

const Messege = ({mes,own}) => {
 
  return (
    <Box  p={1} sx={{
        background:own ? "#4c4c70": "#4c4c57",
        marginY:"1rem"
        }} >
       {mes.messege}

        </Box>
  )
}

export default Messege