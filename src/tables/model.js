import { executeQuery } from "../../db/mysql.js";
import { BaseModel } from "../base/model.js";

export class TablesModel extends BaseModel {
  constructor() {
    super({ tableName: "tables" });
  }

  async getAll() {
    const query = `SELECT t.*, s.id AS sale_id
        FROM tables AS t
        LEFT JOIN sale AS s ON s.table_id = t.id AND t.is_available = FALSE`;
    const tables = await executeQuery(query);
    return tables;
  }

  async getAllAvailables() {
    const query = `SELECT * FROM tables
        WHERE is_available = TRUE`;
    const tables = await executeQuery(query);
    return tables;
  }
}
