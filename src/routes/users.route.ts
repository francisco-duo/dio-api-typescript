import { Router, Request, Response, NextFunction } from "express";
import userRepository from "../repositories/user.repository";
import DatabaseError from "../models/errors/database.error.mode";

// get /users
// get /users/:uuid
// put /users/:uuid
// post /users/
// delete /users/:uuid

const usersRoute = Router();

usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(200).send({ users });
});

usersRoute.get("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);

        res.status(200).send(user);

    } catch (error) {
        next(error);
    }
});

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    // Armazena no banco de dados...
    const createNewUser = await userRepository.createUser(newUser);
    const user = await userRepository.findById(createNewUser);

    res.status(200).send(user);
});

usersRoute.put("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    const updateUser = await userRepository.updateUser(modifiedUser)

    res.status(200).send(updateUser);
});

usersRoute.delete("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    // Alteração no banco de dados
    await userRepository.removeUser(uuid);

    res.status(200).send("Removido");
});

export default usersRoute;
