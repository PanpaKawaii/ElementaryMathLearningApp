import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import NavigationBar from '../pages/NavigationBar/NavigationBar'

import LearnContainer from '../pages/LearnContainer/LearnContainer'
import Subject from '../pages/Subject/Subject'
import RankingContainer from '../pages/RankingContainer/RankingContainer'
import ProfileContainer from '../pages/ProfileContainer/ProfileContainer'
import LoginRegister from '../pages/LoginRegister/LoginRegister'

import Studying from '../pages/Studying/Studying'
import AdvancedQuestion from '../pages/ForumContainer/AdvancedQuestion'


export default function MainRoutes() {
    return (
        <BrowserRouter>
            <div
                className='main-container'
                style={{ display: 'flex' }}
            >
                <Routes>
                    <Route path='/' element={<Navigate to='/learn' replace />} />
                    <Route path='/' element={<NavigationBar />} >
                        <Route path='learn' element={<LearnContainer />} />
                        <Route path='subject' element={<Subject />} />
                        <Route path='ranking' element={<RankingContainer />} />
                        <Route path='profile' element={<ProfileContainer />} />
                        <Route path='login-register' element={<LoginRegister />} />
                        <Route path='forum/chapter/:chapter' element={<AdvancedQuestion />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/learn' replace />} />
                    <Route path='studying/chapter/:chapter/topic/:id' element={<Studying />} />
                    <Route path='studying/quiz/chapter/:chapter' element={<Studying />} />
                    <Route path='studying/advanced/chapter/:chapter' element={<Studying />} />
                </Routes>
                {/* <></> */}
            </div>
        </BrowserRouter>
    )
}
