require('dotenv').config();

const express = require('express');
const projectsRouter = require('./routers/projects');

const server = express();
server.use(express.json());

server.use(require('./middleware/logger'));

server.use('/api/projects', projectsRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Running API on port ${port}`));
