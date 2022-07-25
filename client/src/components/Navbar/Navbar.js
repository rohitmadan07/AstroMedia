import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import navbarlogo from '../../images/navbarlogo.webp';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  const classes = useStyles();

  const logout = () => { 
    dispatch({ type: actionType.LOGOUT });

    navigate('/auth'); 

    setUser(null);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile'))); //setting user to the profile entered
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" >
      <Link to = "/" className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">AstroMedia</Typography>
        <img className={classes.image} src={navbarlogo} alt="icon" height="60" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0).toUpperCase()}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button  variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary" className={classes.signin} >Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;