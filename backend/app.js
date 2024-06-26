const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser')
const indexRouter = require('./src/routes/index');
const adminRouter = require('./src/routes/admin');
const shopRouter = require('./src/routes/shop');
const apiRouter = require('./src/routes/api');

const injectMiddleWares = require('./src/middleware');
const errorMiddleware = require('./src/middleware/error');
const authUser = require('./src/middleware/auth');
const routes = require('./src/routes');
const { validateEnvVar, loadDataInMemory } = require('./src/utils/util');

// use database to store logs and custom responses
//require('./src/db/mongoose');

// validate if we have all the env variables setup.
validateEnvVar();

const app = express();

// serving static files
app.use('/public', express.static('./public'));

// load all data in memory
loadDataInMemory();
// set up all middleware
//injectMiddleWares(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*')
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
     res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
     next()
})
// routes
app.use('/', routes);
// routes with authorization
app.use('/api/auth/', authUser, routes);

app.get('*', (req, res) => {
    res.status(404).send('not found!');
});


// error handler
app.use((req, res, next) => {
    // Check the Content-Type header
    if (req.headers['content-type'] === 'application/json') {
        // Respond with JSON error
        res.status(res.status || 500).json({
            message: res.message,
            status: res.status,
            errors: res.errors,
        });
    } else {
        // Render the error page
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {}
        });
    }
});
module.exports = app;
