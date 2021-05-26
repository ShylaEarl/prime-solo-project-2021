import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './AddNewClient.css'


function addNewClient() {

  //functionality to dispatch information to a saga or reducer
  //const dispatch = useDispatch();

  //functionality to route to a page
  const history = useHistory();

  //sets local state for post request
  const [full_name, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  //collects local state info, bundles it as an object and POSTs to DB
  const addNewClient = () => {
    
  }//end addNewClient

  //clicking cancel btn routes back to Client Table (/user)
  const goBack = () => {
    history.push('/user');
  }//end goBack
  
  return (
    <div className="addClient-container">
      {/* break header into component when you feel comfortable doing so */}
      <header>
            <img id="header-banner" rel="header-banner" 
              src="Web-Header-C.png" 
              alt="Acorn to Oak Herbal Header Banner"
            />
          </header>
          <main>
            {/* <div className="leaf-logo">
              <img src=" " alt="illustrated oak leaf"/>
            </div> */}
            {/* Do you really want a form here? Just think about it? */}
            <form id="client-form" onSubmit={addNewClient}>
              <h3>New Client Information</h3>
              <input placeholder="Client Name"
                value={full_name}
                onChange={(event) => setFullName(event.target.value)}
              />
              <input placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <input placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
              <input placeholder="State"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
              <input placeholder="Zip Code"
                value={zip_code}
                onChange={(event) => setZipCode(event.target.value)}
              />
              <input placeholder="Phone Number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <input placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input className="a2o-btn" type="submit" name="submit" value="Submit" />
              <button className="a2o-btn" onClick={goBack}>Cancel</button>
            </form>
            {/* <div>
              <img src=" " alt="illustrated oak leaf"/>
            </div> */}
          </main>
          <nav>
            {/* Add links here and break out into a component when you feel comfortable to do so */}
            
          </nav>
    </div>
  );
}

export default addNewClient;


// //client side validation ensures there is a client name
// if (full_name === '') {
//   swal({
//       text: 'You forgot to add a client name!',
//       buttons: {
//           ok: true,
//       }
//   })
// } else {
//   //sends new client data to DB
//   axios.post('/api/client',
//       {
//           full_name: full_name,
//           address: address,
//           city: city,
//           state: state,
//           zip_code: zip_code,
//           phone: phone,
//           email: email,
//       }
//   ).then((response) => {
//       console.log('back from POST', response)
//       //swal success indicator

//       //clear input feilds

//       //route to client profile page
//       //history.push('/');
//   }).catch((error) => {
//       console.log('in addNewClient POST', error)
// });