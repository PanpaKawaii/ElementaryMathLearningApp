import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import NavigationBar from '../pages/NavigationBar/NavigationBar'
import LearnContainer from '../pages/LearnContainer/LearnContainer'
import CommentTest from '../pages/Comment/CommentTest'
import Studying from '../pages/Studying/Studying'
import FinalQuiz from '../pages/Studying/FinalQuiz'
import Subject from '../pages/Subject/Subject'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <div
                className='main-container'
                style={{ display: 'flex' }}
            >
                {/* <NavigationBar />
                <Routes>
                    <Route path='/' element={<Navigate to='/learn' replace />} />
                    <Route path='/learn' element={<LearnContainer />} />
                    <Route path='/comment' element={<CommentTest />} />
                    <Route path='/studying/:id' element={<Studying />} />
                    <Route path='*' element={<Navigate to='/learn' replace />} />
                </Routes> */}

                <Routes>
                    <Route path='/' element={<Navigate to='/learn' replace />} />
                    <Route path='/' element={<NavigationBar />} >
                        <Route path='learn' element={<LearnContainer />} />
                        <Route path='subject' element={<Subject />} />
                        <Route path='comment' element={<CommentTest />} />
                    </Route>
                    {/* <Route path='*' element={<Navigate to='/learn' replace />} /> */}
                    <Route path='studying/topic/:id' element={<Studying />} />
                    <Route path='studying/chapter/:id' element={<FinalQuiz />} />
                </Routes>
                <></>
            </div>
        </BrowserRouter>
    )
}
