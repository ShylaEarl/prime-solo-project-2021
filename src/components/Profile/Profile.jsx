import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
//import axios from 'axios';

function Profile(){ 

    //grabs dynamic part of URL, client id, 
    //figure out how to use this for rendering with updated info
    //also should this be used for fetching specific clients appt info?
    //or clientInfo.id that is in the reducer?
    let {id} = useParams();
    console.log(id);

    const [updateClicked, setupdateClicked] = useState(false);

    //create and set local state for input updates
    const [full_name, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    //functionality to route to a page
    const history = useHistory();
    
    //clientInfo store instance 
    const clientInfo = useSelector((store) => store.clientInfo);
    console.log(clientInfo.id);

    //appointment store instance currently holds all appt info and client info
    const appt = useSelector((store) => store.appt);
    console.log(appt);

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();
  
    //on page load, retrieve this client's appts from server/DB
    useEffect(() => {
        dispatch({ type: 'FETCH_APPT', payload: clientInfo.id }); 
    }, []);

    //PUT route to update client information
    const updateClientInfo = () => { 
        
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
        
        //send updated client info to editClient saga, then to server/DB
        dispatch({ type: 'UPDATE_CLIENT_INFO', payload: updatedClientInfo });
        
        //swal success indicator
        swal({
            text: "Your client's information has been updated!",
            icon: "success"
        });

        //editMode off
        setupdateClicked(false);
        console.log('update', updateClicked);

    }

    const renderToInputs = () => {
        setupdateClicked(true);
        console.log('update', updateClicked);

        //set local state with client info from the clientInfo reducer
        setFullName(clientInfo.full_name);
        setAddress(clientInfo.address);
        setCity(clientInfo.city);
        setState(clientInfo.state);
        setZipCode(clientInfo.zip_code);
        setPhone(clientInfo.phone);
        setEmail(clientInfo.email);

    }

    const renderToInfo = () => {
        setupdateClicked(false);
    }

    //routes to add new appt page with client's id
    const routeToAddAppt = (id) => {
        console.log("routing to add appt with id:", id);
        history.push('/AddAppt');
    }

    //temporary functionality to access ApptDetails page
    const apptDetails = () => {
        console.log('appt details clicked!', );
        history.push('/ApptDetails');
    }

    //clicking back btn routes back to Client Table (/user)
    const goBack = () => {
        history.push('/user');
    }//end goBack

    return(
        <div className="card-whole">
            {updateClicked ? 
            <div className="input-form"> 
            {/* className="card-half-left-inputs" */}
                <input type="text"
                value={full_name}
                onChange={(event) => setFullName(event.target.value)}
                />
                <input type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                />
                <input type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                />
                <input type="text"
                value={state}
                onChange={(event) => setState(event.target.value)}
                />
                <input type="text"
                value={zip_code}
                onChange={(event) => setZipCode(event.target.value)}
                />
                <input type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                />
                <input type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <button className="a2o-btn" onClick={updateClientInfo}>Update</button>
                <button className="a2o-btn" onClick={renderToInfo}>Cancel</button>
            </div> 
            :
            <div className="card-half-left"> 
                <h2>{clientInfo.full_name}</h2>
                <p>{clientInfo.address}</p>
                <p>{clientInfo.city}, {clientInfo.state}, {clientInfo.zip_code}</p>
                <p>{clientInfo.phone}</p>
                <p>{clientInfo.email}</p>

                {/* onClick renders to editable input feilds for client info and submit button */}
                <button className="a2o-btn" onClick={renderToInputs}>Update Client Info</button>
                <button className="a2o-btn" onClick={() => routeToAddAppt(clientInfo.id)}>Add Consultation</button>
                <button className="a2o-btn" onClick={goBack}>Back to Table</button>
            </div>}
            
            {/* specific client's appointment history list */}
            <div className="card-half-right">
                {JSON.stringify(appt)}
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