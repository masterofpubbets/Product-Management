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
    return res.status(200).send("You Are in Business Model Mode");
});

router.post('/get', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM pm.get_business_model($1)';
        const values = [req.body.proid];
        const result = await pool.query(queryText, values);
        if (result.rows.length > 0) {
            return res.status(200).send(result.rows[0])
        } else {
            return res.status(200).send(null)
        }

    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/add', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [req.body.proid,
                        req.body.partner,
                        req.body.activity,
                        req.body.prop,
                        req.body.resource,
                        req.body.relationship,
                        req.body.channels,
                        req.body.segment,
                        req.body.structures,
                        req.body.gain,
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addkeypartner', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_key_partner($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.partner),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addkeyactivity', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_key_activity($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.activity),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addprop', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_key_prop($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.prop),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addresource', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_key_resource($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.resource),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addrelationship', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_relationship($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.relationship),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addsegment', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_segment($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.segment),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addchannel', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_channel($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.channel),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addstructure', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_structures($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.structure),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});

router.post('/addgain', async (req, res) => {
    try {
        const queryText = 'CALL pm.add_business_model_gains($1, $2)';
        const values = [req.body.proid,
                        JSON.stringify(req.body.gain),
        ];
        await pool.query(queryText, values);
        return res.status(200).send('done')
    } catch(er) {
        console.log(er)
        return res.status(400).send(er);
    }
});




module.exports = router;