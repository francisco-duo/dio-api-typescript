import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Routes
app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'bar' });
});


// Server start
app.listen(3000, () => {
    console.log('Server is running in port 3000...');
});
