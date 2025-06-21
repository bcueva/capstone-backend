import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/app.js";
import { executeQuery } from "../../db/mysql.js";

export class LoginModel {
  async login({ email, password }) {
    let query = `SELECT id, name, last_name, email, role_id FROM user WHERE LOWER(email) = LOWER(?) AND password = ? LIMIT 1`;
    const [user] = await executeQuery(query, [email, password]);

    query = `SELECT p.* FROM permission p
    LEFT JOIN role_permission rp on rp.permission_id = p.id
    WHERE rp.role_id = ?`;

    const permissions = await executeQuery(query, [user.role_id]);
    user.permissions = permissions.map((p) => p.name);

    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token };
  }
}
