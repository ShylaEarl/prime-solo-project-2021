import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory } from 'react-router-dom';

function ApptDetails(){ //props? to get a specific client's specific appt details?

    //NEEDED DATA: 
        //Client name (and id? as params? props?)
        //using client id/appt id through params? props? get specific 
        //appt_name, date, primary_concern, notes, summary, AND map remedies. 

    //TODO - Make details reducer/saga to get specific appointment details
    // OR use info in appt reducer - but need to get appt info into appt reducer...
    // Make REMEDIES reducer/sage
    //const store = useSelector((store) => store);

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //to get info from reducers
    useEffect(() => {
        dispatch({ type: 'FETCH_CLIENT' }); //payload as client id? to get specific client info?
        //dispatch({ type: 'FETCH_APPT', payload: ${appt.id} }); //how do I get the info for a specific appt? 
        //dispatch({ type: 'FETCH_REMEDIES', payload: ${appt.id} }); //how do I get the remedies for a specific appt?
    }, []);

    //functionality to route to a page
    const history = useHistory();

    //clicking back button routes to client profile
    const goBack = () => {
        history.push('/Profile');
    }//end goBack

    return(
        <div className="card-whole">
            <h2>Willow Rosa Lee</h2>
            <h2>12/12/20</h2>
            <h2>Winter Wellness</h2>
            <h4>Primary Concern:</h4>
            <p>Boost immunity through the cold months and covid.</p> 
            <h4>Summary:</h4> 
            <p>Warming food and tea as medicine... herbal remedies...</p>
            <h4>Suggested Remedies:</h4>
            <p>Ashwaganda, Calendula, Elderflower...</p>
            <button className="a2o-btn" onClick={goBack}>Back to {} Profile</button>
        </div>
    );
}

export default ApptDetails;