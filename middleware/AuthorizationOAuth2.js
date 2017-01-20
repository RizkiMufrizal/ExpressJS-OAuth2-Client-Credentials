(() => {
  'use strict';
  const oauth2orize = require('oauth2orize');
  const passport = require('passport');
  const crypto = require('crypto');
  const jsonwebtoken = require('jsonwebtoken');
  const fs = require('fs');
  const random = require('../util/uid');
  const TokenService = require('../services/TokenService');

  let server = oauth2orize.createServer();
  const key = 'th-administrator';
  const encryptor = require('simple-encryptor')(key);

  server.exchange(oauth2orize.exchange.clientCredentials((client, scope, callback) => {
    const cert = fs.readFileSync('key/private.key');
    jsonwebtoken.sign({
      client_id: client.client_id
    }, cert, {
      algorithm: 'RS512'
    }, function(err, token) {

      let refresh_token = random.uid(512);
      let access_token_hash = encryptor.encrypt(token);
      let refresh_token_hash = encryptor.encrypt(refresh_token);
      let expiresIn = 3600;
      let expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
      let params = {
        access_token: access_token_hash,
        refresh_token: refresh_token_hash,
        client_id: client._id,
        token_expired: expirationDate
      };
      TokenService.saveToken(params, (data) => {
        return callback(null, {
          access_token: token,
          refresh_token: refresh_token,
          expires_in: expiresIn
        });
      });
    });
  }));

  exports.token = [
    passport.authenticate(['clientBasic', 'clientPassword'], {
      session: false
    }),
    server.token(),
    server.errorHandler()
  ]

}).call(this);
