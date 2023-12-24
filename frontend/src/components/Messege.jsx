import { Box, IconButton, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'

const Messege = ({ mes, own }) => {
const [mesId,setSelectedMes]=useState('')
const [reload, setreload] = useState(false)

  const delMes=async()=>{

  
    try{
 
        const response=await axios.delete("http://localhost:4000/delsinglemessege",{
          data:{mesId}
        })
        
console.log(response)
 
    }catch(error){
      console.log(error,"Error while deleting messege in frontend")
    }
  }
     useEffect(()=>{
      if(mesId){

        delMes()
      }
   
     },[mesId])  
 

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
 height:"auto",
 
 maxWidth:"100%",
textAlign: own ? "right" : "left",
}}>
{
    mes.mestype =="text" ?
    <>
    <p style={{
      wordWrap:"break-word",
      height:"auto",
      textAlign:"center"
    }} className={own ? 'messege-text-own' : "messege-text-other "}>  {mes.messege}  </p>

</> :
<>
<img style={{
    height:"15rem",
     
    display:"block"
}} src={mes.messege} alt="" />
</>
}


<i style={{
fontSize: ".8rem",
textAlign: "justify"
}}>{ moment(mes.createdAt).fromNow()}</i>
 
</div>
<div className="edit-mes-btn">
    <IconButton onClick={()=> setSelectedMes(mes._id)} aria-label="messege option" >
      <DeleteIcon/>
    </IconButton>
  </div>
</Box>




</div>

)
}

}

export default Messege