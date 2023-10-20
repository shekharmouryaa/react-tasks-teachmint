import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Users from '../pages/Users'
import UserDetailPage from '../pages/UserDetailPage'

const MainRoute = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Users/>} />
              <Route path={`/user/:id`} element={<UserDetailPage/>} />
              <Route path='*' element={ <Navigate replace to='/' /> } />
            </Routes>
        </BrowserRouter>
    </div>
  )
}


export default MainRoute