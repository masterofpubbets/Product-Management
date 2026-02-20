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
    return res.status(200).send("You Are in product Mode");
});

router.post('/getproducts', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_products($1)';
        const values = [req.body.uid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/add', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_product($1, $2, $3, $4, $5, $6, $7)';
        const values = [req.body.uid, req.body.name, req.body.des, req.body.type, req.body.logo, req.body.role, req.body.default];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkproductexists', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_product_exists($1, $2)';
        const values = [req.body.uid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_product_exists)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const queryText = 'CALL pm.delete_product($1)';
        const values = [req.body.uid];
        await pool.query(queryText, values);
        return res.status(200).send('ok')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/editbasic', async (req, res) => {
    try {
        const queryText = 'CALL pm.editproduct_basic($1, $2, $3, $4, $5)';
        const values = [req.body.id, req.body.name, req.body.type, req.body.des, req.body.default];
        await pool.query(queryText, values);
        return res.status(200).send('ok')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/editlogo', async (req, res) => {
    try {
        const queryText = 'CALL pm.editproduct_logo($1, $2)';
        const values = [req.body.id, req.body.logo];
        await pool.query(queryText, values);
        return res.status(200).send('ok')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/getproductusers', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_product_users($1)';
        const values = [req.body.proId];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/adduserproduct', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_user_product($1, $2, $3)';
        const values = [req.body.proId, req.body.mail, req.body.role];
        const result = await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/removeuserproduct', async (req, res) => {
    try {
        const queryText = 'CALL pm.remove_user_product($1)';
        const values = [req.body.uId];
        const result = await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/roleuserproduct', async (req, res) => {
    try {
        const queryText = 'CALL pm.role_user_product($1, $2)';
        const values = [req.body.id, req.body.role];
        const result = await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/getdefaultproduct', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_default_product($1)';
        const values = [req.body.userId];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].get_default_product)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

module.exports = router;