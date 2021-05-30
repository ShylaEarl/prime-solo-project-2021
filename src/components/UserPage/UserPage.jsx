import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css'

function UserPage() {

  //functionality to route to a page
  const history = useHistory();

  //whole store
  const store = useSelector((store) => store);
  
  //client store instance 
  const client = useSelector((store) => store.client);
  
  //appointment store instance currently holds all appt info and client info
  const appt = useSelector((store) => store.appt);

  //functionality to dispatch information to a saga or reducer
  const dispatch = useDispatch();
  
  //axios get (or useEffect dispatch to saga) to retrieve clients from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENT' }); 
    dispatch({ type: 'FETCH_APPT' }); 
  }, []);

  //addConsult function
  const addConsult = (id) => {
    //need to add id param here from table row and send to AppAppt page w/ name too.
    console.log('add clicked! id =', id);
    history.push('/AddAppt');
  }

  //permanently deletes client from DB (Should this be moved to a saga?)
  const deleteClient = (id) => {
    console.log('deleting client', id);
    //axios delete call to server on '/info' route
    axios.delete(`/api/info/${id}`)
    .then((response) => {
      console.log('delete request', response);
      //get call replaced by useEffect
      dispatch({ type: 'FETCH_CLIENT' }); 
    })
    .catch((error) => {
      console.log('error in DELETE', error);
    });
  }

  //alerts user to verify deletion of client
  const deleteValidation = (id) => {
    console.log('delete click! id =', id);
    swal({
        title: "Hello!",
        text: "Are you sure you want to permanently delete this client?",
        buttons: {
          cancel: true,
          confirm: "Delete"
        }
    }).then(val => {
      if(val) {
        swal({
          text: "You've deleted your client.",
        });
        deleteClient(id);
      }
    });
  }

  //on click, capture client id, send specific client info to client info reducer and route to profile page
  const routeToEdit = (event, item) => {
    console.log('edit clicked! client =', item);
    dispatch({ type: 'SET_CLIENT_INFO', payload: item })
    history.push('/Profile');
  }
  
  return (
    <div className="card-whole">
      <h2>Acorn to Oak Clients</h2>
      {/* {JSON.stringify(appt)}  */}
      {/* should be appt rather than client when working */}
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            {/* <th>Last Consult Name</th>
            <th>Date</th> */}
            <th>Add Consult</th>
            <th>Edit Info</th>
            <th>Delete Client</th>
          </tr>
        </thead>
        {/* should be appt.map when all is working */}
        <tbody>
          {client.map((item, i) => 
            // does there need to be a return here?
            <tr key={i}>
              <td>{item.full_name}</td>
              {/* <td>{item.appt_name}</td>
              <td>{item.date.slice(0, 10)}</td> */}
              <td><button className="tbl-btn" onClick={() => addConsult(item.id)}>Add Consult</button></td>
              <td><button className="tbl-btn" onClick={(event) => routeToEdit(event, item)}>Edit Info</button></td>
              <td><button className="tbl-btn" onClick={() => deleteValidation(item.id)}>Delete Client</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;


// //store instance of registered user
// const user = useSelector((store) => store.user);
// <h2>Welcome, {user.username}!</h2>
// <p>Your ID is: {user.id}</p>
// these use takeLatest in sagas to get most recent rather than all.
