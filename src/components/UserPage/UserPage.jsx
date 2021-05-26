import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import axios from 'axios';
import './UserPage.css'

function UserPage() {

  //SHOULD I RETURN THE WHOLE STORE TO STREAMLINE MAPPING? OR JUST THE INSTANCES?

  //client store instance 
  const client = useSelector((store) => store.client);
  
  //appointment store instance (make appointment saga and reducer!)
  const appt = useSelector((store) => store.appt);

  //functionality to dispatch information to a saga or reducer
  const dispatch = useDispatch();
  
  //axios get (or useEffect dispatch to saga) to retrieve clients from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENT' }); //do I need payload here?
    //dispatch({ type: 'FETCH_APPT' }); //do I need payload here?
  }, []);

  //addConsult function
  const addConsult = () => {
    //routes to add new appointment page ('/' not created yet)
  }

  //editInfo function
  const editInfo = () => {
    //routes to client profile page ('/' not created yet)
  }

  //deleteClient function
  const deleteClient = () => {
    //axios delete call to server on '/user' route?
  }
  
  return (
    <div >
      <h3>A2O Client Base</h3>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Last Consult Name</th>
            <th>Last Consult Date</th>
            <th>Add Consult</th>
            <th>Edit Info</th>
            <th>Delete Client</th>
          </tr>
        </thead>
        <tbody>
          {client.map((item, i) => 
            // does there need to be a return here?
            <tr key={i}>
              <td>{item.full_name}</td>
              <td>{appt.appt_name}</td>
              <td>{appt.date}</td>
              <td><button onClick={addConsult}>Add Consult</button></td>
              <td><button onClick={editInfo}>Edit Info</button></td>
              <td><button onClick={deleteClient}>Delete Client</button></td>
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
