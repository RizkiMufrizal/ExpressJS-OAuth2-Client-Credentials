(() => {
  'use strict';

  let express = require('express'),
    router = express.Router(),
    ClientService = require('../services/ClientService');

  router.post('/client', function(req, res) {
    let params = req.body;
    console.log(params);
    ClientService.saveClient(params, (data) => {
      return res.json(data);
    });
  });

  module.exports = router;

}).call(this);
