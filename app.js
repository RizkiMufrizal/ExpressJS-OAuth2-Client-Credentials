(() => {
  'use strict';

  const http = require('http'),
    passport = require('passport'),
    express = require('express'), //express
    path = require('path'), //untuk path folder
    morgan = require('morgan'), //untuk log aplikasi
    session = require('express-session'), //session
    bodyParser = require('body-parser'), //handle rest
    logger = require('./util/Logger'), //loging
    mongoose = require('mongoose'), //mongoose
    authorizationOAuth2 = require('./middleware/AuthorizationOAuth2'),
    authenticationOAuth2 = require('./middleware/AuthenticationOAuth2'),
    ClientRouter = require('./routes/ClientRouter'),
    app = express();

  app.set('port', process.env.PORT || 3000);
  app.use(morgan('combined', {
    stream: logger.stream
  }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use('/', ClientRouter);

  mongoose.connect('mongodb://localhost/Express-OAuth2');

  app.post('/oauth/token', authorizationOAuth2.token);

  app.get('/restricted', passport.authenticate('bearer', {
    session: false
  }), function(req, res) {
    res.send("Yay, you successfully accessed the restricted resource!")
  });

  var server = http.createServer(app);
  server.listen(app.get('port'), () => {
    return logger.info('Server jalan pada port ' + app.get('port'));
  });

}).call(this);
