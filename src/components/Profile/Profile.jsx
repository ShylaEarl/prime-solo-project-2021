import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
//import axios from 'axios';

function Profile(){ 

    const element = <FontAwesomeIcon icon={faStar} /> 

    let {id} = useParams();
    console.log(id);

    //local state for updating client info input conditional rendering
    const [updateClicked, setupdateClicked] = useState(false);

    //local state for conditional rendering by date for appts
    const [currentDate, setCurrentDate] = useState(new Date());

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

    //appt store holds all appt info for a specific client via params? id
    const appt = useSelector((store) => store.appt);
    console.log(appt);

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();
  
    //on page load, retrieve this client's appts from server/DB
    useEffect(() => {
        dispatch({ type: 'FETCH_APPT', payload: id  }); // clientInfo.id change to id for params
        dispatch({ type: 'FETCH_CLIENT', payload: id});
    }, []);

    //PUT route to update client information
    const updateClientInfo = () => { 
        
        const updatedClientInfo = {
            id: clientInfo.id, // clientInfo.id change to id to use params
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
        history.push(`/AddAppt/${id}`);
    }

    //PAST on click, capture appt id, send specific appt info to appt info reducer and route to appt details page
    const routeToApptDetails = (event, item) => {
        console.log('appt details clicked!', item); //specific appt's id and information
        dispatch({ type: 'SET_APPT_INFO', payload: item }); 
        history.push(`/ApptDetails/${item.id}`); 
    }

    //PRESENT
    const routeToApptNotes = (event, item) => {
        dispatch({ type: 'SET_APPT_INFO', payload: item });
        history.push(`/ApptNotes/${item.id}`); //specific appt's id to add notes to
    }

    //FUTURE
    const apptEdit = (id) => {
        history.push(`/EditAppt/${id}`); //TODO - create this component and add route to App.jsx
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
                <h2>Appointment History</h2>
                <ul>
                    {appt.map((item, i) => {
                        if(moment(currentDate).format('L') == moment(item.date).format('L')){ //today's date
                            return <li key={i} className="li_asLink" 
                            onClick={(event) => routeToApptNotes(event, item)}>
                            &#9651; {moment(item.date).format('L')} {item.appt_name}</li>
                        } else { //past appointment
                            return <li key={i} className="li_asLink" 
                            onClick={(event) => routeToApptDetails(event, item)}>
                            &#9651; {moment(item.date).format('L')} {item.appt_name}</li>
                        } //add future appt condition here
                    })}
                </ul>
                {/* if(currentDate == item.date) Present day route to notes
                else if(currentDate > item.date) appt has happened route to details
                else (currentDate < item.date) appt in the future route to edit appt details page to change date or delete appointment */}
            </div>
        </div>
    );
}

export default Profile;
