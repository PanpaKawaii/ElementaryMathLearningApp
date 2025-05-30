import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NavigationBar from '../pages/NavigationBar/NavigationBar'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <div
                className='main-container'
                style={{ display: 'flex' }}
            >
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<></>} />
                    <Route path='*' element={<></>} />
                </Routes>
                <></>
            </div>
        </BrowserRouter>
    )
}
