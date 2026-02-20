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
    return res.status(200).send("You Are in Market Analysis Mode");
});

router.post('/get', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_market_analysis($1)';
        const values = [req.body.proid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkexists', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_market_analysis_exists($1, $2, $3)';
        const values = [req.body.proid, req.body.company, req.body.details];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_market_analysis_exists)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkexists2', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_market_analysis_exists2($1, $2, $3, $4)';
        const values = [req.body.proid, req.body.id, req.body.company, req.body.details];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_market_analysis_exists2)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/add', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_market_analysis($1, $2, $3, $4)';
        const values = [req.body.proid, req.body.company, req.body.details, req.body.detailsType];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const queryText = 'CALL pm.delete_market_analysis($1)';
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
        const queryText = 'CALL pm.edit_market_analysis($1, $2, $3, $4)';
        const values = [req.body.id, req.body.company, req.body.details, req.body.detailsType];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});




module.exports = router;