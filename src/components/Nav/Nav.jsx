import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import Hamburger from "hamburger-react"
import zIndex from '@mui/material/styles/zIndex';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className="nav">
      <div>
      {user.id && (
      <div >
        <Hamburger toggled={open} toggle={setOpen} color='#2B0702' 
                   rounded
        />
        {open && (
          <div className='menu'>
              <Link to="/user" className='menuitem'>My List</Link>
              <br />
              <Link to="/addbird" className='menuitem'>Add Bird Sighting</Link>
              <br />
              <Link to="/nearby" className='menuitem'>Recent sightings in your state</Link>
              <br />
              <Link to="/login" className='menuitem' onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</Link>
          </div>
        )}
      </div>
    )}
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
      </div>
      
      <div id='user'>
      {user.username} 
      </div>
    </div>
    
    
     </>
  );
}

export default Nav;
