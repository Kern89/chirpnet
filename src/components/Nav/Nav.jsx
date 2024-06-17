import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Hamburger from "hamburger-react"

function Nav() {
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);

  return (
    <>
    <div className="nav">
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        
      </div>
      <div id='user'>
      {user.username} 
      </div>
    </div>
    {user.id && (
      <>
        <Hamburger toggled={open} toggle={setOpen} color='#2B0702' className='menu'/>
        {open && (
          <div>
              <Link to="/user">My List</Link>
              <br />
              <Link to="/addbird">Add Bird Sighting</Link>
              <br />
              <Link to="/nearby">recent sightings in your state</Link>
              <br />
              <LogOutButton className="navLink" />
          </div>
        )}
        
        {/* Move users name to display on top right on dom */}
        <br />
        
      </>
    )}
     </>
  );
}

export default Nav;
