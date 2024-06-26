const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


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

// get route for nearby sightings of species
router.get('/nearby', (req, res) => { 
    axios({
        method: 'get',
        url: 'https://api.ebird.org/v2/data/obs/US-MN/recent?maxResults=15',
        headers: { 
        'X-eBirdApiToken': process.env.eBird_API
        }
    }).then(response => {
    console.log('response data:', response.data);
    res.send(response.data)
  }).catch(error => {
    console.log(error);
    res.sendStatus(500);
  })
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

router.put('/', (req, res) => {
    console.log('req.body:', req.body);
    console.log(req.params); 
    const sqlText = `UPDATE "user_birdlist" 
    SET "city" = $1, "state" = $2, "date" = $3, "notes" = $4
    WHERE "id" = $5;`;

    pool.query(sqlText, req.body[0], req.body[1], req.body[2], req.body[3], req.body[4],).then(result => {
        console.log('Sighting updated:', req.params.id);
        res.sendStatus(201);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
    
})

module.exports = router;
