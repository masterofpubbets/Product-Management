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
    return res.status(200).send("You Are in users Mode");
});

router.post('/checkmail', async (req, res) => {
    try {
        const queryText = 'SELECT pm.check_mail($1)';
        const values = [req.body.mail];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0])
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/register', async (req, res) => {
    try {
        const queryText = 'CALL pm.register_new_user($1, $2, $3, $4, $5)';
        const values = [req.body.fname, req.body.lname, req.body.mail, req.body.urole, req.body.pass];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/login', async (req, res) => {
    try {
        const queryText = 'SELECT pm.login($1, $2)';
        const values = [req.body.mail, req.body.pass];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].login)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/details', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.user_details($1)';
        const values = [req.header('x-auth-token')];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0])
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addsocial', async (req, res) => {
    try {
        const queryText = 'CALL pm.save_social($1, $2)';
        const values = [req.body.id, req.body.socials];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addabout', async (req, res) => {
    try {
        const queryText = 'CALL pm.save_about($1, $2)';
        const values = [req.body.id, req.body.about];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/savebasicinfo', async (req, res) => {
    try {
        const queryText = 'CALL pm.save_user_basic_info($1, $2, $3, $4, $5)';
        const values = [req.body.id, req.body.mail, req.body.fname, req.body.lname, req.body.role];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkothermail', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_other_mail_exists($1, $2)';
        const values = [req.body.id, req.body.mail];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0])
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/updateuserlogo', async (req, res) => {
    try {
        const queryText = 'CALL pm.update_user_logo($1, $2)';
        const values = [req.body.id, req.body.logo];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/removeuserlogo', async (req, res) => {
    try {
        const queryText = 'CALL pm.remove_user_logo($1)';
        const values = [req.body.id];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/updateskills', async (req, res) => {
    try {
        const queryText = 'CALL pm.update_user_skills($1, $2)';
        const values = [req.body.id, req.body.skills];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/setpass', async (req, res) => {
    try {
        const queryText = 'CALL pm.set_pass($1, $2)';
        const values = [req.body.id, req.body.hashPass];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

module.exports = router;