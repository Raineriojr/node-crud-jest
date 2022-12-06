import express from 'express';
import routes from './routes.js';

// ** Contants
const baseUrl = 'http://localhost'
const port = 3000

const server = express();

server.use(express.json());
server.use(routes);

server.listen(port, () => {
  console.log(`server running in ${baseUrl}:${port}`);
})