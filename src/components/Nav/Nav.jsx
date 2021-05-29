import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login',
  };

  if (user.id != null) {
    loginLinkData.path = '/user'; // /user is the client table view
    loginLinkData.text = 'Client Table';
  }

  return (
    <nav>
      <Link to='/home'>
        Home
      </Link>
      <br/>
      <div>
        <Link to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>
        <br/>

        {user.id && (
          <>
            <Link to=" ">
              Client Bill of Rights
            </Link>
            <br/>
            <Link to=" ">
              Health History Form
            </Link>
            <br/>
            <Link to=" ">
              Aftercare Instruction Sheet
            </Link>
            <br/>
            <Link to="/info">
              Add New Client
            </Link>
            <br/>
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
