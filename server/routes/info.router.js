const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// `SELECT * FROM "appointment"
//     JOIN "client" ON client.id=appointment.client_id;`

//SELECT * FROM "client";

//get all clients (and appointments?) from the DB (for client table)
router.get('/', (req, res) => {

  //should this be a joins query to retrieve appt data too? `SELECT * FROM "client";`
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

//POST route to add new client 
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
router.post('/', rejectUnauthenticated, (req, res) => {
  //how do I capture the client id and add it to the query?
  const query = `INSERT INTO "appointment" ("appt_name", "date", "primary_concern", 
      "notes", "summary", "client_id") VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(query, [req.body.appt_name, req.body.date, req.body.primary_concern, 
        req.body.notes, req.body.summary, req.body.client.id])
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

//PUT route to edit client information (base mode) 
router.put('/:id', rejectUnauthenticated, (req, res) => {

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
