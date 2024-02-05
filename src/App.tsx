import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home.1'
import { Container } from '@mui/material'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="md" sx={{ bgcolor: '#ffffff', height: 'auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
