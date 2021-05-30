import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Profile(){

    //sets state for conditional rendering for update inputs
    const [updateClicked, setupdateClicked] = useState(false);

    //you will need to create and set local state here for input updates
    //sets local state for put request
    const [full_name, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    //functionality to route to a page
    const history = useHistory();

    //whole store
    const store = useSelector((store) => store);

    //client store instance 
    const client = useSelector((store) => store.client);
    
    //specific client's info (details) store instance 
    const clientInfo = useSelector((store) => store.clientInfo);
    
    //appointment store instance currently holds all appt info and client info
    const appt = useSelector((store) => store.appt);

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();
  
    //axios get (or useEffect dispatch to saga) to retrieve clients from DB
    // useEffect(() => {
    //     dispatch({ type: 'FETCH_CLIENT' }); 
    //     dispatch({ type: 'FETCH_APPT' }); 
    // }, []);

    //PUT route to update client information
    const updateClientInfo = () => { //event, client
        const updatedClientInfo = {
            id: clientInfo.id,
            full_name: full_name,
            address: address,
            city: city,
            state: state,
            zip_code: zip_code,
            phone: phone,
            email: email,
        }
        console.log('updated client info:', updatedClientInfo);
        dispatch({type: 'UPDATE_CLIENT', payload: updatedClientInfo});

        // //axios put call to server on '/info' route 
        // axios.put(`/api/info/${id}`)
        // .then((response) => {
        // console.log('put request', response);
        // //get call replaced by useEffect
        // //dispatch({ type: 'UPDATE_CLIENT_INFO', payload: ${id}??? }); do I include a payload here to get one specific client's details? 
        // })
        // .catch((error) => {
        // console.log('error in UPDATE', error);
        // });

        setupdateClicked(false);
        console.log('update', updateClicked);

    }

    //renders client info to become client inputs to edit
    const renderToInputs = () => {
        setupdateClicked(true);
        console.log('update', updateClicked);

        //sets local state to clientInfo reducer data
        setFullName(clientInfo.full_name);
        setAddress (clientInfo.address);
        setCity(clientInfo.city);
        setState(clientInfo.state);
        setZipCode(clientInfo.zip_code);
        setPhone(clientInfo.phone);
        setEmail(clientInfo.email);

    }

    //temporary functionality to access ApptDetails page
    const apptDetails = () => {
        console.log('appt details clicked!', );
        history.push('/ApptDetails');
    }

    return(
        <div className="card-whole">
            {updateClicked ? 
            <div className="card-half-left-inputs"> 
                <input type="text"
                // placeholder={clientInfo.full_name}
                value={full_name}
                onChange={(event) => setFullName(event.target.value)}
                />
                <input type="text"
                // placeholder={clientInfo.address}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                />
                <input type="text"
                // placeholder={clientInfo.city}
                value={city}
                onChange={(event) => setCity(event.target.value)}
                />
                <input type="text"
                // placeholder={clientInfo.state}
                value={state}
                onChange={(event) => setState(event.target.value)}
                />
                <input type="text"
                // placeholder={clientInfo.zip_code}
                value={zip_code}
                onChange={(event) => setZipCode(event.target.value)}
                />
                <input type="text"
                // placeholder={clientInfo.phone}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                />
                <input type="text"
                // placeholder={clientInfo.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <button className="a2o-btn" onClick={updateClientInfo}>Submit</button>
            </div> 
            :
            <div className="card-half-left"> 
                {/* {JSON.stringify(clientInfo)} */}
                <br/>
                <h2>{clientInfo.full_name}</h2>
                <p>{clientInfo.address}</p>
                <p>{clientInfo.city}</p>
                <p>{clientInfo.state}</p>
                <p>{clientInfo.zip_code}</p>
                <p>{clientInfo.phone}</p>
                <p>{clientInfo.email}</p>

                {/* onClick renders to editable input feilds for client info and submit button */}
                <button className="a2o-btn" onClick={renderToInputs}>Update Info</button>
            </div>}
            
            {/* specific client's appointment history list */}
            <div className="card-half-right">
                <h3>Appointment History</h3>
                <ul>
                {/* font awesome leaf icon for li - still need to install */}
                <i class="fab fa-pagelines"></i>
                <li className="li_asLink" onClick={apptDetails}>12/12/20 Winter Wellness</li>
                </ul>

                {/* code similar to Mary's lecture */}
                {/* <ul>
                    {appt.map((item, i) => 
                        <li key={i} onClick={() => apptDetails(item.id)}>
                            {item.date}{item.appt_name}
                            <button>View Details(can also make li a link)</button>
                        </li>
                    )}
                </ul> */}
                {/* Appointment details also conditionally render depending on date */}
            </div>
        
        </div>
    );
}

export default Profile;

//  {/* map through appt reducer to return all appts specific to this client */}
//  {appt.map((item, i) => {
//     return(
//     <ul key={i}>
//         {/* <li onClick={() => apptDetails(item.id)}>{item.date}{item.appt_name}</li> */}
//     </ul>)
// })}