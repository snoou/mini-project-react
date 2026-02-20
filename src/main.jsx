import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Component/Layout/Layout.jsx'
import About from './About/About.jsx'
import Task from './Component/Task/Task.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes >
        <Route element={<Layout />}>
          <Route index path='/' element={<App/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/task' element={<Task/>} />

        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>

)
