import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import NavigationBar from '../pages/NavigationBar/NavigationBar'
import Process from '../pages/Process/Process'

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
                    <Route path='/learn' element={<Process />} />
                    <Route path='*' element={<></>} />
                </Routes>
                <></>
            </div>
        </BrowserRouter>
    )
}
