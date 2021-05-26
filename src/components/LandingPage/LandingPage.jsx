import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="practice-container">
      
      <header>
            <img id="header-banner" rel="header-banner" 
              src="Web-Header-C.png" 
              alt="Acorn to Oak Herbal Header Banner"
            />
          </header>
          <main>
            <div >

            </div>
          </main>
          <nav>SideNavBar</nav>

      <h2>Hello Friends!</h2>

      <div className="main">
        <div className="">
          <p>
          Welcome to Acorn to Oak Herbal where your holistic health is 
          naturally supported through every phase of life. Whether pregnant, 
          new born, or well worn, we’ll address lifestyle and nutrition 
          options and connect you with herbal remedies that suit <i>you</i>. You 
          are in control of your healing journey and at Acorn to Oak Herbal 
          you have the option to educate yourself with classes or consult 
          with Shyla about concoctions to reinvigorate your well-being. 
          Everyone is welcome here, and whether long time friend or new to 
          the crew, we look forward to seeing you!
          </p>
        </div>

        <div className="">
          <RegisterForm />

            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>

        </div>

      </div>
    </div>
  );
}

export default LandingPage;
