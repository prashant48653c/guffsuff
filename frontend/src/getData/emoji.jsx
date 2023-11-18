    import React, { useState, useEffect } from 'react';
    import { Box, InputAdornment, TextField } from '@mui/material';
    import axios from 'axios';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    import SearchIcon from '@mui/icons-material/Search';

    const Emoji = () => {
    const [emojis, setEmojis] = useState([]);
    const [searchTerm, setSearchTerm] = useState('animal');


    const getEmoji = async () => {
    try {
    // Update the URL based on the search term
    const emojiUrl = `https://emoji-api.com/emojis?access_key=46db2961ed2b6ccea38a7cc445de06b182d45584&search=${searchTerm}`;
    const res = await axios.get(emojiUrl);

    // Update state with fetched emojis
    setEmojis(res.data);
    console.log(res)
    } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    }
    };



    return (
    <Box sx={{
    background:" #323645",
    borderRadius:"1rem",
    position:'absolute',
    bottom:"100%",
    left:"0%",

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
    <SearchIcon  onClick={getEmoji} style={{ color: 'white' }} />
    </InputAdornment>
    ),

    }}
    variant="filled"
    />


    </div>




    {/* Display the list of emojis */}
    <div className="emo-list">
    {

    emojis[0] &&   emojis.map((emoji) => (
    <span style={{
    fontSize:"2rem"
    }} key={emoji.slug}>

    {emoji.character}
    </span>
    ))



    }

    </div>


    </Box>
    );
    }



    export default Emoji;
