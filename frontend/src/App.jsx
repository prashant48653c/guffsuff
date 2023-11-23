import { useState } from 'react'
import { createTheme, THEME_ID, ThemeProvider, Typography } from '@mui/material'
import Join from './components/Join'
import Userlist from './components/Userlist'
import Home from './components/Home'
import Emoji from './getData/emoji'
import Gif from './getData/Gif'
import Login from './components/Login'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  const theme = createTheme({
    typography:
    {
      fontFamily: ['Poppins', 'sans-serif'].join(","),
    },
  })

  return (
    <ThemeProvider theme={theme}>


      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />





        </Routes>

      </BrowserRouter>








    </ThemeProvider>

  )
}

export default App
