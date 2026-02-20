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
    return res.status(200).send("You Are in Strategy Mode");
});

router.post('/getstrategy', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_strategy($1)';
        const values = [req.body.id];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addstrategy', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_stratgey($1, $2, $3)';
        const values = [req.body.id, req.body.level, JSON.stringify(req.body.strategy)];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});








module.exports = router;