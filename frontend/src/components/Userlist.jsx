import { Box, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Userlist = () => {
    return (
        <aside style={{
            position: "relative",
            border: "1px solid red",


        }}>
            <Box sx={{
                position: "fixed",
                maxWidth: "100%",
                marginX:"2rem"
            }} >

                <div className="search-div">
                    <TextField
                        placeholder='Search'
                        id="input-with-icon-textfield"

                        InputProps={{
                            style: { color: 'white' },
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon style={{ color: 'white' }} />
                                </InputAdornment>
                            ),

                        }}
                        variant="standard"
                    />

                </div>



                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "scroll",
                    height: "100vh"
                }}>

                    <div style={{
                        paddingTop: "6rem"
                    }}>
                        Prashant Acharya
                    </div>

                    <div style={{
                        paddingTop: "6rem"
                    }}>
                        Prashant Acharya
                    </div>
                    <div style={{
                        paddingTop: "6rem"
                    }}>
                        Prashant Acharya
                    </div>
                    <div style={{
                        paddingTop: "6rem"
                    }}>
                        Prashant Acharya
                    </div>
                    <div style={{
                        paddingTop: "6rem"
                    }}>
                        Prashant Acharya
                    </div>
                    <div style={{
                        paddingTop: "6rem"
                    }}>
                        Prashant Acharya
                    </div>
                    <div style={{
                        paddingTop: "6rem"
                    }}>
                        Prashant Acharya
                    </div>


                </Box>









            </Box>




        </aside>
    )
}

export default Userlist