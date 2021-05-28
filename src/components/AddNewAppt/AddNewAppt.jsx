import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // useDispatch,
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddNewAppt(){

    //functionality to route to a page
    const history = useHistory();

    //instance of client redux store for name? or props?
    //const client = useSelector((store) => store.client);

    //sets local state for post request
    const [appt_name, setApptName] = useState('');
    const [date, setDate] = useState('');
    const [primary_concern, setPrimaryConcern] = useState('');

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
            axios.post('/api/info', 
            {
                appt_name: appt_name,
                date: date,
                primary_concern: primary_concern,
                id: 7,
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
                {/* {JSON.stringify(client)} */}
                <p>Willow Rosa Lee (redux - table row id)</p>
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