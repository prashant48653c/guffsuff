import React, { useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/material';

const Gif = () => {
    const [gif,setGif]=useState([])
    const [searchTerm, setSearchTerm] = useState('computer');
    const gifLink = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=xVgR60pKhY2lCCFZJJ7SSzQ6Svtb2r7j&limit=5`
    const getGif = async () => {
        const res = await axios.get(gifLink)
     
        setGif(res.data.data)
    }



    return (
        <Box sx={{
            background:" #323645",
           
        }} p={2} width={'25rem'}>
        
          <input
            type="text"
            placeholder="Search emoji"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
             <button onClick={getGif} >search</button>
    
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