(() => {
  'use strict';

  var client,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  client = new Schema({
    client_id: {
      type: 'String',
      required: true
    },
    client_secret: {
      type: 'String',
      required: true
    },
    client_name: {
      type: 'String',
      required: true
    },
    client_website: {
      type: 'String',
      required: true
    }
  }, {
    collection: 'tb_client'
  });

  module.exports = mongoose.model('Client', client);

}).call(this);
