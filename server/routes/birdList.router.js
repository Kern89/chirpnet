const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const sqlText = `SELECT "ub"."id", "city", "state", "date", "notes", "common_name", "scientific_name", "family_com" from "user_birdlist" AS "ub"
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
    console.log('req body',req.body,req.user.id);
    const sqlText = `INSERT INTO "user_birdlist" ("bird_sp", "city", "state", "date", "notes", "user_id")
        VALUES ($1, $2, $3, $4, $5, $6);`
    const insertValues = [
        req.body.bird_sp,
        req.body.city,
        req.body.state,
        req.body.date,
        req.body.notes,
        req.user.id
    ]
    pool.query(sqlText, insertValues).then(result => {
        res.sendStatus(201)
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

module.exports = router;
