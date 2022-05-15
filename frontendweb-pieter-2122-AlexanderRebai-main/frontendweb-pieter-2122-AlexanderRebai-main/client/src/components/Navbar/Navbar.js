import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import flowerOfLife from '../../images/transparent-tree-of-life-5ee211f47d92f2.5931170715918740365144.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';


const Navbar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');  
        setUser(null);     
    };


    useEffect(() =>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
                alert('Login Expired! Sign in again');
            } 
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    
    return (
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Link to='/' className={classes.brandContainer} style={{paddingLeft: 13, textDecoration: 'none'}}>
                    <Typography className={classes.heading} variant="h2" align="center">Share a Feeling</Typography>
                    <img className={classes.image} src={flowerOfLife} alt='icon' height='60px'/>
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user ? (   
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign in</Button>
                    )}
                </Toolbar>
            </AppBar>
    );
}

export default Navbar;