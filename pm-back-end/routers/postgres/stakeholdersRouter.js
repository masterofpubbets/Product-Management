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
    return res.status(200).send("You Are in stakeholder Mode");
});

router.post('/getstakeholder', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_stakeholders($1)';
        const values = [req.body.id];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/add', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_stakeholder($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        const values = [req.body.proid, req.body.name, req.body.organization, req.body.role, req.body.contact, req.body.des, req.body.category, req.body.country, req.body.lang];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/edit', async (req, res) => {
    try {
        const queryText = 'CALL pm.edit_stakeholder($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [req.body.stid,req.body.proid, req.body.name, req.body.organization, req.body.role, req.body.contact, req.body.des, req.body.category, req.body.country, req.body.lang];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkexists', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.stakeholder_exists($1, $2)';
        const values = [req.body.proid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].stakeholder_exists)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkexists2', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.stakeholder_exists_edit($1, $2, $3)';
        const values = [req.body.stid, req.body.proid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].stakeholder_exists_edit)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const queryText = 'CALL pm.delete_stakeholder($1)';
        const values = [req.body.id];
        await pool.query(queryText, values);
        return res.status(200).send('ok')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});







module.exports = router;