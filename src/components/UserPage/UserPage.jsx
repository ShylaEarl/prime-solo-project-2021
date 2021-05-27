import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import './UserPage.css'

function UserPage() {
  
  //client store instance 
  //const client = useSelector((store) => store.client);
  
  //appointment store instance currently holds all appt info and client info
  const appt = useSelector((store) => store.appt);

  //functionality to dispatch information to a saga or reducer
  const dispatch = useDispatch();
  
  //axios get (or useEffect dispatch to saga) to retrieve clients from DB
  useEffect(() => {
    //dispatch({ type: 'FETCH_CLIENT' }); 
    dispatch({ type: 'FETCH_APPT' }); 
  }, []);

  //addConsult function
  const addConsult = () => {
    console.log('add clicked!');
    //routes to add new appointment page ('/' not created yet)
  }

  //editInfo function
  const editInfo = () => {
    console.log('edit clicked!');
    //routes to client profile page ('/' not created yet)
  }

  //permanently deletes client from DB (Should this be moved to a saga?)
  const deleteClient = (id) => {
    console.log('deleting client', id);
    //axios delete call to server on '/info' route
    axios.delete(`/api/info/${id}`)
    .then((response) => {
      console.log('delete request', response);
      //get call replaced by useEffect
      dispatch({ type: 'FETCH_APPT' }); 
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
  
  return (
    <div >
      <h3>A2O Client Base</h3>
      {/* {JSON.stringify(appt)} */}
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Last Consult Name</th>
            <th>Date</th>
            <th>Add Consult</th>
            <th>Edit Info</th>
            <th>Delete Client</th>
          </tr>
        </thead>
        <tbody>
          {appt.map((item, i) => 
            // does there need to be a return here?
            <tr key={i}>
              <td>{item.full_name}</td>
              <td>{item.appt_name}</td>
              <td>{item.date.slice(0, 10)}</td>
              <td><button onClick={addConsult}>Add Consult</button></td>
              <td><button onClick={editInfo}>Edit Info</button></td>
              <td><button onClick={() => deleteValidation(item.id)}>Delete Client</button></td>
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
