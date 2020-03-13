const express = require('express');
const db = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

const validateProject = require('../middleware/validateProject');
const validateProjectId = require('../middleware/validateProjectId');
const validateAction = require('../middleware/validateAction');

const router = express.Router();

router.post('/', validateProject, (req, res) =>
  db.insert(res.locals.newProject)
    .then(project => res.status(201).json(project))
    .catch(() => res.status(500).json({message: 'Error creating project'}))
);

router.post('/:id/actions', validateAction, validateProjectId, (req, res) =>
  actionDb.insert({project_id: res.locals.project.id, ...res.locals.newAction})
    .then(action => res.status(201).json(action))
    .catch(() => res.status(500).json({message: 'Error creating action'}))
);

router.get('/', (req, res) =>
  db.get()
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(500).json({message: 'Error getting projects'}))
);

router.get('/:id', validateProjectId, (req, res) =>
  res.status(200).json(res.locals.project)
);

router.get('/:id/actions', validateProjectId, (req, res) =>
  res.status(200).json(res.locals.project.actions)
);

router.delete('/:id', validateProjectId, (req, res) =>
  db.remove(res.locals.project.id)
    .then(() => res.status(200).json(res.locals.project))
    .catch(() => res.status(500).json({message: 'Error deleting project'}))
);

router.put('/:id', validateProject, validateProjectId, (req, res) =>
  db.update(res.locals.project.id, res.locals.newProject)
    .then(project => res.status(200).json(project))
    .catch(() => res.status(500).json({message: 'Error updating project.'}))
);

module.exports = router;
