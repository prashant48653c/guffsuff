    import React, { useState } from 'react'
    import axios from 'axios'
    import { Box, InputAdornment, TextField } from '@mui/material';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    const Gif = () => {
    const [gif,setGif]=useState([])
    const [searchTerm, setSearchTerm] = useState('computer');
    const gifLink = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=xVgR60pKhY2lCCFZJJ7SSzQ6Svtb2r7j&limit=5`
    const getGif = async () => {
    const res = await axios.get(gifLink)

    setGif(res.data.data)
    }
 


    return (
    <Box  sx={{
    background:" #323645",
    borderRadius:"1rem"

    }} p={2} width={'25rem'}>
        
<div>
<TextField   type="text"
    placeholder="Search Gif"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}  sx={{
                        width:"100%",
                        height:"fit-content",
                     
                       
                    }}
                       
                        id="input-with-icon-textfield"

                        InputProps={{
                            style: { color: 'white' },
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon  onClick={getGif} style={{ color: 'white' }} />
                                </InputAdornment>
                            ),

                        }}
                        variant="filled"
                    />
 
    
</div>
  

    {/* Display the list of emojis */}
    <div className="emo-list">
    {
    gif.map((elem,i)=>{

    return  (

    <div key={i} >
    <img style={{
    width:"100%"
    }} src={elem.images.original.url} alt="" />
    </div>   
    )
    })
    }

    </div>


    </Box>
    )
    }

    export default Gif