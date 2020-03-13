const express = require('express');
const db = require('../data/helpers/actionModel');

const validateAction = require('../middleware/validateAction');
const validateActionId = require('../middleware/validateActionId');

const router = express.Router();

router.get('/', (req, res) =>
  db.get()
    .then(actions => res.status(200).json(actions))
    .catch(() => res.status(500).json({message: 'Error getting actions'}))
);

router.get('/:id', validateActionId, (req, res) =>
  res.status(200).json(res.locals.action)
);

router.delete('/:id', validateActionId, (req, res) =>
  db.remove(res.locals.action.id)
    .then(() => res.status(200).json(res.locals.action))
    .catch(() => res.status(500).json({message: 'Error deleting action'}))
);

router.put('/:id', validateAction, validateActionId, (req, res) =>
  db.update(res.locals.action.id, res.locals.newAction)
    .then(action => res.status(200).json(action))
    .catch(() => res.status(500).json({message: 'Error updating action'}))
);

module.exports = router;