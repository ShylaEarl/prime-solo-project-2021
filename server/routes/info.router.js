const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//MVP GET route to get all clients from DB/server to client reducer/client table
router.get('/', (req, res) => {

  //returns all appt info to reducer
  const query = `SELECT * FROM "client";`;
  pool.query(query)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('Error client GET', error);
    res.sendStatus(500)
  })

});

// `SELECT * FROM "appointment"
//     JOIN "client" ON client.id=appointment.client_id;`

//get all clients (and appointments?) from the DB (for client table)
// router.get('/', (req, res) => {

//   const clientQuery = `SELECT * FROM "client";`;
//   pool.query(clientQuery)
//   .then(result => {
//     res.send(result.rows);
//     //add second query for appt info based on client id? or JOINs? here
//     const apptQuery = `SELECT * FROM "appointment";`; //WHERE client_id = $1
//     pool.query(apptQuery)
//     .then(result => {
//       res.send(result.rows);
//     }).catch(error => {
//       console.log('in GET', error);
//       res.sendStatus(500)
//     }) 
    
//   }) //catch for first query
//   .catch(error => {
//     console.log('Error client GET', error);
//     res.sendStatus(500)
//   })

// });

//MVP POST route to add new client to DB/server  
router.post('/', rejectUnauthenticated, (req, res) => {

  const user_id = req.user.id;
  //serverside validation here
  //if(!req.body.full_name){
  //   res.sendStatus(400);
  // }
  const query  = `INSERT INTO "client" ("full_name", "address", "city",
      "state", "zip_code", "phone", "email", "user_id")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  pool.query(query, [req.body.full_name, req.body.address, req.body.city,
       req.body.state, req.body.zip_code, req.body.phone, req.body.email, user_id])
    .then(result => {
      console.log('new client object POST', result.rows);
      res.sendStatus(201);
    }).catch (error => {
      console.log(error);
      res.sendStatus(500)
    })

}); //end new client POST route

//POST route to add new appointment ***May need to add :id here...
//double check route/ do I need ${id} / move to new router?
router.post('/AddAppt', rejectUnauthenticated, (req, res) => {
  //how do I capture the client id and add it to the query?
  const client_id = req.params.id; 
  const query = `INSERT INTO "appointment" ("appt_name", "date", "primary_concern", 
      "notes", "summary", "client_id") VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(query, [req.body.appt_name, req.body.date, req.body.primary_concern, 
        req.body.notes, req.body.summary, client_id])
    .then(result => {
      console.log('new appt object POST', result.rows);
      res.sendStatus(201);
    }).catch(error => {
      console.log(error);
      res.sendStatus(500)
    })

}); //end new appt POST route

// Server-side validation!
//  let newTask = req.body;
//  if (!newTask.name || !newTask.task || !newTask.date) {
//   // Send back a HTTP 400 error
//   res.sendStatus(400);

//MVP PUT route to edit client information 
//`/Profile/${action.payload.id}`
router.put('/Profile/:id', rejectUnauthenticated, (req, res) => {
  console.log('post id:', req.params.id);
  console.log('post update body:', req.body);
  
  const query = `UPDATE "client" SET full_name=$2, address=$3, city=$4, 
      state=$5, zip_code=$6, phone=$7, email=$8 WHERE id=$1;`;
  pool.query(query, [req.params.id, req.body.full_name, req.body.address, req.body.city,
      req.body.state, req.body.zip_code, req.body.phone, req.body.email])
  .then(response => {
    res.sendStatus(200);
  }).catch(error => {
    console.log('Error updating client in server:', error);
    res.sendStatus(500)
  })

});

//DELETE route to delete a client (base mode) 
router.delete('/:id', rejectUnauthenticated, (req, res) => {

  const query = `DELETE FROM "client" WHERE id=$1;`;
  pool.query(query, [req.params.id]) //is req.params.id correct here? 
    .then(result => {
      res.sendStatus(200);
    }).catch(error => {
      console.log('error in delete', error);
      res.sendStatus(500);
    })

}); //end DELETE route

module.exports = router;
