import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // useDispatch,
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function ApptNotes(){

    //functionality to route to a page
    const history = useHistory();

    //instance of client and appointment stores
    //const client = useSelector((store) => store.client);

    //sets local state for post request
    const [notes, setNotes] = useState('');
    const [summary, setSummary] = useState('');
    const [remedies, setRemedies] = useState(''); //this is similar to generes from movie assignment

    //axios POST/PUT? route (or dispatch to saga...) for appt notes object
    const addNotes = () => {
        console.log('clicked in addNotes!');
        //input validation?
        //axios post (this might actually be a PUT route to the DB, even though nothing is getting changed, we are updating the existing row)
        //swal notification of successful post
        //route to Appt Details page
        history.push('/ApptDetails');
    }//end AddNotes

    //clicking cancel button routes back to Client Profile
    const goBack = () => {
        history.push('/Profile');
    }//end goBack

    return(
        <div>
            <h3>Appointment Notes</h3> 
            <p>Willow Rosa Lee (redux)</p>
            <p>Winter Wellness (redux)</p>
            <p>12/12/20 (redux)</p>
            <textarea type="text"
                placeholder="Notes" 
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
            />
            <br />
            <textarea type="text"
                placeholder="Summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)} 
            />
            <br />
            <textarea type="text"
                placeholder="Remedies" 
                value={remedies}
                onChange={(event) => setRemedies(event.target.value)}
            />
            <br />
            <button onClick={goBack}>Cancel</button>
            <br />
            {/* <button>Update</button> this is for a stretch goal*/}
            <br />
            <button onClick={addNotes}>Submit</button>
        </div>
    );
}

export default ApptNotes;