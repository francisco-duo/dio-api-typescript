import express, { Request, Response, NextFunction } from 'express';

import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';
import errorHandler from './middlewares/error-handler.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(usersRoute);
app.use(statusRoute);

// Handlers
app.use(errorHandler);

// Server Listenner
app.listen(3000, () => {
    console.log('Server is running in port 3000...');
});

