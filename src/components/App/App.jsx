import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

//import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import AddNewClient from '../AddNewClient/AddNewClient';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Profile from '../Profile/Profile';
import AddNewAppt from '../AddNewAppt/AddNewAppt';
import ApptNotes from '../ApptNotes/ApptNotes';
import ApptDetails from '../ApptDetails/ApptDetails';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <div className="container">
      <header>
        <img id="header-banner" rel="header-banner" 
          src="Web-Header-C.png" 
          alt="Acorn to Oak Herbal Header Banner"
        />
      </header>
      <Router>
      <Nav />
      <main>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <AddNewClient />
          </ProtectedRoute>

          <ProtectedRoute 
            // logged in shows Profile page else shows LoginPage
            exact
            path="/Profile/:id">
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddNewAppt page else shows LoginPage
            exact
            path="/AddAppt/:id">
            <AddNewAppt />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ApptNotes page else shows LoginPage
            exact
            path="/ApptNotes">
            <ApptNotes />
          </ProtectedRoute>

          <ProtectedRoute
            //logged in shows ApptDetails page else shows LoginPage
            exact
            path="/ApptDetails/:id">
            <ApptDetails />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
        
      </main>
      </Router>
    </div>
  );
}

export default App;
