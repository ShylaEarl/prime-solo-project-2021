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
      <br/>
      <br/>
      <Link className="navLink" to="/about">
        &#9651; About
      </Link>
      <br/>
      <br/>
      <Link className="navLink" to='/home'>
        &#9651; Home
      </Link>
      <br/>
      <br/>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          &#9651; {loginLinkData.text}
        </Link>
        <br/>
        <br/>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              &#9651; Add New Client
            </Link>
            <br/>
            <br/>
            <Link className="navLink" to="/CBoR">
              &#9651; Client Bill of Rights
            </Link>
            <br/>
            <br/>
            <Link className="navLink" to=" ">
              &#9651; Health History Form
            </Link>
            <br/>
            <br/>
            <Link className="navLink" to=" ">
              &#9651; Aftercare Instruction Sheet
            </Link>
            <br/>
            <br/>
            <Link className="navLink" to=" ">
              &#9651; Email
            </Link>
            <br/>
            {/* <LogOutButton /> */}
            <br/>
            <button
              className="logout_btn_asLink"
              onClick={() => dispatch({ type: 'LOGOUT' })}
            >
              &#9651; Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
