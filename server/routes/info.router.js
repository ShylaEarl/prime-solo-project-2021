const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  // GET route code here
});

//POST route to add new client Should this be at '/info' or '/'?
router.post('/', rejectUnauthenticated, (req, res) => {
  const user_id = req.user.id;
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
});

//PUT route to edit client information (base mode) Should this be in user.router?
router.put('user/:id', rejectUnauthenticated, (req, res) => {

});

//DELETE route to delete a client (base mode) Should this be in user.router?
router.delete('user/:id', rejectUnauthenticated, (req, res) => {

});

module.exports = router;
