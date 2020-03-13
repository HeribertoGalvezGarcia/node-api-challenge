const db = require('../data/helpers/projectModel');

function validateProjectId({params: {id}}, res, next) {
  db.get(id)
    .then(project => {
      if (!project) return res.status(404).json({message: 'Invalid project ID'});

      res.locals.project = project;
      next();
    })
    .catch(() => res.status(500).json({message: 'Error getting project'}));
}

module.exports = validateProjectId;
