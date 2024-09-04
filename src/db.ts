import { Pool } from "pg";

const connectionString = "postgres://root.root@localhost:5432/postgres";

const db = new Pool({ connectionString });

export default db;
