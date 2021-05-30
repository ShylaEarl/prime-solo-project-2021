import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

function Nav() {
  const dispatch = useDispatch();
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
      <Link className="navLink" to='/home'>
        Home
      </Link>
      <br/>
      <br/>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>
        <br/>
        <br/>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Add New Client
            </Link>
            <br/>
            <br/>
            <Link className="navLink" to=" ">
              Client Bill of Rights
            </Link>
            <br/>
            <br/>
            <Link className="navLink" to=" ">
              Health History Form
            </Link>
            <br/>
            <br/>
            <Link className="navLink" to=" ">
              Aftercare Instruction Sheet
            </Link>
            <br/>
            {/* <LogOutButton /> */}
            <br/>
            <button
              className="logout-btn"
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              Log Out
            </button>
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
