import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

function ApptDetails(){

    let {id} = useParams();
    console.log('appt id:', id);

    //TODO - 
    // Make REMEDIES reducer/saga to fetch remedies from db
    //create remedies store instance

    //clientInfo store instance 
    const clientInfo = useSelector((store) => store.clientInfo);
    console.log('in appt details. clientInfo reducer:', clientInfo.id);

    //apptInfo store instance 
    const apptInfo = useSelector((store) => store.apptInfo);
    console.log(apptInfo.id);

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //to get info from reducers
    useEffect(() => {
        //on page load, retrieve this appt's details from server/DB
        dispatch({ type: 'FETCH_APPT_INFO', payload: apptInfo.id  }); // apptInfo.id change to id for params
        
        //on page load, retrieve this appt's remedies from server/DB table remedies (appointment_id will match apptInfo.id)
        //dispatch({ type: 'FETCH_REMEDIES', payload: ${apptInfo.id} }); //how do I get the remedies for a specific appt?
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
            <br />
            <h2>{moment(apptInfo.date).format('L')}</h2>
            <h2>{apptInfo.appt_name}</h2>
            <h4>Primary Concern:</h4>
            {apptInfo.primary_concern}
            <h4>Summary:</h4>
            {apptInfo.summary}
            <h4>Suggested Remedies:</h4>
            {/* <ul>
                {remedies.map((item, i) => 
                    <li key={i}>
                        {remedies.name} {remedies.dose} {remedies.frequency}
                    </li>
                )}
            </ul> */}
            {/* {remedies.map() but will need appt id to call back remedies associated with specific appt} */}
            <button className="a2o-btn" onClick={goBack}>Back to {clientInfo.full_name}'s Profile</button>
        </div>
    );
}

export default ApptDetails;