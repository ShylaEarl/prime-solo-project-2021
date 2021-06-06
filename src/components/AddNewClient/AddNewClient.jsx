import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './AddNewClient.css'
import reduxSaga from 'redux-saga';

function addNewClient() {

  //functionality to dispatch information to a saga and reducer
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

  //collects local state info, bundles it as an object and POSTs to DB (move to saga eventually...)
  const addNewClient = () => {
    //input validation and alert
    if(full_name == '' || address == '' || city == '' || state == '' ||
        zip_code == '' || phone == '' || email == ''){
      swal({
        text: 'Please fill in all fields!',
        buttons: {
          ok: true,
        }
      })
      //create const cleint info = {object} here to send
      //dispatch({ type: add_client payload: client info})
    } else {
      axios.post('/api/info', 
        {
          full_name: full_name,
          address: address,
          city: city,
          state: state,
          zip_code: zip_code,
          phone: phone,
          email: email,
        }
      ).then((response) => {
        //console.log('back from new client POST', response.data);
        //swal success indicator
        swal({
          text: "Your new client has been submitted!",
          icon: "success"
        });
        //currently routing to client table. could route to NEW client's profile page 
        history.push('/user'); //`/Profile/${???}` add id param here. also add in router?
      }).catch((error) => {
        console.log('error in new client POST', error);
      });
    }
  }//end addNewClient

  //clicking cancel btn routes back to Client Table (/user)
  const goBack = () => {
    history.push('/user');
  }//end goBack
  
  return(
    <div className="card-whole">
          
      {/* <div className="leaf-logo">
        <img src=" " alt="illustrated oak leaf"/>
      </div> */}
      
      <form className="input-form" onSubmit={addNewClient}>
        <h3>New Client Information</h3>
        <input type="text"
          placeholder="Client Name"
          value={full_name}
          onChange={(event) => setFullName(event.target.value)}
        />
        <input type="text"
          placeholder="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <input type="text"
          placeholder="City"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <input type="text"
          placeholder="State"
          value={state}
          onChange={(event) => setState(event.target.value)}
        />
        <input type="text"
          placeholder="Zip Code"
          value={zip_code}
          onChange={(event) => setZipCode(event.target.value)}
        />
        <input type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <input type="text"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input className="a2o-btn" type="submit" name="submit" value="Submit" />
        <button className="a2o-btn" onClick={goBack}>Cancel</button>
      </form>

      {/* <div className="lavendar-ill">
        <img src="lavendar-illustration.jpg" alt="illustrated lavendar stem"/>
      </div> */}
          
    </div>
  );
}

export default addNewClient;

// //clear input feilds
// setFullName('');
// setAddress('');
// setCity('');
// setState('');
// setZipCode('');
// setPhone('');
// setEmail('');
