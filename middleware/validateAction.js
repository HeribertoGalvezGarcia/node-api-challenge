function validateAction({body: {description, notes, completed = false}}, res, next) {
  if (description === undefined || notes === undefined)
    return res.status(400).json({message: 'Description and notes are required in body'});

  if (description.length > 128)
    return res.status(400).json({message: 'Description cannot be longer than 128 characters.'});

  if (!(typeof description === 'string'))
    return res.status(400).json({message: 'Description must be a string'});

  if (!(typeof notes === 'string'))
    return res.status(400).json({message: 'Notes must be a string'});

  if (!(typeof completed === 'boolean'))
    return res.status(400).json({message: 'Completed must be a bool'});

  res.locals.newAction = {description, notes, completed};
  next()
}

module.exports = validateAction;
