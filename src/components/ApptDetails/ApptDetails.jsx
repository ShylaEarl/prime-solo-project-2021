import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';

function ApptDetails(){

    let {id} = useParams();
    console.log('appt id:', id);

    //NEEDED DATA: 
        //Client's name (useEffect call with appt.client_id as payload?)
        //using appt id through params get specific appt_name, date, 
        //primary_concern, (notes, summary, AND map remedies.) 

    //TODO - create useEffect call to get client name
    // Make apptInfo/details reducer/saga to get specific appointment details
    // OR use info in appt reducer (I don't know how to access it once I navigate to this page appt reducer logs as an empty array)
    // Make REMEDIES reducer/saga
    //create stores for client (or clientInfo?), appt, and remedies

    //appt store holds all appt info for a specific client via params id
    const appt = useSelector((store) => store.appt);
    console.log('in appt details. appt reducer:', appt); //currently logging empty array...

    const client = useSelector((store) => store.client);
    console.log('in appt details. client reducer:', client); //currently logging all clients

    //clientInfo store instance 
    const clientInfo = useSelector((store) => store.clientInfo);
    console.log('in appt details. clientInfo reducer:', clientInfo.id);

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //to get info from reducers
    useEffect(() => {
        dispatch({ type: 'FETCH_APPT', payload: id }); //params id? how do I get the info for a specific appt? 
        //should this call clientInfo reducer instead? Will the data stay, even after refresh?
        dispatch({ type: 'FETCH_CLIENT', payload: appt.client_id }); //payload as appt.client_id? to get specific client's name?
        
        //dispatch({ type: 'FETCH_REMEDIES', payload: ${appt.id} }); //how do I get the remedies for a specific appt?
    }, []);

    //functionality to route to a page
    const history = useHistory();

    //clicking back button routes to client profile
    const goBack = () => {
        history.push(`/Profile/${clientInfo.id}`); //how to do this since param is now appt id rather than client id...
    }//end goBack

    return(
        <div className="card-whole">
            <h2>{clientInfo.full_name}</h2>
            {/* <h2>{appt.date.slice(0,10)}</h2> */}
            <h2>{appt.appt_name}</h2>
            <h4>Primary Concern:</h4>
            {appt.primary_concern}
            <h4>Summary:</h4> 
            {/* {appt.summary} */}
            <h4>Suggested Remedies:</h4>
            <p>Ashwaganda, Calendula, Elderflower...</p>
            <button className="a2o-btn" onClick={goBack}>Back to {clientInfo.full_name}'s Profile</button>
        </div>
    );
}

export default ApptDetails;