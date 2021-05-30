import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Profile(props){ //props here to get specific client id? params? redux?

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

    //PUT route to update client information
    const updateClientInfo = (event, client) => {
        console.log('update', client);
        //axios delete call to server on '/info' route
        axios.put(`/api/info/${id}`)
        .then((response) => {
        console.log('put request', response);
        //get call replaced by useEffect
        //dispatch({ type: 'FETCH_CLIENT' }); 
        })
        .catch((error) => {
        console.log('error in UPDATE', error);
        });
    }

    const renderUpdateInputs = () => {

    }

    //temporary functionality to access ApptDetails page
    const apptDetails = () => {
        console.log('date appt name p tag clicked!');
        history.push('/ApptDetails');
    }

    return(
        <div className="card-whole">
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
                <button className="a2o-btn" onClick={renderUpdateInputs}>Update Info</button>
            </div>

            <div className="card-half-right">
                <h3>Appointment History</h3>
                <ul>
                {/* font awesome leaf icon for li - still need to install */}
                <i class="fab fa-pagelines"></i>
                <li className="li_asLink" onClick={apptDetails}>12/12/20 Winter Wellness</li>
                </ul>
                
                {/* map through appt reducer to return all appts specific to this client */}
                {appt.map((item, i) => {
                    return(
                    <ul key={i}>
                        {/* <li onClick={() => apptDetails(item.id)}>{item.date}{item.appt_name}</li> */}
                    </ul>)
                })}
                {/* Appointment details also conditionally render depending on date */}
            </div>
        
        </div>
    );
}

export default Profile;