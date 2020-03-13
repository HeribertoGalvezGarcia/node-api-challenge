require('dotenv').config();

const express = require('express');
const projectsRouter = require('./routers/projects');
const actionsRouter = require('./routers/actions');

const server = express();
server.use(express.json());

server.use(require('./middleware/logger'));

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Running API on port ${port}`));
