const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const sqlText = `SELECT "city", "state", "date", "notes", "common_name", "scientific_name", "family_com" from "user_birdlist" AS "ub"
    JOIN "bird_species" ON "ub"."bird_sp" = "bird_species"."id"
    WHERE "user_id" = $1;`; 

    pool.query(sqlText, [req.user.id]).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error: GET birdList', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
