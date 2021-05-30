import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch,
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddNewAppt(){

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //instance of client redux store for name (currently also has appt info)
    const client = useSelector((store) => store.client);

    //axios get (or useEffect dispatch to saga) to retrieve clients from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_CLIENT' }); 
        //dispatch({ type: 'FETCH_APPT' }); 
    }, []);

    //sets local state for post request
    const [appt_name, setApptName] = useState('');
    const [date, setDate] = useState('');
    const [primary_concern, setPrimaryConcern] = useState('');
    const [notes, setNotes] = useState('');
    const [summary, setSummary] = useState('');

    //POST route to submit new appointment information
    const addNewAppt = () => {
        if( appt_name == '' || date == '' || primary_concern == ''){
            swal({
              text: 'Please fill all fields!',
              buttons: {
                ok: true,
              }
            })
        } else {
            axios.post(`/api/info/AddAppt`, ///${id} do I use id here instead of adding it to the object? 
            {
                appt_name: appt_name,
                date: date,
                primary_concern: primary_concern,
                client_id: client.id,
            }
            ).then((response) => {
                console.log('back from new appt POST', response.data);
                //swal success indicator
                swal({
                  text: "The new appointment has been submitted!",
                  icon: "success"
                });
                //clear input fields
                setApptName('');
                setDate('');
                setPrimaryConcern('');
                //route to 
                history.push('/Profile');
            }).catch((error) => {
                console.log('error in new appointment POST', error);
            });
        }
    }//end addNewAppt

    //clicking cancel btn routes back to Client Table (/user)
    const goBack = () => {
        history.push('/user');
    }//end goBack

    return(
        <div>
            <form id="appt-form" onSubmit={addNewAppt}>
                <h3>Adding New Appointment For:</h3>
                {JSON.stringify(client)}
                <p>Willow Rosa Lee (redux - table row id)</p>
                {/* do I need to map here to get name to render? How do I just get one to show up? */}
                <p>{client.full_name}</p>
                <input type="text"
                    placeholder="Appointment Name" 
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
                <input type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                />
                <input type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
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