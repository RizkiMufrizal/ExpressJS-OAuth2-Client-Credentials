(() => {
  'use strict';

  const Passport = require('passport');
  const BasicStrategy = require('passport-http').BasicStrategy;
  const BearerStrategy = require('passport-http-bearer').Strategy;
  const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
  const crypto = require('crypto');
  const jsonwebtoken = require('jsonwebtoken');
  const fs = require('fs');
  const ClientService = require('../services/ClientService');
  const TokenService = require('../services/TokenService');

  Passport.use('clientBasic', new BasicStrategy(
    (clientId, clientSecret, callback) => {
      const params = {
        client_id: clientId,
        client_secret: clientSecret
      };
      ClientService.getClient(params, (data) => {
        if (!data.status) {
          return callback(null, data.info);
        }

        callback(null, data.info);
      });
    }
  ));

  Passport.use('clientPassword', new ClientPasswordStrategy(
    (clientId, clientSecret, callback) => {
      const params = {
        client_id: clientId,
        client_secret: clientSecret
      };
      ClientService.getClient(params, (data) => {
        if (!data.status) {
          return callback(null, false, data.info);
        }

        callback(null, true, data.info);
      });
    }
  ));

  Passport.use('bearer', new BearerStrategy(
    (accessToken, callback) => {
      const params = {
        access_token: accessToken.split(':')[1],
        client_id: accessToken.split(':')[0]
      };
      TokenService.getToken(params, (data) => {
        if (!data.status) {
          return callback(null, false, data.info);
        }

        if (data.status) {
          const cert = fs.readFileSync('key/public.pub');
          jsonwebtoken.verify(params.access_token, cert, {
            algorithms: ['RS512']
          }, function(err, decoded) {
            if (typeof decoded == 'undenfined') {
              return callback(null, false, 'Maaf, Token tidak sesuai');
            }

            callback(null, true, data.info);
          });
        }
      });
    }
  ));

}).call(this);
