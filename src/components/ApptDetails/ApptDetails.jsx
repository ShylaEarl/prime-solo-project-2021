import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

function ApptDetails(){

    let {id} = useParams();
    console.log('appt id:', id);

    //remedies store instance
    const remedies = useSelector((store) => store.remedies);

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
        //on page load, retrieve this appt's remedies from server/DB (appointment_id will match apptInfo.id)
        dispatch({ type: 'FETCH_REMEDIES', payload: apptInfo.id }); 
    }, []);

    //functionality to route to a page
    const history = useHistory();

    //clicking back button routes to client profile
    const goBack = () => {
        history.push(`/Profile/${clientInfo.id}`);
    }//end goBack

    return(
        <div className="card-whole">
            <h2>{clientInfo.full_name}</h2>
            <br />
            <h3>{moment(apptInfo.date).format('L')} {apptInfo.appt_name}</h3>
            <h4>Primary Concern:</h4>
            <p>{apptInfo.primary_concern}</p>
            <h4>Summary:</h4>
            <p>{apptInfo.summary}</p>
            <h4>Suggested Remedies:</h4>
            <ul>
                {remedies.map((item, i) => 
                    <li key={i}>
                        {item.name} {item.dose} {item.frequency}
                    </li>
                )}
            </ul>
            <br />
            <button className="a2o-btn" onClick={goBack}>Back to {clientInfo.full_name}'s Profile</button>
        </div>
    );
}

export default ApptDetails;