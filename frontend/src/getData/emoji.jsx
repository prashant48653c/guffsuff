import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

const Emoji = () => {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('computer');

 
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
        background:" #323645"
    }} p={2} width={'25rem'}>
    
      <input
        type="text"
        placeholder="Search emoji"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
         <button onClick={getEmoji} >search</button>

      {/* Display the list of emojis */}
      <div className="emo-list">
        {
            emojis &&   emojis.map((emoji) => (
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
};

export default Emoji;
