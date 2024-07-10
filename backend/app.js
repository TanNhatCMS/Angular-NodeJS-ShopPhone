/*
@Author: Nguyen Tuan Kiet
@Email: mrkiet.dev@gmail.com

MIT License
Copyright (c) 2024 TanNhatCMS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
const express = require('express');
const path = require('path');
const {injectMiddleWares} = require('./src/middleware');
const {errorMiddleware} = require('./src/middleware/handler');
const routes = require('./src/routes');
const { validateEnvVar } = require('./src/utils/util');
const connectDB = require('./src/db/mongodb');
// validate if we have all the env variables setup.
validateEnvVar();
const app = express();
// serving static files
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
// use database
connectDB();
// set up all middleware
injectMiddleWares(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// routes
app.use('/', routes);
app.use((req, res, next) => {
    const acceptsJson = req.accepts('json') && req.get('Accept').includes('application/json');
    if (acceptsJson) {
        res.status(404).json({
            status: 'error',
            message: "Page not found"
        });
    } else {
        res.status(404).render('error', {
            page: '404',
            description: 'Page not found |Lập Trình Web Phía Máy Chủ | Nguyễn Tuấn Kiệt ',
            status: '404',
            message: 'Page not found',
            action: '404',

        });
    }
});
app.use(errorMiddleware);
module.exports = app;
