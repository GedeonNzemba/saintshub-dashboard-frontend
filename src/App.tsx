import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Navbar from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Container } from '@mui/material'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Container maxWidth="md" sx={{ bgcolor: '#E0E5E9', height: 'auto', paddingTop: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
