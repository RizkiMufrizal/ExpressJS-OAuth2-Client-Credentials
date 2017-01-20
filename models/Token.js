(() => {
  'use strict';

  var token,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    objectId = Schema.Types.ObjectId;

  token = new Schema({
    access_token: {
      type: 'String',
      required: true
    },
    refresh_token: {
      type: 'String',
      required: true
    },
    token_expired: {
      type: 'Date',
      required: true
    },
    client_id: {
      type: objectId,
      ref: 'Client'
    }
  }, {
    collection: 'tb_token'
  });

  module.exports = mongoose.model('Token', token);

}).call(this);
