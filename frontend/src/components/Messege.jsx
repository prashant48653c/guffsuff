import { Box } from '@mui/material'
import React from 'react'

import moment from 'moment';
const Messege = ({ mes, own }) => {

       
if (mes) {
return (
<div>
<Box className={own ? "messege" : "own-messege "} p={1} sx={{
display: "flex",
marginY: "1rem",
height: "auto",
width: "100%"


}} >
<div style={{
maxWidth: "100%",
textAlign: own ? "right" : "left",
}}>
<p className={own ? 'messege-text-own' : "messege-text-other "}>  {mes.messege}  </p>
<i style={{
fontSize: ".8rem",
textAlign: "center"
}}>{ moment(mes.createdAt).fromNow()}</i>
</div>

</Box>

</div>

)
}

}

export default Messege