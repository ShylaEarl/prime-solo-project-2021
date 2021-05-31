const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//first get attempt for table to get client and last appointment info
//returns only clients with appointments, where I need all clients returned...
// `SELECT * FROM "appointment"
//     JOIN "client" ON client.id=appointment.client_id;`

//MVP GET route to get all clients from DB/server to client reducer/client table
router.get('/', (req, res) => {

  //returns all client info to reducer
  const query = `SELECT * FROM "client" ORDER BY "full_name" ASC;`;
  pool.query(query)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('Error client GET', error);
    res.sendStatus(500)
  })

});//end client GET route

//SELECT * FROM "appointment" WHERE client_id = $1;

// //get a specific client's appointment info from the server/DB (for profile page/appt details page)
// router.get('/Profile/:id', (req, res) => { //do I need to add /Profile here? to route data to profile page rather than table page?
//   console.log('get appt via client id:', req.params.id);
  
//   const query = `SELECT * FROM "appointment" WHERE client_id = $1;`;
//   pool.query(query, [req.params.id])
//   .then(result => {
//     res.send(result.rows);
//   })
//   .catch(error => {
//     console.log('Error client GET', error);
//     res.sendStatus(500)
//   })

// });//end specific client's appointment GET route

//MVP POST route to add new client to DB/server  
router.post('/', rejectUnauthenticated, (req, res) => {

  const user_id = req.user.id;
  //serverside validation TODO - need to add validation for all fields since they are all validated on client
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

}); //end add new client POST route

//POST route to add new appointment ***May need to add :id here...
//double check route/ do I need ${id} / move to new router?
router.post('/AddAppt/:id', rejectUnauthenticated, (req, res) => {
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

});//end PUT route

//MVP DELETE route to delete a client 
router.delete('/:id', rejectUnauthenticated, (req, res) => {

  const query = `DELETE FROM "client" WHERE id=$1;`;
  pool.query(query, [req.params.id]) 
    .then(result => {
      res.sendStatus(200);
    }).catch(error => {
      console.log('error in delete', error);
      res.sendStatus(500);
    })

}); //end DELETE route

module.exports = router;


//get a specific client's appointment info from the server/DB (for profile page/appt details page)
// router.get('/:id', (req, res) => {

//   const query = `SELECT * FROM "appointment" WHERE client_id = $1;`;
//   pool.query(query)
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
