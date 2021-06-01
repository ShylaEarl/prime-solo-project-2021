import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch,
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddNewAppt(){

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //specific client's info store instance 
    const clientInfo = useSelector((store) => store.clientInfo);

    //axios get (or useEffect dispatch to saga) to retrieve clients from DB
    // useEffect(() => {
    //     dispatch({ type: 'FETCH_CLIENT' }); 
    //     dispatch({ type: 'FETCH_APPT' }); 
    // }, []);

    //sets local state for post request
    const [appt_name, setApptName] = useState('');
    const [date, setDate] = useState('');
    const [primary_concern, setPrimaryConcern] = useState('');

    //POST route to submit new appointment information TODO - move to saga
    const addNewAppt = () => {
        if( appt_name == '' || date == '' || primary_concern == ''){
            swal({
              text: 'Please fill all fields!',
              buttons: {
                ok: true,
              }
            })
        } else {
            axios.post(`/api/info/AddAppt/${clientInfo.id}`, 
            {
                appt_name: appt_name,
                date: date,
                primary_concern: primary_concern,
                client_id: clientInfo.id,
            }
            ).then((response) => {
                console.log('back from new appt POST', response.data);
                //swal success indicator
                swal({
                  text: "Your appointment has been created!",
                  icon: "success"
                });
                //route to 
                history.push('/Profile'); //add id param to stay on specific client's page
            }).catch((error) => {
                console.log('error in new appointment POST', error);
            });
        }
    }//end addNewAppt

    //clicking cancel btn routes back to Client Table (/user)
    const goBack = () => {
        history.push('/Profile');
    }//end goBack

    return(
        <div className="card-whole">
            <form className="input-form" onSubmit={addNewAppt}>
                {/* {JSON.stringify(clientInfo)} */}
                <h3>Adding New Consultation For:</h3>
                <h2>{clientInfo.full_name}</h2>
                <br />
                <input type="text"
                    placeholder="Consultation Name" 
                    value={appt_name}
                    onChange={(event) => setApptName(event.target.value)}
                />
                <br />
                <input type="date"
                    placeholder="Appointment Date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
                <br />
                <input type="text"
                    placeholder="Primary Concern"
                    value={primary_concern}
                    onChange={(event) => setPrimaryConcern(event.target.value)}
                />
                <br />
                <input className="a2o-btn" type="submit" name="submit" value="Submit" />
                <br />
                <p>Clicking submit routes to Client Profile page</p>
                <br />
                <button className="a2o-btn" onClick={goBack}>Cancel</button>
            </form>
        </div>
    );
}

export default AddNewAppt;

// const [notes, setNotes] = useState('');
// const [summary, setSummary] = useState('');

{/* <input type="text"
    placeholder="Notes"
    value={notes}
    onChange={(event) => setNotes(event.target.value)}
/>
<input type="text"
    placeholder="Summary"
    value={summary}
    onChange={(event) => setSummary(event.target.value)}
/> */}