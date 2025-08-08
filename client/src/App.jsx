import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import HomePage from './app/pages/HomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
