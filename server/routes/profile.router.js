const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//get a specific client's appointment info from the server/DB (for profile page/appt details page)
router.get('/:id', rejectUnauthenticated, (req, res) => { //do I need to add /Profile here? 
    console.log('get appt via client id:', req.params.id);
    
    const query = `SELECT * FROM "appointment" WHERE client_id = $1;`;
    pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error appointment GET', error);
      res.sendStatus(500)
    })
  
  });//end specific client's appointment GET route

  module.exports = router;