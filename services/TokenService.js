(() => {
  'use strict';

  const Token = require('../models/Token');
  const Client = require('../models/Client');
  const key = 'th-administrator';
  const encryptor = require('simple-encryptor')(key);

  module.exports = {
    getToken: (params, callback) => {
      Client
        .findOne({
          client_id: params.client_id
        })
        .exec((e, client) => {
          if (e) {
            callback({
              status: false,
              info: e
            });
            return;
          }

          if (!client) {
            callback({
              status: false,
              info: 'Maaf, Anda Tidak Memiliki Akses Resource Ini'
            });
            return;
          }

          Token
            .findOne({
              client_id: client._id
            })
            .exec((err, token) => {
              if (err) {
                callback({
                  status: false,
                  info: err
                });
                return;
              }

              if (!token) {
                callback({
                  status: false,
                  info: 'Maaf, Anda Tidak Memiliki Akses Resource Ini'
                });
                return;
              }

              const access_token_dec = encryptor.decrypt(token.access_token);
              if (access_token_dec != params.access_token) {
                callback({
                  status: false,
                  info: 'Maaf, Anda Tidak Memiliki Akses Resource Ini'
                });
                return;
              }

              if (new Date() > token.token_expired) {
                callback({
                  status: false,
                  info: 'Maaf, Token anda expired'
                });
                return;
              }

              callback({
                status: true,
                info: token
              });
            });
        });
    },
    saveToken: (params, callback) => {
      let token = new Token({
        access_token: params.access_token,
        refresh_token: params.refresh_token,
        client_id: params.client_id,
        token_expired: params.token_expired
      });
      token.save((err, token1) => {
        console.log(err);
        console.log(token1);
        if (err) {
          callback({
            status: false,
            info: err
          });
          return;
        }

        callback({
          status: true,
          info: token1
        });
      });
    }
  };

}).call(this);
