import React, {useState} from 'react';
//import { useDispatch } from 'react-redux';
import axios from 'axios';
import './AddNewClient.css'


function addNewClient() {

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

    //input validation prior to POST w swal

    //swal success indicator

    //clear input feilds

    //route to client profile page

  }//end addNewClient

  //clicking cancel btn routes back to Client Table (/user)
  const goBack = () => {

  }
  
  return (
    <div className="addClient-container">
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
              <button className="a2o-btn" type="cancel" name="cancel" value="Cancel">Cancel</button>
            </form>
            {/* <div>
              <img src=" " alt="illustrated oak leaf"/>
            </div> */}
          </main>
          <nav>

          </nav>
    </div>
  );
}

export default addNewClient;
