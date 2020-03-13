const db = require('../data/helpers/actionModel');

function validateActionId({params: {id}}, res, next) {
  db.get(id)
    .then(action => {
      if (!action) return res.status(404).json({message: 'Invalid action ID'});

      res.locals.action = action;
      next();
    })
    .catch(() => res.status(500).json({message: 'Error getting action'}));
}

module.exports = validateActionId;
