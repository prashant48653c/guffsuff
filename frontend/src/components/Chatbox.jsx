import { AppBar, Box, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setShowEmoji, setShowGif } from '../slices/toggleSlicer';
import Emoji from '../getData/emoji';
import { useDispatch, useSelector } from 'react-redux';
import Gif from '../getData/Gif';
import axios from 'axios'
import { setMessege } from '../slices/messegeSlicer';
import Messege from './Messege';




const Chatbox = () => {


const dispatch = useDispatch()
const { showEmoji, showGif } = useSelector((state) => state.toggle)
const { currentChat } = useSelector(state => state.conversation)
const [messege,setmessege]=useState([])
const { userData } = useSelector((state) => state.auth)
const [presentChat,setPresentChat]=useState('')
const emojiShow = () => {

if (showEmoji == false) {
dispatch(setShowGif(false))
dispatch(setShowEmoji(true))

} else {
dispatch(setShowEmoji(false))

}
}
const [newMessege, setNewMessege] = useState({
sender: userData._id,
messege: 'hi',
conversationId:''

})
useEffect(()=>{
 if(currentChat){
    console.log(currentChat._id)
    setPresentChat(currentChat._id)
    setNewMessege({...newMessege,sender:userData._id,conversationId:currentChat._id})
     
    
    
 }
 

},[])

const gifShow = () => {
console.log("gif")
if (showGif == false) {
dispatch(setShowEmoji(false))
dispatch(setShowGif(true))
console.log("aayo")

} else {
dispatch(setShowGif(false))

}
}

const getMessege = async () => {
try {
    let id=await currentChat._id
    console.log(id)
const response = await axios.get(`http://localhost:4000/messege/${id}`)  //conversation id
const data = response.data.messege
setmessege(data)
 

} catch (error) {
console.log(error)
}
}




const updateMessege=(e)=>{
e.preventDefault()
setNewMessege({...newMessege,messege:e.target.value})
 
}



useEffect(() => {

getMessege()
}, [])
const submitMessege = async () => {
console.log(newMessege,"newmessege")
const response = await axios.post("http://localhost:4000/write", newMessege)
 console.log(response)
}

if (currentChat) {
return (
<Box pl={1}  >

<AppBar elevation={0} sx={{
background: "#595f69"
}} position='sticky'>
<Toolbar >
<Typography flexGrow={1} variant="h6" color="inherit">{currentChat.firstname}</Typography>

<Stack flexDirection={'row'} flexGrow={0} >

<IconButton aria-label="videocall button" >
<VideoCallIcon />
</IconButton>

<IconButton aria-label="videocall button" >
<ArrowBackIcon />
</IconButton>

</Stack>


</Toolbar>



</AppBar>

<div style={{
overflowY:"scroll",
height: "77vh",
padding: "2rem 0"

}}>
{
messege.map((elem, i) => {
 
return (
<Messege mes={elem} key={i} own={elem._id === userData._id} />

)
})
}







</div>


<form >

<TextField  onChange={updateMessege} value={newMessege.messege} autoComplete='off' fullWidth sx={{
paddingRight: "1rem",
border: 'none',
outline: "none",

borderRadius: 50,
background: "#343541"
}} placeholder='Type some messege' InputProps={{
style: { color: 'white' },
endAdornment: (
<InputAdornment onClick={(e) => submitMessege(e)} position="end">
<SendIcon style={{ color: 'white', cursor: "pointer" }} />
</InputAdornment>
),
startAdornment: (
<>
<InputAdornment sx={{ marginRight: ".7rem" }} position="start">
<ImageIcon style={{ color: 'white', cursor: "pointer" }} />
</InputAdornment>

<InputAdornment onClick={gifShow} sx={{ marginRight: ".7rem" }} position="start">
<GifIcon style={{ color: 'white', cursor: "pointer" }} />
</InputAdornment>

<InputAdornment onClick={emojiShow} sx={{ marginRight: ".7rem" }} position="start">
<EmojiEmotionsIcon style={{ color: 'white', cursor: "pointer" }} />
</InputAdornment>

{
showEmoji &&
(
<Emoji />
)
}

{
showGif &&
(
<Gif />
)
}

</>

)

}} />




</form>

</Box>
)
} else {
return (
<Box sx={{
width: "100%",
height: "100vh",
fontSize: "4rem",
justifyContent: "center",
display: "flex",
textAlign: "center",
alignItems: "center"
}} >You are lonely just like the developer</Box>
)
}

}

export default Chatbox