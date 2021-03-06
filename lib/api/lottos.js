var Lotto = require('../models/lotto');

module.exports = (function() {
  var findAll = function(req, res) {
    var options = {
      limit: Math.min(parseInt(req.query.limit) || 100, 1000),
      skip: parseInt(req.query.skip) || 0,
      start: req.query.start
    };

    var page = parseInt(req.query.page) || 0;
    if (page > 1) {
      options.skip = options.limit * (page - 1) + options.skip;
    }

    Lotto.find({}, {}, options, function(err, lottos) {
      if (!err) {
        return res.send(lottos);
      } else {
        return res.status(400).send(err);
      }
    });
  };

  var findById = function(req, res) {
    Lotto.findById(req.params.id, function(err, lotto) {
      if (!err) {
        return res.send(lotto);
      } else {
        return res.status(400).send(err);
      }
    });
  };

  return {
    findAll: findAll,
    findById: findById
  }
}());