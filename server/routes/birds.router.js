const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM "bird_species"
                    ORDER BY "order", "common_name";`;
  pool.query(sqlText).then(result => {
    //console.log("get birds result:", result.rows);
    res.send(result.rows)
  }).catch(error => {
    console.log('Error:', error);
    res.sendStatus(500);
  })
});

router.get('/edit/:id', (req, res) => {
  const sqlText = `SELECT * FROM "user_birdlist" AS "ub"
                    JOIN "bird_species" ON "ub"."bird_sp" = "bird_species"."id"
                    WHERE "ub"."id" = $1;`;
    // console.log("req.params:", req.params.id);
  pool.query(sqlText, [req.params.id]).then(result => {
    // console.log(result.rows);
    res.send(result.rows)
  }).catch(error => {
    console.log(error);
    res.sendStatus(500);
  })

})

// ----------- This Route isnt needed anymore??? -----------------------
// router.get('/:id', (req, res) => {
//   const sqlText = `SELECT "id" FROM "bird_species"
//                     WHERE "common_name" = $1;`;
//     // console.log("req.params:", req.params.id);
//   pool.query(sqlText, [req.params.id]).then(result => {
//     // console.log(result.rows);
//     res.send(result.rows)
//   }).catch(error => {
//     console.log(error);
//     res.sendStatus(500);
//   })
// })

// Called this once and then commented it out.

// router.post('/seed', async (req, res) => {
//   const client = await pool.connect();
    
//   try {
//     const response = await axios({
//       method: 'get',
//       url: 'https://api.ebird.org/v2/product/spplist/US-MN',
//       headers: { 
//         'X-eBirdApiToken': process.env.eBird_API
//       }
//     });
//     const birdList = response.data;
//     // console.log(birdList);
//     await client.query('BEGIN');
//     // Promise all would be more efficient but since we're only doing this once, a for loop will work just fine.
//     for(let birdCode of birdList) {
//       let birdResponse = await axios({
//         method: 'get',
//         url: `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${birdCode}&fmt=json`,
//         headers: { 
//           'X-eBirdApiToken': process.env.eBird_API
//         }
//       });
//        let queryText = `INSERT INTO "bird_species" ("sp_code", "common_name", "scientific_name", "order", "family_sci", "family_com")
//                          VALUES ($1, $2, $3, $4, $5, $6);`;
//       // console.log('CODE', birdCode);
      
//       if (birdResponse.data && birdResponse.data.length > 0) {
//         let birdDetails = birdResponse.data[0];
//          // console.log('bird Details:', birdDetails);
//         await client.query(queryText, [
//           birdDetails.speciesCode,
//           birdDetails.comName,
//           birdDetails.sciName,
//           birdDetails.order,
//           birdDetails.familySciName,
//           birdDetails.familyComName,
//         ]);
//       } else {
//         console.error('Bird with code', birdCode, 'not found');
//       }
//     }
//     await client.query('COMMIT');
//     res.sendStatus(200);
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Error inserting Birds:', error);
//     res.sendStatus(500);
//   } finally {
//     client.release();
//   }
// });



module.exports = router;
