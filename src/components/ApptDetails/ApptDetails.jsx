import React from 'react';
import { useSelector } from 'react-redux'; //useDispatch,
import { useHistory } from 'react-router-dom';

function ApptDetails(){

    //functionality to route to a page
    const history = useHistory();

    //instance of client, appointment, and remedies redux stores 
    //const client = useSelector((store) => store.client);

    //clicking back button routes to client profile
    const goBack = () => {
        history.push('/Profile');
    }//end goBack

    return(
        <div>
            <p>Willow Rosa Lee (redux)</p>
            <p>Winter Wellness</p>
            <p>12/12/20</p>
            <h3>Primary Concern: Boost immunity through the cold months and covid.</h3>
            <h3>Summary: Warming food and tea as medicine... herbal remedies...</h3>
            <h3>Suggested Remedies: Ashwaganda, Calendula, Elderflower...</h3>
            <button onClick={goBack}>Back to Profile</button>
        </div>
    );
}

export default ApptDetails;