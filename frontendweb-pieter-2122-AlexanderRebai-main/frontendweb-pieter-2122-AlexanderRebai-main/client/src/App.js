import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
        <BrowserRouter>
        <Container maxidth='xl'>
            <Navbar/>
            <Routes>
                <Route path='/' element={ <Navigate to='/posts' /> }/>
                <Route path='/posts' element={ <Home /> } />
                <Route path='/posts/search' element={ <Home /> } />
                <Route path='/posts/:id' element={ <PostDetails /> }/>
                <Route path='/auth' element={ (!user ? <Auth /> : <Navigate to='/posts' />) }/>
            </Routes>
        </Container>
    </BrowserRouter>
    );
}

    


export default App; 