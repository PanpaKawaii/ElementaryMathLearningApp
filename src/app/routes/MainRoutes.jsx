import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import NavigationBar from '../pages/NavigationBar/NavigationBar'
import LearnContainer from '../pages/LearnContainer/LearnContainer'
import CommentTest from '../pages/Comment/CommentTest'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <div
                className='main-container'
                style={{ display: 'flex' }}
            >
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<Navigate to='/learn' replace />} />
                    <Route path='/learn' element={<LearnContainer />} />
                    <Route path='/comment' element={<CommentTest />} />
                    <Route path='*' element={<></>} />
                </Routes>
                <></>
            </div>
        </BrowserRouter>
    )
}
