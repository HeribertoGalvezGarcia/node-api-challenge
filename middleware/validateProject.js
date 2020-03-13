function validateProject({body: {name, description, completed = false}}, res, next) {
  if (name === undefined || description === undefined)
    return res.status(400).json({message: 'Name and description must be included.'});

  if (!(typeof name === 'string'))
    return res.status(400).json({message: 'Name must be a string'});

  if (!(typeof description === 'string'))
    return res.status(400).json({message: 'Description must be a string'});

  if (!(typeof completed === 'boolean'))
    return res.status(400).json({message: 'Completed must be a bool'});

  res.locals.newProject = {name, description, completed};
  next();
}

module.exports = validateProject;
