import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
//import axios from 'axios';
import moment from 'moment';

function ApptNotes(){

    let {id} = useParams();
    console.log('use params appt id:', id);

    //clientInfo store instance 
    const clientInfo = useSelector((store) => store.clientInfo);
    console.log('clientInfo reducer specific client id:', clientInfo.id);

    //apptInfo store instance
    const apptInfo = useSelector((store) => store.apptInfo);
    console.log('apptInfo reducer specific appt id:', apptInfo.id);

    const dispatch = useDispatch();

    //functionality to route to a page
    const history = useHistory();

    //sets local state for PUT request (need to remove remedies here, or add remedies column to appt table)
    const [notes, setNotes] = useState('');
    const [summary, setSummary] = useState('');
    const [remedies, setRemedies] = useState(''); //this is similar to generes from movie assignment

    //set state for remedy column names & POST request to remedy table
    const [name, setName] = useState('');
    const [dose, setDose] = useState('');
    const [frequency, setFrequency] = useState('');

    //axios POST/PUT? route (or dispatch to saga...) for appt notes/summary and remedies
    const addNotes = () => { 
        console.log('clicked in addNotes!');
        
        //input validation and alert
        if(notes == '' || summary == '' || remedies == '' || name == '' || dose == '' || frequency == ''){
            swal({
                text: 'Please fill all fields!',
                buttons: {
                  ok: true,
                }
            })
        }

        //create const notes = {object} here to send via PUT
        const apptNotes = {
            notes: notes,
            summary: summary,
            id: apptInfo.id,
        }

        //create const remedies = {object} here to send via POST
        const apptRemedies = {
            name: name,
            dose: dose,
            frequency: frequency,
            appointment_id: apptInfo.id,
        }

        //dispatch({ type: payload: }) to saga/s. Is this possible?
        //still need to make remedy reducer/saga and figure out these actions
        dispatch({ type: update_appt_info, payload: apptNotes});
        dispatch({ type: set_remedies, payload: apptRemedies});

        //OR axios PUT & POST routes here? Is that possible?
        
        //swal notification of successful post
        swal({
            text: "Your notes have been saved!",
            icon: "success"
        });

        //route to Appt Details page
        history.push(`/ApptDetails/${id}`); //double check if this is id or apptInfo.id
    
    }//end AddNotes

    //clicking cancel button routes back to Client Profile
    const goBack = () => {
        history.push(`/Profile/${clientInfo.id}`);
    }//end goBack

    return(
        <div className="card-whole">
            <div className="input-form">
                <h3>Appointment Notes</h3> 
                <h2>{clientInfo.full_name}</h2>
                <p>{moment(apptInfo.date).format('L')} {apptInfo.appt_name}</p>
                <textarea type="text"
                    placeholder="Notes" 
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows="4"
                    cols="50"
                />
                <br />
                <textarea type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)} 
                    rows="4"
                    cols="50"
                />
                <br />
                <textarea type="text"
                    placeholder="Remedies" 
                    value={remedies}
                    onChange={(event) => setRemedies(event.target.value)}
                    rows="4"
                    cols="50"
                />
                <br />
                <br />
                <button className="a2o-btn" onClick={addNotes}>Submit</button>
                {/* <button>Update</button> this is for a stretch goal.*/}
                <button className="a2o-btn" onClick={goBack}>Cancel</button>
            </div>
        </div>
    );
}

export default ApptNotes;