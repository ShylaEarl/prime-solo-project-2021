import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Profile(props){ //props here to get specific client id? params? redux?

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
    
    //appointment store instance currently holds all appt info and client info
    const appt = useSelector((store) => store.appt);

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();
  
    //axios get (or useEffect dispatch to saga) to retrieve clients from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_CLIENT' }); 
        dispatch({ type: 'FETCH_APPT' }); 
    }, []);

    let updateClicked = false;

    //PUT route to update client information
    const updateClientInfo = () => { //event, client
        
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

        updateClicked = false;
        console.log('update', updateClicked);

    }

    const renderToInputs = () => {
        updateClicked = true;
        console.log('update', updateClicked);
    }

    //temporary functionality to access ApptDetails page
    const apptDetails = () => {
        console.log('appt details clicked!', );
        history.push('/ApptDetails');
    }

    return(
        <div className="card-whole">
              {/* if(updateClicked == false show client info on 'card-half-left') 
                from edan's wk3 challenge feedback... */}
            {/* <div className={updateClicked ? "card-half-left-inputs" : "card-half-left"}> */}
            {updateClicked ? 
            <div className="card-half-left-inputs"> 
                <input type="text"
                placeholder={client.full_name}
                value={full_name}
                onChange={(event) => setFullName(event.target.value)}
                />
                <input type="text"
                placeholder={client.address}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                />
                <input type="text"
                placeholder={client.city}
                value={city}
                onChange={(event) => setCity(event.target.value)}
                />
                <input type="text"
                placeholder={client.state}
                value={state}
                onChange={(event) => setState(event.target.value)}
                />
                <input type="text"
                placeholder={client.zip_code}
                value={zip_code}
                onChange={(event) => setZipCode(event.target.value)}
                />
                <input type="text"
                placeholder={client.phone}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                />
                <input type="text"
                placeholder={client.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <button className="a2o-btn" onClick={updateClientInfo}>Submit</button>
            </div> 
            :
            <div className="card-half-left"> 
                {/* how do I render the specific client's info? props? redux?*/}
                <h2>Willow Rosa Lee </h2>
                {/* <p>{props.client.full_name}</p> */}
                <p>234 Garden St.</p>
                {/* <p>{props.client.address}</p> */}
                <p>City, </p>
                {/* <p>{props.client.city} </p> */}
                <p>State, </p>
                {/* <p>{props.client.state} </p> */}
                <p>Zip </p>
                {/* <p>{props.client.zip_code}</p> */}
                <p>808-345-6789</p>
                {/* <p>{props.client.phone}</p> */}
                <p>plantLove@gmail.com</p>
                {/* <p>{props.client.email}</p> */}

                {/* onClick renders to editable input feilds for client info and submit button, on click of submit renders back to updated info view */}
                <button className="a2o-btn" onClick={renderToInputs}>Update Info</button>
            </div>}
            {/* this div closes the conditional rendering div */}
            {/* </div>   */}
            
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