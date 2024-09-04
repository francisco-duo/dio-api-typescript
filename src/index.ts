import express, { Request, Response, NextFunction } from 'express';

import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(usersRoute);
app.use(statusRoute);

// Server Listenner
app.listen(3000, () => {
    console.log('Server is running in port 3000...');
});
 