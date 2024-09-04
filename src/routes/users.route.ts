import { Router, Request, Response, NextFunction } from "express";

// get /users
// get /users/:uuid
// post /users/
// put /users/:uuid
// delete /users/:uuid

const usersRoute = Router();

usersRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
    const users = [{ userName: 'francisco' }];
    res.status(200).send({ users });
});

usersRoute.get("/users/:uuid", (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    // Consulta no banco de dados... 
    
    res.status(200).send(uuid);
});

usersRoute.post("/users", (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    console.log(newUser);

    // Armazena no banco de dados...

    res.status(200).send(newUser);
});

usersRoute.put("/users/:uuid", (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    // Consulta no banco de dados
    // Alteração no banco de dados

    modifiedUser.uuid = uuid;

    res.status(200).send(modifiedUser);
});

usersRoute.delete("/users/:uuid", (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    // Consulta no banco de dados
    // Alteração no banco de dados

    res.status(200).send(uuid);
});

export default usersRoute;
