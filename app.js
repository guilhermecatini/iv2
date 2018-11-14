const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

globalParams = require('./systemparams');

mongoose.connect('mongodb://localhost/' + globalParams.dataBaseName, { useNewUrlParser: true, useCreateIndex: true });

const user = require('./api/v1/routes/UserRoutes');
const server = require('./api/v1/routes/ServerRoutes');
const provider = require('./api/v1/routes/ProviderRoutes');
const file = require('./api/v1/routes/FileRoutes');
const login = require('./api/v1/routes/LoginRoutes');
const twofactauth = require('./api/v1/routes/TwoFactAuthRoutes');

const utilitiesRoutes = require('./api/v1/routes/UtilitiesRoutes');
const jobCandidateRoutes = require('./api/v1/routes/JobCandidateRoutes');
const inventarioRoutes = require('./api/v1/routes/InventarioRoutes');
const wsFluigRoutes = require('./api/v1/routes/FluigRoutes');

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '25mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/user', user);
app.use('/api/v1/login', login);
app.use('/api/v1/server', server);
app.use('/api/v1/provider', provider);
app.use('/api/v1/file', file);
app.use('/api/v1/2fa', twofactauth);

app.use('/utilities', utilitiesRoutes);
app.use('/job-candidate', jobCandidateRoutes);
app.use('/inventario', inventarioRoutes);
app.use('/fluig', wsFluigRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('404');
})

module.exports = app;