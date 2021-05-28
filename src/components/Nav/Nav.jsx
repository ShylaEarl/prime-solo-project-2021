import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user'; // /user is the client table view and is called HOME in the nav bar
    loginLinkData.text = 'Client Table';
  }

  return (
    <nav>
      <Link to="/home">
        Home
      </Link>
      <div>
        <Link to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link to="/info">
              Add New Client
            </Link>
            <LogOutButton />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
        {/* about page is for anyone to see, they do not need to be logged in */}
      </div>
    </nav>
  );
}

export default Nav;
