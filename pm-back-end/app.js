const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const auth = require('./middleware/auth');
const cors = require('cors');
const user = require('./routers/postgres/usersRouter');
const product = require('./routers/postgres/productsRouter');
const stakeholder = require('./routers/postgres/stakeholdersRouter');
const strategy = require('./routers/postgres/strategyRouter');
const feature = require('./routers/postgres/featureRouter');
const marketAnalysis = require('./routers/postgres/marketAnalysisRouter');
const targetAud = require('./routers/postgres/targetAudRouter');
const busModel = require('./routers/postgres/businessModelRouter');
const okrs = require('./routers/postgres/okrRouter');


app.use(express.json({
verify: (req, res, buf) => {
req.rawBody = buf.toString()
},
limit: '50mb'
}));

app.use(cors());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 
        'X-API-KEY, x-auth-token, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, PARAM_HEADER, mail, allow-google-analytics');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');

    // Pass to next layer of middleware
    next();
});

app.use(auth)

app.get('/',(req,res) => {
    res.status(200).send('YOU ARE IN THE ROOT baby');
});

app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/stakeholder', stakeholder);
app.use('/api/strategy', strategy);
app.use('/api/feature', feature);
app.use('/api/competition', marketAnalysis);
app.use('/api/targetaud', targetAud);
app.use('/api/businessmodel', busModel);
app.use('/api/okr', okrs);

app.listen(port,() => {
    console.log('start listening on port ' + port);
});