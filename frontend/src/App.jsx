import { useState } from 'react'
 import {createTheme,THEME_ID,ThemeProvider, Typography} from '@mui/material'
import Join from './components/Join'
import Userlist from './components/Userlist'
import Home from './components/Home'
 
function App() {
  
  const theme=createTheme({
    typography:
    {
      fontFamily:['Poppins','sans-serif'].join(","),
    },
  })

  return (
    <ThemeProvider theme={theme}>
    
    <>


     <Home/>
   
 

    </>
    
    </ThemeProvider>
  
  )
}

export default App
