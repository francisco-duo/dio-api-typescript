import { Router, Request, Response, NextFunction } from "express";

const statusRoute = Router();

statusRoute.get("/status", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("OK");
});

export default statusRoute;