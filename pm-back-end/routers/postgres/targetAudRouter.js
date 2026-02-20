const express = require("express");
const router = express.Router();
const pg = require("pg");
const { Pool } = pg;
const pgURL = process.env.DB_URL;
const pgUser = process.env.DB_User;
const pgPass = process.env.DB_PassWR;
const pgDb = process.env.DB_Db;
const pgPort = process.env.DB_Port

const pool = new Pool({
                          user: pgUser,
                          host: pgURL,
                          database: pgDb,
                          password: pgPass,
                          port: pgPort,
                      });

router.get("/", async (req, res) => {
    return res.status(200).send("You Are in Target Aud Mode");
});

router.post('/get', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_user_persona($1)';
        const values = [req.body.proid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/add', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_user_persona($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const values = [req.body.proid,
                        req.body.role,
                        req.body.age,
                        req.body.education,
                        req.body.location,
                        req.body.problem,
                        req.body.gender,
                        req.body.interests,
                        req.body.bahavioral,
                        req.body.life_style,
                        req.body.goal,
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const queryText = 'CALL pm.del_user_persona($1)';
        const values = [req.body.id];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/edit', async (req, res) => {
    try {
        const queryText = 'CALL pm.edit_user_persona($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const values = [req.body.id,
                        req.body.role,
                        req.body.age,
                        req.body.education,
                        req.body.location,
                        req.body.problem,
                        req.body.gender,
                        req.body.interests,
                        req.body.bahavioral,
                        req.body.life_style,
                        req.body.goal,
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});




module.exports = router;