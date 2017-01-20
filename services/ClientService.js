(() => {
  'use strict';

  const Client = require('../models/Client');
  const uuid = require('node-uuid');

  module.exports = {
    getClient: (params, callback) => {
      Client
        .findOne({
          client_id: params.client_id
        })
        .exec((err, client) => {
          if (err) {
            callback({
              status: false,
              info: err
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

          if (client.client_secret != params.client_secret) {
            callback({
              status: false,
              info: 'Maaf, Anda Tidak Memiliki Akses Resource Ini'
            });
            return;
          }

          callback({
            status: true,
            info: client
          });
        });
    },
    saveClient: (params, callback) => {
      let client = new Client({
        client_id: uuid.v4(),
        client_secret: uuid.v4(),
        client_name: params.client_name,
        client_website: params.client_website
      });
      client.save((err, c) => {
        if (err) {
          callback({
            status: false,
            info: err
          });
          return;
        }

        callback({
          status: true,
          info: client
        });
      });
    }
  };

}).call(this);
