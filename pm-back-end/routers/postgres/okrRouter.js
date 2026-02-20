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
    return res.status(200).send("You Are in OKR Mode");
});

router.post('/getobjectives', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_objectives($1)';
        const values = [req.body.proid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/getkeyresults', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_key_results($1)';
        const values = [req.body.proid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/getiniatives', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_initiatives($1)';
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
        const queryText = 'CALL pm.add_okr($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [req.body.proid,
                        req.body.objective,
                        req.body.group,
                        req.body.order,
                        req.body.key_result,
                        req.body.result_weight,
                        req.body.iniative,
                        req.body.iniative_priority,
                        req.body.result_status,
                        req.body.status_point];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});


router.post('/getsummary', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_okr_summary($1)';
        const values = [req.body.proid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/getstatus', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_key_status($1)';
        const values = [req.body.proid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addstatus', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_key_status($1, $2, $3, $4)';
        const values =
            [req.body.proid,
            req.body.name,
            req.body.pointx,
            req.body.order];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/editstatus', async (req, res) => {
    try {
        const queryText = 'CALL pm.edit_key_status($1, $2, $3, $4)';
        const values =
            [req.body.id,
                req.body.name,
                req.body.pointx,
                req.body.order];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkstatusexists', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.key_status_exists($1, $2)';
        const values = [req.body.proid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].key_status_exists)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkstatusexists2', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.key_status_exists2($1, $2)';
        const values = [req.body.keyid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].key_status_exists2)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkstatusexists3', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.key_status_exists3($1)';
        const values = [req.body.keyid];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].key_status_exists3)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/delstatus', async (req, res) => {
    try {
        const queryText = 'CALL pm.del_key_status($1)';
        const values =
            [req.body.id];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkobjexists', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_obj($1, $2)';
        const values = [req.body.proid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_obj)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkobjexists2', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_obj2($1, $2, $3)';
        const values = [req.body.proid, req.body.id, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_obj2)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addobjective', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_okr($1, $2, $3, $4)';
        const values = [
            req.body.proid,
            req.body.name,
            req.body.group,
            req.body.order];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/editobjective', async (req, res) => {
    try {
        const queryText = 'CALL pm.edit_obj($1, $2, $3, $4)';
        const values = [
            req.body.id,
            req.body.name,
            req.body.group,
            req.body.order];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/delobj', async (req, res) => {
    try {
        const queryText = 'CALL pm.del_obj($1)';
        const values =
            [req.body.id];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addkeyresult', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_key_result($1, $2, $3, $4, $5)';
        const values = [
            req.body.proid,
            req.body.objId,
            req.body.name,
            req.body.weight,
            req.body.kpi];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/checkkeyresults', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.check_key_result($1, $2)';
        const values = [req.body.proid, req.body.name];
        const result = await pool.query(queryText, values);
        return res.status(200).send(result.rows[0].check_key_result)
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});


module.exports = router;