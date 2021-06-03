import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
//import axios from 'axios';

function Profile(){ 

    let {id} = useParams();
    console.log(id);

    //local state for updating client info input conditional rendering
    const [updateClicked, setupdateClicked] = useState(false);

    //local state for conditional rendering by date for appts
    const [currentDate, setCurrentDate] = useState(new Date());
    console.log('current date as state:', currentDate);
    console.log(currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getYear());
    console.log('current date w/ moment:', moment(currentDate).format('L'));
    <p>{currentDate.getMonth() + 1}/{currentDate.getDate()}</p>

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
        dispatch({ type: 'FETCH_APPT', payload: clientInfo.id  }); // clientInfo.id change to id for params
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

        //can I dispatch here to get client's updated data?
        // dispatch({ type: 'FETCH_UPDATED_CLIENT_INFO', payload: clientInfo.id });

        //editMode off
        setupdateClicked(false);
        console.log('update', updateClicked);

    }

    const renderToInputs = () => {
        setupdateClicked(true);
        console.log('update', updateClicked);

        //set local state with client info from the clientInfo reducer
        //change to id to use params instead of reducer?
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
        dispatch({ type: 'SET_APPT_INFO', payload: item }); //currently attempting to use temp apptInfo reduce. Eventually use params get that specific appts details from DB/server
        history.push(`/ApptDetails/${item.id}`); //this id is the appointment's id being passed in from the row/item.id appt reducer. How do you switch it to be params?
    }

    //on click, capture client id, send specific client info to client info reducer and route to add appt page
    // const routeToAddConsult = (event, item) => {
    //     console.log('add clicked! client =', item);
    //     dispatch({ type: 'SET_CLIENT_INFO', payload: item})
    //     history.push(`/AddAppt/${item.id}`); //${item.id}
    // }

    //PRESENT
    const routeToApptNotes = (event, item) => {
        dispatch({ type: 'SET_APPT_INFO', payload: item }); //currently attempting to use temp apptInfo reduce. Eventually use params get that specific appts details from DB/server
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
            {/* change these to id rather than clientInfo to use params?  */}
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
                {/* {JSON.stringify(appt)} */}
                <h3>Appointment History</h3>
                {/* font awesome leaf icon for li - still need to install */}
                {/* <i class="fab fa-pagelines"></i> */}
                <ul>
                    {appt.map((item, i) => {
                        if(moment(currentDate).format('L') == moment(item.date).format('L')){ //today's date
                            return <li key={i} className="li_asLink" 
                            onClick={(event) => routeToApptNotes(event, item)}>
                            {moment(item.date).format('L')} {item.appt_name}</li>
                        } else { //past appointment
                            return <li key={i} className="li_asLink" 
                            onClick={(event) => routeToApptDetails(event, item)}>
                            {moment(item.date).format('L')} {item.appt_name}</li>
                        }
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

{/* <ul>
    {appt.map((item, i) => 
        //if (currentDate == item.date) (today's appoitnment) show <li key={i} className="li_asLink" onClick={() => apptNotes(item.id)}>{moment(item.date).format('L')} {item.appt_name}</li>
        //else if (currentDate > item.date) (appt already happened) show this <li key={i} className="li_asLink" onClick={() => routeToApptDetails(item.id)}>{moment(item.date).format('L')} {item.appt_name}</li>
        //else (currentdate < item.date) (appt is in future) show this <li key={i} className="li_asLink" onClick={() => apptEdit(item.id)}>{moment(item.date).format('L')} {item.appt_name}</li>
        <li key={i} className="li_asLink"
            onClick={(event) => routeToApptNotes(event, item)}
        >
        {moment(item.date).format('L')} {item.appt_name}
        </li>
    )}
</ul> */}
