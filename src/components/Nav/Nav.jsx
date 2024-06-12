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
        {user.id && (
          <>
            <Hamburger toggled={open} toggle={setOpen} />
            {open && (
              <div>
                  <Link to="/user">My List</Link>
                  <br />
                  <Link to="/addbird">Add Bird Sighting</Link>
                  <br />
                  <Link to="/nearby">recent sightings in your state</Link>
              </div>
            )}
            {/* add ChirpNet or "logo" to be centered */}
            {user.username} 
            {/* Move users name to display on top right on dom */}
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
