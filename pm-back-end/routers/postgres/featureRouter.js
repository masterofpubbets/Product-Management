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
    return res.status(200).send("You Are in Feature Mode");
});

router.post('/getfeatures', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_features($1)';
        const values = [req.body.id];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkexists', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_feature_exists($1, $2)';
        const values = [req.body.proid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_feature_exists)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkexists2', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_feature_exists2($1, $2, $3)';
        const values = [req.body.proid, req.body.id, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_feature_exists2)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/add', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_feature($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [
            req.body.proid,
            req.body.name,
            req.body.timeToUse,
            req.body.numOfUse,
            req.body.kano,
            req.body.discontinue,
            req.body.des,
            req.body.current,
            req.body.mosco,
            req.body.iniId];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/edit', async (req, res) => {
    try {
        const queryText = 'CALL pm.edit_feature($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [
            req.body.id,
            req.body.name,
            req.body.timeToUse,
            req.body.numOfUse,
            req.body.kano,
            req.body.discontinue,
            req.body.des,
            req.body.current,
            req.body.mosco,
            req.body.iniId];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const queryText = 'CALL pm.delete_feature($1)';
        const values = [req.body.id];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/clearini', async (req, res) => {
    try {
        const queryText = 'CALL pm.clear_fet_ini($1)';
        const values = [req.body.id];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});




module.exports = router;