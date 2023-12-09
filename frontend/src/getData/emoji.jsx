import React, { useState, useEffect } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setEmoGif } from '../slices/messegeSlicer';

const Emoji = () => {
    const [emojis, setEmojis] = useState([]);
    const [searchTerm, setSearchTerm] = useState('cat');
    const { emoGif } = useSelector((state) => state.conversation)
    const dispatch = useDispatch()

    const getEmoGif=async(e)=>{
       
        let emo=(e.target.innerText)
        dispatch(setEmoGif(emo))
    }
    const getEmoji = async () => {
        try {
            // Update the URL based on the search term
            const emojiUrl = `https://emoji-api.com/emojis?access_key=46db2961ed2b6ccea38a7cc445de06b182d45584&search=${searchTerm}`;
            const res = await axios.get(emojiUrl);

            // Update state with fetched emojis
            setEmojis(res.data);


        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
        }
    };



    return (
        <Box sx={{
            background: " #323645",
            borderRadius: "1rem",
            position: 'absolute',
            bottom: "100%",
            left: "0%",

        }} p={2} width={'25rem'}>
            <div>
                <TextField type="text"
                    placeholder="Search Gif"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} sx={{
                        width: "100%",
                        height: "fit-content",


                    }}

                    id="input-with-icon-textfield"

                    InputProps={{
                        style: { color: 'white' },
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon onClick={getEmoji} style={{ color: 'white' }} />
                            </InputAdornment>
                        ),

                    }}
                    variant="filled"
                />


            </div>




            {/* Display the list of emojis */}
            <div className="emo-list">
                {

                    emojis[0] && emojis.map((emo) => {
                        return(
                            <div style={{
                                fontSize: "2rem"
                            }} key={emo.slug}>
    
                               <span onClick={(e,emo)=>getEmoGif(e,emo)}  > {emo.character} </span> 
                            </div>
                        )
                    })
                    
                  



                }

            </div>


        </Box>
    );
}



export default Emoji;
