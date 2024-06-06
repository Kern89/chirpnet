const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const sqlText = `SELECT "ub"."id", "city", "state", "date", "notes", "common_name", "scientific_name", "family_com" from "user_birdlist" AS "ub"
    JOIN "bird_species" ON "ub"."bird_sp" = "bird_species"."id"
    WHERE "user_id" = $1
    ORDER BY "common_name";`; 

    pool.query(sqlText, [req.user.id]).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('Error: GET birdList', error);
        res.sendStatus(500);
    });
});


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

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const sqlText = `DELETE FROM "user_birdlist" WHERE "id" = $1;`;

    pool.query(sqlText, [req.params.id]).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
    console.log('req.body:', req.body);
    console.log(req.params); 
    // const sqlText = `UPDATE "user_birdlist" 
    // SET "bird_sp" = '1', "city" = 'door', "state" = 'AZ', "date" = '2-2-2024', "notes" = 'testing testing... can you hear me?'
    // WHERE "id" = 1;`
    // needs to be adjusted
})

module.exports = router;
