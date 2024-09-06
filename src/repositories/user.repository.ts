import DatabaseError from "../models/errors/database.error.mode";
import db from "../db";
import User from "../models/user.model";
import usersRoute from "../routes/users.route";


class UserRepository {

    // Método para consultar os usuários...
    // Método assíncrono. Ele "promete" retornar uma lista
    // de usuários.
    async findAllUsers(): Promise<User[]> {
        // Consula com escrita sql
        const query = `SELECT uuid, username FROM application_user;`;

        // Através da instancia do banco de dados, passmos a query
        const { rows } = await db.query<User>(query);

        return rows || [];
    };

    // Consulta um ususario pro id
    async findById(uuid: string): Promise<User> {
        try {
            // Ao invés de colocar o uuid diretamente no format string
            // Passamos a notação $1 para indicar que o primeiro parametro do método
            // sera passado como valor
            // Fazemos isso para evita um SQL INJECTION
            const query = `
                SELECT uuid, username FROM application_user WHERE uuid = $1; 
            `;

            const values = [uuid]
            const { rows } = await db.query<User>(query, values);
            const [ user ] = rows;

            return user;   
        } catch (error) {
            throw new DatabaseError("Erro ao tentar consultar usuário pelo uuid.", error);
        }
    };

    // Inserir usuário
    async createUser(user: User): Promise<string> {
        const script = `
            INSERT INTO application_user (
                username, password
            )
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid;
        `;

        const values = [user.username, user.password];
        const { rows } = await db.query<{ uuid: string }>(script, values);
        const [ newUser ] = rows;

        return newUser.uuid;
    };

    // Atualizar usuário
    async updateUser(user: User): Promise<string> {
        const script = `
            UPDATE application_user 
            SET 
                username = $1,
                password = crypt($2, 'my_salt')
            WHERE uuid = $3
            RETURNING uuid;
        `;

        const values = [user.username, user.password, user.uuid];
        const { rows } = await db.query<{ uuid: string }>(script, values);
        const [ newUser ] = rows;

        return newUser.uuid;
    };

    // Atualizar usuário
    async removeUser(uuid: string): Promise<void> {
        const script = `
            DELETE
            FROM application_user
            WHERE uuid = $1;
        `;

        const values = [uuid];

        await db.query(script, values);
    };
}

export default new UserRepository();
