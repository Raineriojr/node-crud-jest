import { Router } from 'express';

// ** import routes
import { UserController } from './controllers/userController.js';

// ** constants
const routes = Router();
const userController = new UserController();

// ** routes
routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);


export default routes;