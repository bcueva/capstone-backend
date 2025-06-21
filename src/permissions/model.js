import { executeQuery } from "../../db/mysql.js";
import { BaseModel } from "../base/model.js";

export class PermissionsModel extends BaseModel {
  constructor() {
    super({ tableName: "permission" });
  }

  static async getByUser({ userId }) {
    const query = `SELECT * FROM permission p
      LEFT JOIN role_permission rp ON rp.permission_id = p.id
      INNER JOIN user u ON u.role_id = rp.role_id
      WHERE u.id = ?`;
    const permissions = await executeQuery(query, [userId]);
    return permissions;
  }

  static async hasPermission({ userId, permission }) {
    const query = `SELECT 1 FROM user u
      INNER JOIN role_permission rp ON u.role_id = rp.role_id
      INNER JOIN permission p ON rp.permission_id = p.id
      WHERE u.id = ? AND p.name = ?`;
    const result = await executeQuery(query, [userId, permission]);
    return !!result.length;
  }
}
