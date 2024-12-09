import dbClient from "../config/db";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async getAll(): Promise<User[]> {
    try {
      const conn = await dbClient.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await dbClient.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "-1");
    const pepper = process.env.BCRYPT_PASSWORD;
    if (!pepper) {
      throw new Error("Missing BCRYPT_PASSWORD environment variable");
    }
    if (saltRounds <= 0) {
      throw new Error("Missing SALT_ROUNDS rounds environment variable");
    }

    const hashedPassword = bcrypt.hashSync(u.password + pepper, saltRounds);

    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      const conn = await dbClient.connect();
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashedPassword
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`);
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    const conn = await dbClient.connect();
    const sql = "SELECT password FROM users WHERE firstname=$1 AND lastname=$2";
    const result = await conn.query(sql, [firstname, lastname]);
    conn.release();

    if (result.rows.length) {
      const user = result.rows[0];

      const pepper = process.env.BCRYPT_PASSWORD;
      if (!pepper) {
        throw new Error("Missing BCRYPT_PASSWORD environment variable");
      }

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
