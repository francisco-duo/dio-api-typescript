import { Request, Response, NextFunction } from "express";
import DatabaseError from "../models/errors/database.error.mode";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        res.status(404).send("Usuário não encontrado!");
    } else {
        res.status(500).send({ message: "Erro interno do sistema" });
    }
}

export default errorHandler;
