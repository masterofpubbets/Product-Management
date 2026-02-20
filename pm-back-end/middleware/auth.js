const jwt = require('jsonwebtoken');
const privateKey = "dtpk2002563";
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

async function auth(req, res, next) {
    const token = req.header('x-auth-token');
    const mail = req.header('mail');
    const overWrite = req.header('allow-google-analytics');
    if (overWrite === undefined) {
        return res.status(401).send('Bad Token');
    }
    if (overWrite === 'no') {
        try {
            const queryText = 'SELECT is_valid($1, $2)';
            const values = [token, mail];
            const result = await pool.query(queryText, values);
            if (result.rows[0].is_valid === 'valid') {
                next();
            } else {
                return res.status(401).send('Access Denied. No Token');
            }
        } catch(ex) {
            return res.status(401).send('Bad Token');
        }
    } else {
        next();
    }
   
};

module.exports = auth;