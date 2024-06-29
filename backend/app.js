const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const indexRouter = require('./src/routes/index');
const adminRouter = require('./src/routes/admin');
const shopRouter = require('./src/routes/shop');
const apiRouter = require('./src/api/routes');

const injectMiddleWares = require('./src/middleware');
const {errorMiddleware} = require('./src/api/middleware/handler');
const authUser = require('./src/middleware/auth');
const routes = require('./src/routes');
const { validateEnvVar, loadDataInMemory } = require('./src/utils/util');
const connectDB = require('./src/db');
const authRouter = require("./src/api/routes/auth");


// validate if we have all the env variables setup.
validateEnvVar();

const app = express();
// serving static files
app.use('/storage', express.static(path.join(__dirname, '../public')));
const path_frontend = path.join(__dirname, '../frontend/dist/shopphone/browser');
//app.use('/', express.static(path_frontend));


// use database to store logs and custom responses
connectDB();
// load all data in memory
loadDataInMemory();
// set up all middleware
injectMiddleWares(app);

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

// const corsOptions = {
//     origin: 'http://localhost:4200',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 200 // For legacy browser support
// };
//
// app.use(cors(corsOptions));

app.use('/v1', apiRouter);



// routes with authorization
app.use('/api/auth/', authUser, routes);
// routes
app.use('/', routes);
//app.use('/*', express.static(path_frontend));
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: "Page not found"
    });
});
app.use(errorMiddleware);


module.exports = app;
