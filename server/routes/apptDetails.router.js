const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//GET route to get all remedies for a specific appt.
router.get('/:id', rejectUnauthenticated, (req, res) => { 
    console.log('get appt via client id:', req.params.id);
    
    const query = `SELECT * FROM "remedies" WHERE appointment_id = $1;`;
    pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error appointment GET', error);
      res.sendStatus(500)
    })
  
});//end specific appointment's remedies GET route

module.exports = router;