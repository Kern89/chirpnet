const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "bird_species";`
  pool.query(sqlText).then(result => {
    //console.log("get birds result:", result.rows);
    res.send(result.rows)
  }).catch(error => {
    console.log('Error:', error);
    res.sendStatus(500);
  })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
